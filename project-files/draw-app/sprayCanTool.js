function SprayCanTool()
{
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points;
    this.spread;
    
    this.draw = function()
    {
        this.spread = int(document.getElementById("spreadSlider").value);
        this.points = int(document.getElementById("densitySlider").value);
        this.points = this.points * this.spread
        
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed)
        {
            
            for(var i = 0; i < this.points; i++)
            {
                point(random(mouseX-this.spread, mouseX + this.spread),
                    random(mouseY-this.spread, mouseY+this.spread));
            }
        }
    };
    
    this.populateOptions = function(){
        
//        var option = document.getElementById(".options");
//        option.appendChild(createTextNode("helloworld"));
        //var textNode = document.createTextNode("Hello World");
        //document.getElementById(".options").appendChild(textNode);
        
        select(".options").html(
			"<input type='range' min='10' max='200' value='30' id='spreadSlider'> Spread\
            <input type='range' min='1' max='20' value='2' id='densitySlider'> Density");//for somereason, createlement does not work, something to do with the html being loaded after the script or something like that and so i have to use the select method, dont know why this works but the other does not. additionall, the .html rewrites the entire html code within that div so you must write all within the same comment
        
        
    }
    
    
}