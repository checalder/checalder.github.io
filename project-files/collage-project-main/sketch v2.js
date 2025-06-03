/**
 * TITLE: PRIMAL EVOLUTION
 * THEME: animals, aliens, future, wolves
 *
 * This sketch demonstrates various image manipulation techniques in p5.js:
 *   1. Layering and compositing images with blendMode() and tint().
 *   2. Dynamically cropping and inverting horizontal slices of an image using Perlin noise.
 *   3. Drawing multiple “floating” eyeballs with oscillating positions and blendMode(DIFFERENCE).
 *
 * ORIGINAL AUTHOR: Prashanth Thattai (2023)
 * MODIFIED BY: Che Calder <checalder@hotmail.co.uk> (2024)
 */

// GLOBAL VARIABLES AND IMAGE DECLARATIONS

let imageA;          // Background “wolf” image
let imageB;          // Foreground “alien” image to slice and manipulate
let newImageB;       // Cropped slice of imageB (one-third of the width)
let xGetOffset;      // X-offset in imageB from which to get slices
let xPlaceOffset;    // X-offset on canvas where slices are drawn

let sections = [];   // Array to hold Section objects (each a horizontal band)
let noiseScalar = 0.02;   // Controls the “speed” of Perlin noise changes
let sectionWidth = 500;   // Base width (in pixels) for each slice before noise

let eyeball;         // PNG eyeball image (with transparency)

/**
 * Section constructor: represents a horizontal band of the image that will be 
 * dynamically cropped and inverted. Each Section has:
 *   - width: current width of the slice (modified by noise)
 *   - height: height of that band
 *   - yPos: vertical starting position (top) of that band
 */
function Section(width, height, yPos) {
    this.yPos = yPos;
    this.width = width;
    this.height = height;
}

/// --- PRELOAD ------------------------
/// Load images before setup() runs
function preload() {
    imageA = loadImage('assets/wolf.jpg');         // Background “wolf” image
    imageB = loadImage('assets/alien.jpg');        // Foreground “alien” image
    eyeball = loadImage('assets/eye.png');         // PNG eyeball (with alpha)
}

/// --- SETUP -------------------------
/// Initialize canvas, resize images, and prepare Sections array
function setup() {
    createCanvas(1920, 1080);

    // Resize background and foreground images to fill the canvas
    imageA.resize(width, height);
    imageB.resize(width, height);

    // Resize the eyeball to a manageable size (400x400)
    eyeball.resize(400, 400);

    // Determine where to “cut” a vertical slice from imageB (one-third across)
    xGetOffset = width / 3;
    // Extract the rightmost one-third of imageB as newImageB
    newImageB = imageB.get(xGetOffset, 0, width / 3, height);

    // Define how many horizontal slices we want
    let sectionCount = 5;
    // Small gap (in pixels) between each slice when calculating heights
    let interval = 2;

    // Create Section objects, each representing a band of the image
    for (let i = 0; i < sectionCount; i++) {
        // Compute height per section (including intervals for small gaps)
        let sectionHeight = height / (sectionCount + interval);
        // Compute vertical y-position for this section
        let yPos = (height / sectionCount + interval) * i;
        sections.push(new Section(sectionWidth, sectionHeight, yPos));
    }
}

/// --- DRAW LOOP ---------------------
/// Runs at 60 fps by default
function draw() {
    // 1. Reset compositing state and draw background
    tint(255, 255);
    blendMode(BLEND);
    imageMode(CORNER);
    image(imageA, 0, 0);
    colorMode(RGB);

    // 2. Draw the cropped slice of imageB on the right third of the canvas
    xPlaceOffset = (2 * width) / 3;
    image(newImageB, xPlaceOffset, 0);

    // 3. Update each Section’s width using Perlin noise for a smooth oscillation
    for (let i = 0; i < sections.length; i++) {
        sections[i].width = sectionWidth * noise(noiseScalar * frameCount);
    }

    // 4. For each Section: crop a slice from imageB, invert it, and draw it
    for (let i = 0; i < sections.length; i++) {
        let cropW = sections[i].width;
        let cropH = sections[i].height;
        let cropX = xGetOffset - cropW;
        let cropY = sections[i].yPos;

        // Get the slice from imageB, invert its colors, then draw it
        let slice = imageB.get(cropX, cropY, cropW, cropH);
        slice.filter(INVERT);
        image(slice, xPlaceOffset - cropW, cropY);
    }

    // 5. Draw multiple floating eyeballs using sin() and blendMode(DIFFERENCE)
    blendMode(BLEND);
    let alphaVal = 100 + 200 * noise(0.05 * frameCount);
    tint(0, 120, 150, round(alphaVal));
    imageMode(CORNER);
    blendMode(DIFFERENCE);

    push();
    let maxEyeballs = 20;
    translate(width / 20, height / 3);

    for (let n = 0; n < maxEyeballs; n++) {
        let angle = map(n, 0, maxEyeballs, 0, TWO_PI);
        let scaling = sin(angle);
        let jitterX = (width / maxEyeballs) * noise((0.005 + n * 0.001) * frameCount);
        let jitterY = scaling * (height / 3) + 40 * noise((0.005 + n * 0.001) * frameCount);

        image(
            eyeball,
            jitterX,
            jitterY,
            0.3 * eyeball.width,
            0.3 * eyeball.height
        );

        // Shift right for the next eyeball’s base position
        translate(eyeball.width / 5, 0);
    }
    pop();

    // 6. Display mouse coordinates near the cursor
    textSize(20);
    fill(255, 0, 0);
    stroke(255);
    text(
        `mouseX: ${mouseX}\nmouseY: ${mouseY}`,
        mouseX + 10,
        mouseY + 10
    );
}