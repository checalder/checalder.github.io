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
let testCell;

function setup() {
    createCanvas(800, 800, WEBGL);

// Test out the constructor function.

    testCell = new Cell(createVector(1,2,3), createVector(-1,-2,-3), 70, 600);
    cells = createCells(2, 300, 300, 2, 2, 500, 600);

}

function draw() {
  background(80); // clear screen
  fill(255)
  collideCells(cells);
  
  for(i = 0; i < cells.length; i++)
  {
    cells[i].draw();
    cells[i].move();
    cells[i].detectEdge();
  }
  
  //console.log(cells);
  // testCell.draw();
  // testCell.move();
}


/*
@param {Arguments} : position, velocity, diameter, life properties
*/

function Cell(position, velocity, diameter, life) 
{
  this.position = position;
  this.velocity = velocity;
  this.life = life;
  this.diameter = diameter;
  
  this.draw = function()
  {
    ellipse(this.position.x, this.position.y, this.diameter)
  }
  
  this.move = function()
  {
    this.position.add(this.velocity);
  }
  
  this.detectEdge = function()
  {
  }
    
}


/**
 * Initialise the cells array with a number of new Cell objects
 *
 * @param {Integer} n_cells Number of cells for the new array
 * @returns {Array} array of new Cells objects
 */
function createCells(n_cells, xPosRange, yPosRange, xVelRange, yVelRange, maxDiameter, maxLife) // added functionallity to be able to customise the cells directly from the createCells call, set default values so it is optional
{
  var array = [];
  
  for(i = 0; i < n_cells; i++)
  {    
    array.push(
      new Cell(
        createVector(random(-xPosRange, xPosRange), random(-yPosRange, yPosRange)),
        createVector(random(-xVelRange, xVelRange), random(-yVelRange, yVelRange)),
        random(maxDiameter/2, maxDiameter),
        random(maxLife/2, maxLife)));
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
          var distance = dist(cells[i].position.x, cells[i].position.y, cells[j].position.x, cells[j].position.y)
          //console.log(distance);
          if(distance < cells[i].diameter/2 + cells[j].diameter/2)//essentially if the total distance is less than both their radi
          {        
            var delta = (cells[i].diameter/2 + cells[j].diameter/2) - distance;

            // delta * normalized direction? we must normalize the vector subtract of the two object velocities (headings) tho ibelieve. 1st update velocity direction 2 move it along that direction by distance to avoid collision errors
            
            //cells[i].velocity = cells[i].velocity.sub(cell[j].velocity);

            var jDir = 0;
            var iDir = 0;

            iDir = cells[i].velocity.copy().normalize();
            jDir = cells[j].velocity.copy().normalize();
              
            iMag = cells[i].velocity.copy().mag();
            jMag = cells[j].velocity.copy().mag();
              
//            cells[i].position = cells[i].position - iDir.mult(iMag);
//            cells[j].position = cells[j].position -jDir.mult(jMag); // just cant get it to work, neet to use the force vector stuff
              
            cells[i].position = createVector(-300, 0);
            cells[j].position = createVector(300, 0);
              
//            iMag = cells[i].velocity.copy().mag();
//            jMag = cells[j].velocity.copy().mag();
              
//            cells[j].position = createVector(cells[j].x + delta*iDir.x, cells[j].y + delta*iDir.y);//adding the delta/2 to the correct direction. the ratios of how far to move x and y are obtained from the vector normalized values that make up the magnitude, delta is the magnitude by whice to move it overall and so we just move it in the correspoding direction as the two components of a normalized vector add up to 1. Remember we must use the opposite direction as we want it to move in the opposite direction
//              
            console.log("cell i before:");
            console.log(cells[i].velocity);
              
            console.log("cell j before:");
              console.log(cells[j].velocity);
              
            cells[i].velocity = jDir.mult(iMag);
            cells[j].velocity = iDir.mult(jMag);
              
            console.log("cell i after:");
            console.log(cells[i].velocity);
              
            console.log("cell j after:");
            console.log(cells[j].velocity);
            
              
            
            
            

//            dir = dir.sub(cells[j].velocity).normalize();
//            
//            var dir1 = dir.copy();
//            var dir2 = dir.copy();
            
            // cells[i].velocity = dir1.mult(-cells[i].velocity.mag());
            // cells[j].velocity = dir2.mult(cells[j].velocity.mag());
            //cells[i].velocity.mult(dir);
          }
        }        
      }
    }
  }


