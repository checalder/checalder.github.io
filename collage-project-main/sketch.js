/**
 * ----------------------------------------------------------------------
 * NOTE: If you use this file, please change the comments to reflect your
 *       changes and additions!
 * ---------------------------------------------------------------------
 * TITLE: SNOWDROP
 * 
 * THEME: snow and nature and animals
 *
 * DOCUMENTATION:
 * 1. Compositing using blendMode() and tint()
 * 2. Masking using filter() to create a masks,
 *    blend modes to apply them
 * 3. Cropping and scaling using the image() function
 * 4. Repetition using loops and perlin noise
 * 
 * This example uses a few images:
 * 
 * 1. An illustrated wave background image (waveImage)
 * 3. A PNG image of Dolphins, is used with scaling and repetition
 * 4. A JPG image of a metal inro, which we use as an image masking filter
 * 
 * Image function reference: https://p5js.org/reference/#group-Image
 * ------------------------------------------
 * by Prashanth Thattai 2023 <p.thattairavikumar@gold.ac.uk> 
 * Adapted from Evan Raskob <e.raskob@gold.ac.uk>
 * modified by <YOUR NAME and EMAIL HERE>
 * -----------------------------------------
 */


/// ----- 1. Put some images here! -------------
/// You need to download them from somewhere, try and find
/// a source that has proper usage rights (Creative Commons 
/// non-commercial, or public domain)

/// ---- MAKE SURE TO PUT THE URL YOU FOUND THEM AT HERE, 
/// ---- OR LET US KNOW THE SOURCE ------------------------

// Under the Wave off Kanagawa by Katsushika Hokusai 
// source: https://www.metmuseum.org/art/collection/search/45434 
let waveImage; 
var orgnewImageB;
var newImageB;
var newImageBOffset;

// "Dolphins in Pine Island Sound" by pmarkham is licensed under CC BY-SA 2.0.
// Source: https://www.flickr.com/photos/9197427@N06/5753797602
let dolphins; 

// Metal Inrō with Flower Medallions
// https://www.metmuseum.org/art/collection/search/58506?searchField=All&amp;sortBy=Relevance&amp;deptids=6&amp;ft=*&amp;offset=0&amp;rpp=20&amp;pos=18
let inro;


/// --- PRELOAD ------------------------
/// This is useful to load an image  or do a task that is important to run
/// *before* the sketch is loaded. preload() runs once *before* setup

function preload() {  
  // load images from the assets folder
  waveImage = loadImage('assets/wave.jpg');

    orgnewImageB =loadImage("assets/mountain.jpg");

  inro = loadImage('assets/inro.jpg');

  dolphins = loadImage('assets/dolphins.png'); // PNG files have transparency, JPGs don't
    
    eyeball = loadImage("assets/eye.png");

  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}


///
/// Setup -------------------------
///
function setup() {  

  // tell us something out out images
  console.info('Image dimensions');
  console.info('----------------');
  
  console.info('waveImage:' + waveImage.width + '/' + waveImage.height);

  console.info('dolphins:' + dolphins.width + '/' + dolphins.height);

  console.info('inro:' + inro.width + '/' + inro.height);

  createCanvas(waveImage.width, waveImage.height); // create a canvas EXACTLY the size of our image

  // turn the inro into a mask image:
  createMask(inro);
    
    orgnewImageB.resize(width, height);
    newImageB = orgnewImageB.get(width/3,0, width/3,height);
    

}


///-----------------------------
///--- DRAW --------------------
///-----------------------------

function draw() {

      tint(255,255); // reset tint to full color and no transparency

      // make it so images don't blend, they replace what is under them
      blendMode(BLEND);

      imageMode(CORNER);
      // draw the image to fill the canvas exactly
      image(waveImage, 0, 0);
      colorMode(RGB);
    
    image(newImageB, 2*width/3, 0);//will be on the far left otherwise  
    
    var sections = [];
    
    var sectionWidth = 30;    
    var sectionHeight = height/12;
    
    var interval = 20;// ammount of spacing between each merging section
    
    var sectionCount = 10;// number of sections
    
    var xPos = width/3 - sectionWidth;
    
    ellipse(xPos, height/2, 100);
    
    
    //loop through sections of the image on the edge and have them waver and resize with the noise function
    for(i = 0; i < sectionCount; i++)
    {   
        var sectionWidth = constrain((1 + sectionWidth * noise((0.005 + i * 0.001) * frameCount)), 10, 50);
        console.log(sectionWidth);
        var yPos = (sectionHeight + interval) * i;
        sections.push(orgnewImageB.get(xPos,yPos, sectionWidth,sectionHeight));
        // put them into the image
        // shifts the sections to the right slightly because they were one pixel off for some reasons
    }
    
    for(i = 0; i < sections.length; i++)
    {
        image(sections[i], 1 + 2 * width/3 - sectionWidth, yPos);
        console.log(sections);
    }
    
    

  
  //draw the mask image onto the background image    
   drawMask(inro, width/3, height/2, width/2, height/3);
  
  // Draw upside-down of the inro.
  // Gene Kogan has a nice explanation: https://genekogan.com/code/p5js-transformations/

  // save current drawing state
  push();
    // Move to designed drawing position
    translate(2*width/3, 2*height/3);
    // rotate 180 degrees (PI)
    rotate(PI);
    // draw at current drawing position
    drawMask(inro, 0, 0, width/3, height/3);

    rotate(PI);
    // draw one next to it (we're not upside-down now!)
    translate(0.5*width/3, -height/6)
    drawMask(inro, 0, 0, width/3, height/3);
    
    // reset transformations (drawing state) to original
  pop();

  // blend using transparency (alpha)
  blendMode(BLEND);
    
    b = 100 + 200*noise(0.05 * frameCount)
    print(b)
  tint(0,120,150, round(b)) // make everything after this a little transparent

  imageMode(CORNER);

  // use transparency again
  //blendMode(SCREEN);

  // draw some noses, to be weird
  push();
  
  let maxDolphins = 7;

  // start position
  translate(width/4, height/3);

  for (let n = 0; n < maxDolphins; n++)
  {
    let scaling = sin(map(n, 0, maxDolphins, 0, PI)); //0-1

    image(dolphins, 20 * noise( (0.005+n*0.001) * frameCount), scaling*height/3 + 40 * noise( (0.005+n*0.001) * frameCount), 0.3*dolphins.width, 0.3*dolphins.height);
    translate(dolphins.width/5,0); 
  }
    
  pop();
    
  //swapPixels(waveImage)
    
    
    
    blendMode(DIFFERENCE);
    image(eyeball, height/2, width/2);


} // end draw()



///-------------------------------------------------------
/// --- MASKING-------------------------------------------
///
/**
 * Turn an image into a black and white mask using a threshold
 * filter to make all lighter pixels white and all darker ones black.
 * This permanently modifies the image, in memory!
 * 
 * @param {p5.Image} srcImage Source image to turn into a black/white mask image 
 */
function createMask(srcImage) {
  //-------------------------------------------------------
  // --- FILTERING ----------------------------------------
  // filter images -- must be done AFTER create canvas
  // https://p5js.org/reference/#/p5/filter
  //

  srcImage.filter(INVERT); // make this image slightly blurry
  srcImage.filter(THRESHOLD,0.75); // turn white/black only
  srcImage.filter(ERODE); // reduce light areas
}


/**
 * Draw a mask image onto the screen using SCREEN Blend mode. 
 * This means the black parts of this image will white out the
 * pixels below it, and the white parts of this image will let the 
 * pixels below show through unaltered.
 * 
 * @param {p5.Image} img Mask image
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 */
function drawMask(img, x, y, w, h)
{
    // or try screen
    blendMode(SCREEN);
    imageMode(CENTER); // draw using center coordinate
    image(img, x, y, w, h);
}


///-------------------------------------------------------
/// --- PIXEL MASKS -------------------------------------------
///
/**
 * Pixel Mask. Write a function to replace pixel channels from one 
 * image to another. This means the pixel channel of background image 
 * will be replaced by the pixels values of the Mask image. 
 * 
 * @param {p5.Image} src_img 
 * @param {p5.Image} tar_img Mask image
 */

function drawPixelMask(src_img, tar_img){
    
}

/**
 * Write a function to exchange pixel values from random positions
 * on the screen. This means the pixel channel of background image will start
 * blurring. 
 * 
 * @param {p5.Image} src_img 
 */

function swapPixels(src_img){
    
}

