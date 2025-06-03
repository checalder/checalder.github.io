/**
 * Cells lab 3 starter for IS51030B Graphics
 * Simulate moving cells in 3D environment using kinematics
 * Technical concepts
 *   - creating 2D, 3D vector
     - understanding 3D directions
     - Advanced kinematics
     - Collisions and edge detection
     - WEBGL programming. Texturing, lights
 * by Prashanth Thattai, 2024 <p.thattairavikumar@gold.ac.uk>
 */

let cells = []; // array of cells objects
var font;
var maxWidth = 300;
var maxDiameter = 600;
var minDiameter = 130;
var cellCount = 6;
var maxVelocity = 10;

function setup() {
    createCanvas(800, 800, WEBGL);
    camera(0, 0, 1000);

    font = loadFont("assets/inconsolata.otf");
// Test out the constructor function.
    
    cells = createCells(cellCount, maxVelocity, maxDiameter);

}

function draw() {
  background(80); // clear screen
  fill(255)
  collideCells(cells);
    checkDead(cells);
  
  for(i = 0; i < cells.length; i++){
    cells[i].draw();
    cells[i].move();
    cells[i].detectEdge();
  }  
}


/*
@param {Arguments} : position, velocity, diameter, life properties
*/

function Cell(position, velocity, diameter){//initial paramaters of a ell
    this.position = position;
    this.velocity = velocity;  
    this.diameter = diameter;
    this.life;
  
  this.draw = function(){// first we draw the ellipse in its position after after being moved by its move function, text has also been added to display the health
    //ellipse(this.position.x, this.position.y, this.diameter);
    
      
    //you can use translate to continually move the whole canvas in that instance of code right before you draw an object, thus moving an object within it like a sphere, then pop to unaffect the rest of your code. Just simply update the values used by translate at the start of every draw loop and you will be able to contain the effected object to only your sphere.  
      
    push();
    translate(this.position.x, this.position.y, this.position.z);
    colorMode(HSB);
    var hue = map(this.diameter, minDiameter, maxDiameter, 0, 120);
    
    console.log(hue);
    fill(hue, 255, 255);
    sphere(this.diameter/2);
    pop();
    
    this.life = this.diameter;
    
  }
  
  this.move = function(){// called in the draw function to continually move the position of the cell in accordance with the velocity
    this.position.add(this.velocity);
  }
  
  this.detectEdge = function(){//code for each corner limit, will reverse the velocitiy whenever the cell collides with the edge, will also move the cell in the opposite direction equal to the delta (how much it has gone over the edge) 
    
    if(this.position.x + this.diameter/2 > width/2){
        var delta = this.position.x + this.diameter/2 - width/2;
        this.position.x -= delta;
        this.velocity.mult(-1,1,1);
       }
    if(this.position.x - this.diameter/2 < -width/2){
        var delta = -(this.position.x - this.diameter/2 + width/2);
        this.position.x += delta;
        this.velocity.mult(-1,1,1);
       }
    if(this.position.y + this.diameter/2 > height/2){
        var delta = this.position.y + this.diameter/2 - height/2;
        this.position.y -= delta;
        this.velocity.mult(1,-1,1);
       }
    if(this.position.y - this.diameter/2 < -height/2){
        var delta = -(this.position.y - this.diameter/2 + height/2);
        this.position.y += delta;
        this.velocity.mult(1,-1,1);
       }
      if(this.position.z + this.diameter/2 > height/2){
        var delta = this.position.z + this.diameter/2 - height/2;
        this.position.z -= delta;
        this.velocity.mult(1,1,-1);
       }
    if(this.position.z - this.diameter/2 < -height/2){
        var delta = -(this.position.z - this.diameter/2 + height/2);
        this.position.z += delta;
        this.velocity.mult(1,1,-1);
       }
  }
    
}


/**
 * Initialise the cells array with a number of new Cell objects
 *
 * @param {Integer} n_cells Number of cells for the new array
 * @returns {Array} array of new Cells objects
 */
function createCells(n_cells, VelRange, maxDiameter) // added functionallity to be able to customise the cells directly from the createCells call, set default values so it is optional
{
  var array = [];
  
  for(i = 0; i < n_cells; i++)
  {    
    array.push(
      new Cell(
        createVector(random(-maxWidth, maxWidth), random(-maxWidth, maxWidth)),
        createVector(random(-VelRange, VelRange), random(-VelRange, VelRange), random(-VelRange, VelRange)),
        random(minDiameter, maxDiameter)));
  }
  
  return array;
}


/**
 * Collide two cells together
 * @param {Array} cellsArray Array of Cell objects to draw
 */
function collideCells(cells) 
  {    
  for(i = 0; i < cells.length; i++)
    {
      for(j = 0; j < cells.length; j++)
      {        
        if(i != j)
        {
            var cell1 = cells[i];
            var cell2 = cells[j];
            
          var distance = dist(cell1.position.x, cell1.position.y, cell1.position.z, cell2.position.x, cell2.position.y, cell2.position.z)
          
          var combinedRadi = cell1.diameter/2 + cell2.diameter/2;
            
          if(distance < combinedRadi)//essentially if the total distance is less than both their radi
          {  
            var delta = (cell1.diameter/2 + cell2.diameter/2) - distance;
              
            var toMoveDir = cell2.position.copy().sub(cell1.position.copy()).normalize();
              
            var cell2PositionAdditive = toMoveDir.mult(delta);
              
            cell2.position.add(cell2PositionAdditive);
              
            //GRADIENT THEORY, Y2 - Y1 / X2 - X1 IS GRADIENT FROM OBJ1 TO OBJ 2 IN COORDINATE MEASUREMENT

            var newJDir = cell1.velocity.copy().sub(cell2.velocity).normalize();// THE SUBTRACTION GIVES THE RESULTANT VALUES ACTING ON THE CELL2 NOT CELL1, IT IS NOT PERFECT AS THE VELCOCTY MAGNITUDES WOULD BE MULTIPLIED IF WE LEFT IT AT THAT SO WE NORMALIZE INSTEAD TO GET THE GENERAL DIRECTION, THEN WE PRESERVE THE OBJECTS INITIAL VELOCITY AND APPLY IT TO THE CELL
              
            var newIDir = newJDir.copy().mult(-1);
              
            cell1.velocity = newIDir.mult(cell1.velocity.mag());
            cell2.velocity = newJDir.mult(cell2.velocity.mag());
              
              
            cell1.diameter -= 10;// every collision decreases the cell diameters by 10
            cell2.diameter -= 10;
          }
        }        
      }
    }
  }

function checkDead(cells){
    for(i = 0; i < cells.length; i++){
        if(cells[i].life < minDiameter){
            cells.splice(i, 1);
        }
        
    }
}