function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	this.draw = function(){

		if(mouseIsPressed){   // when mouse is pressed drawing is set to true, then the pixels witing the image are loaded into array form
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				loadPixels();
			}

			else{// when the mouse is not being held down, the pixel edits are updated and displayed on the actual image
				updatePixels();
				line(startMouseX, startMouseY, mouseX, mouseY);// we draw a line according to the start mouse location to the current mouse location
			}

		}

		else if(drawing){
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
