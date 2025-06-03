//function RectanleTool()
//{
//    this.name = "Rectanlge";
//    this.icon = "assets/mirrorDraw.jpg";
//    this.mouseArr.X = [];
//    
//    this.draw = function()
//    {
//        loadPixels();
//        if(mouseIsPressed)
//        {
//            this.mouseArr.X.push(mouseX);
//            console.log(this.mouseArr.X[this.mouseArr.X.length - 1]);
//            loadPixels();
//            
//        }
//        else
//        {
//            updatePixels();
//            rect(this.mouseArr.X[0], 20, this.mouseArr.X[this.mouseArr.X.length - 1] - this.mouseArr.X[0], 100);
//        }
//    }
//}

function RectanleTool()
{
    this.name = "Rectanlge";
    this.icon = "assets/mirrorSraw.jpg";//doesnt work when the file is called rectanlges.jgp for some reason
    this.mouseArr = {
        X: [],
        Y: []
    }
    
    this.draw = function()
    {
        
        if(mouseIsPressed)
        {
            updatePixels();// update pixels removes the old rectangle that was drawn in the previous loop and replaces it with the updated dimensions
            //i dont want to remove my rectangle after i lift the mouse and so it is inside the mouse pressed function
            // load pixels is used within the else to avoid deleting previously drawn rectangles every time i start drawing a new rectangle
            // check notes for better explanation
            
            this.mouseArr.X.push(mouseX);
            this.mouseArr.Y.push(mouseY);
            
            console.log(this.mouseArr.X);
            
            rect(
                this.mouseArr.X[0],
                this.mouseArr.Y[0],
                this.mouseArr.X[this.mouseArr.X.length - 1] - this.mouseArr.X[0], 
                this.mouseArr.Y[this.mouseArr.Y.length - 1] - this.mouseArr.Y[0]
            );            
        }
        
        
        else
        {
            loadPixels();
            this.mouseArr.X = [];
            this.mouseArr.Y = [];
        }
    }
}