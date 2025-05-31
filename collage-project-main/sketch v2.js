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
 
 
 - 5. manipulation of image using get and set
 
 - 6 image cropping within loops and perlin noise
 
 - 7. USE OF filter functions
 
 - 8 use of the sin function and blendMODE(DIFFERENCE) function on line 181

 * 
 * This example uses a few images:
 * 
 * 1. An illustrated wave background image (imageA)
 * 3. A PNG image of eyeball, is used with scaling and repetition
 * 4. A JPG image of a metal inro, which we use as an image masking filter
 
  5. image of arctic landscape
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

//alien-fantasy-monster by freddy dendoktoo
//https://www.publicdomainpictures.net/en/view-image.php?image=580304&picture=alien-fantasy-monster

// wolf by mohamed mahmoud hassan
//https://www.publicdomainpictures.net/en/view-image.php?image=561996&picture=wolf

//eyeballs by chiplanay X 
//https://www.publicdomainpictures.net/en/view-image.php?image=339859&picture=eye-balls-human-eyes

// blue eye monster by freddy dendoktoo
//https://www.publicdomainpictures.net/en/free-download.php?image=alien-fantasy-monster&id=579212


//randomize the level of color inversion on each eyball and which filter, blur, dilation, etc


let imageA; 
var imageB;
var newImageB;
var xGetOffset;
var xPlaceOffset;
var sections = [];
var noiseScalar = 0.002;
var sectionWidth;
var blendedImage;

let eyeball; 

// Metal Inrō with Flower Medallions
// https://www.metmuseum.org/art/collection/search/58506?searchField=All&amp;sortBy=Relevance&amp;deptids=6&amp;ft=*&amp;offset=0&amp;rpp=20&amp;pos=18
let inro;


/// --- PRELOAD ------------------------
/// This is useful to load an image  or do a task that is important to run
/// *before* the sketch is loaded. preload() runs once *before* setup

function preload() {  
  // load images from the assets folder
  imageA = loadImage('assets/wolf.jpg');

    imageB =loadImage("assets/alien.jpg");

  inro = loadImage('assets/inro.jpg');

  eyeball = loadImage('assets/eye.png'); // PNG files have transparency, JPGs don't
    
    blueEye = loadImage("assets/blue-eye-monster.jpg");
    
    blendedImage = createImage(width, height);

  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}


///
/// Setup -------------------------
///
function setup() {
  
  console.info('imageA:' + imageA.width + '/' + imageA.height);

  console.info('eyeball:' + eyeball.width + '/' + eyeball.height);

  console.info('inro:' + inro.width + '/' + inro.height);

  createCanvas(1920, 1080); // create a canvas EXACTLY the size of our image

  // turn the inro into a mask image:
  
    
    imageA.resize(width, height);
    imageB.resize(width, height);
    eyeball.resize ( 400, 400);

    
    xGetOffset = width/3;
    newImageB = imageB.get(xGetOffset, 0, width/3,height);
    
    
    sectionWidth = 500;
    
    
    var interval = 2;// ammount of spacing between each merging section
    
    var sectionCount = 5;// number of sections    
    
    
    noiseScalar = 0.02;
    
    for(i = 0; i < sectionCount; i++)
    {
        var sectionHeight = height/(sectionCount + interval);
        sections.push(new Section(sectionWidth, sectionHeight, (height/sectionCount + interval) * i));
    }   
    
    
    
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
      image(imageA, 0, 0);
      colorMode(RGB);
    
    
    xPlaceOffset = 2 * width/3;
    
    image(newImageB, xPlaceOffset, 0);//will be on the far left otherwise
    
    
    
    
    
    
    
    
    for(i = 0; i < sections.length; i++)
    {
        
        sections[i].width = sectionWidth * noise(noiseScalar* frameCount);// i just cant get the noise function to work, no matter what, it continues to decrease very rapidly, i want each section to be independant of eachother
        
    }
            
    for(i = 0; i < sections.length; i++)
    {
        var gottenImage = imageB.get(xGetOffset - sections[i].width, sections[i].yPos, sections[i].width, sections[i].height);
        
        gottenImage.filter(INVERT);
        
        image(gottenImage, xPlaceOffset - sections[i].width, sections[i].yPos);
    }
    
    
    
    
    
    
    
   //sections[i].width * noise(noiseScalar* frameCount) is the change potentially?
            
//    for(i = 0; i < sections.length; i++)
//    {
//        var gottenImage = imageB.get(xGetOffset - sections[i].width * noise(noiseScalar* frameCount), sections[i].yPos, sections[i].width * noise(noiseScalar* frameCount), sections[i].height);        
//        
//        image(gottenImage, xPlaceOffset - sections[i].width * noise(noiseScalar* frameCount), sections[i].yPos);
//    }
//            
        
        
    
    
    
    
        
        
        
        
        
//        sections.push(imageB.get(xPos,yPos, sectionWidth,sectionHeight));
//        // put them into the image
//        // shifts the sections to the right slightly because they were one pixel off for some reasons
//    }
//    
//    for(i = 0; i < sections.length; i++)
//    {
//        image(sections[i], 1 + 2 * width/3 - sectionWidth, yPos);
//        
//    }
    
    

  
  //draw the mask image onto the background image    
   //drawMask(inro, width/3, height/2, width/2, height/3);
  
  // Draw upside-down of the inro.
  // Gene Kogan has a nice explanation: https://genekogan.com/code/p5js-transformations/

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
  
  var maxeyeball = 20;

  // start position
  translate(width/20, height/3);

    blendMode(DIFFERENCE);
  for (let n = 0; n < maxeyeball; n++)
  {
    let scaling = sin(map(n, 0, maxeyeball, 0, 2*PI)); //0-1

    image(eyeball, (width/maxeyeball) * noise( (0.005+n*0.001) * frameCount), scaling*height/3 + 40 * noise( (0.005+n*0.001) * frameCount), 0.3*eyeball.width, 0.3*eyeball.height);
    translate(eyeball.width/5,0); 
  }
    
  pop();
    
  //swapPixels(imageA)
    
    textSize(20);
    fill(255,0,0);
    stroke(255);
    text("mouseX: " + mouseX + "\n mouseY: " + mouseY, mouseX + 10, mouseY + 10);
    
    
    

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

function drawPixelMask(src_img, tar_img)// tried swap pixels on the picture every fith along the width
{
    blendMode(BLEND);
    
    src_img.loadPixels();
    tar_img.loadPixels();
    
    console.log("full array b4: ");
    console.log(tar_img.pixels);
    
    var pixel = 0;
    
    for(i = 0; i < src_img.width; i + 5)
        {
            for(j = 0; j < src_img.height; j++)
            {
                for(k = 0; k < 4; k++)
                {
                    //console.log(pixel);
                    
                    tar_img.pixels[pixel] = src_img.pixels[pixel];
                    pixel = pixel + 1;
                    
                }
            }
        }
    console.log("full array after: ");
    console.log(tar_img.pixels);
    
    src_img.updatePixels();
    tar_img.updatePixels();
    
    
}

function drawPixelMaskMixer(src_img, tar_img)// the idea is that every draw loop i get  arandom pixel from src image and tar img and swap a random pixel but just the instance to freeze with no error message
{
    var pixel;
    blendMode(BLEND);
    
    src_img.loadPixels();
    tar_img.loadPixels();
    
    pixel = random(0, tar_img.pixels.length);
                       
    tar_img.pixels[pixel] = src_img.pixels[pixel];
                       
    pixel = random(0, tar_img.pixels.length);
                    
    src_img.pixels[pixel] = tar_img.pixels[pixel];
    
    console.log("full array after: ");
    console.log(tar_img.pixels);
    
    src_img.updatePixels();
    tar_img.updatePixels();
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

