 //  __  __         _       _           ___                 
 // |  \/  |__ _ __| |___  | |__ _  _  / __| ___ __ _ _ _   
 // | |\/| / _` / _` / -_) | '_ \ || | \__ \/ -_) _` | ' \  
 // |_|  |_\__,_\__,_\___| |_.__/\_, | |___/\___\__,_|_||_| 
 //                              |__/                       

//Color constructor is used to store RGB values which can be retrieved and set with set/get methods
//Color constructor can alter the values with addToColor() and subtractToColor() for single incremental change
//getHexCodes() methods returns the current rgb values in a hexadecimal format string
//Cycle is used by cycleColors() and represents the current transition the colors are undergoing. 
    //0 = Red to Yellow
    //1 = Yellow to Green
    //2 = Green to Cyan
    //3 = Cyan to Blue
    //4 = Blue to Magenta
    //5 = Magenta to Red
function ColorConstructor(r,g,b,c){
    this.red=r;
    this.green=g;
    this.blue=b;
    this.cycle=c;
    
    this.getRed = function(){
        return this.red;
    }
    this.getGreen = function(){
        return this.green;
    }
    this.getBlue = function(){
        return this.blue;
    }
    this.getCycle = function(){
        return this.cycle;
    }
    this.setRed = function(x){
        this.red = x;
    }
    this.setGreen = function(x){
        this.green = x;
    }
    this.setBlue = function(x){
        this.blue = x;
    }
    this.setCycle = function(x){
        this.cycle = x;
    }
    this.addToColor = function(color){
        if(this[color]<256){
            this[color]+=1;
        }
        else{
            console.log(color+ "exceeded limit");
        }
    }
    this.subtractToColor = function(color){
        if(this[color]>0){
            this[color]-=1;
        }
        else{
            console.log(color+" can't have negative value");
        }
    }
    this.getHexCodes = function(){
        var hexCodeString = "#"
        if(!this.red.toString(16).charAt(1)){
            hexCodeString+="0";
        }
        hexCodeString += this.red.toString(16)
        if(!this.green.toString(16).charAt(1)){
            hexCodeString+="0";
        }
        hexCodeString += this.green.toString(16)
        if(!this.blue.toString(16).charAt(1)){
            hexCodeString+="0";
        }
        hexCodeString += this.blue.toString(16)
        return hexCodeString;
    }
}
//Returns a string representing the date in a 24hr format.
function getDate(){
    var currentTime = ""
    var date = new Date()
    if(date.getHours()<10){
        currentTime += "0"
    }
    else{
        console.log("you don't have to format the date this way")
    }
    currentTime += date.getHours() + ":"
    if(date.getMinutes()<10){
        currentTime += "0"
    }
    currentTime += date.getMinutes()+ ":"
    if(date.getSeconds()<10){
        currentTime += "0"
    }
    currentTime += date.getSeconds()
    return currentTime
}

//Translates the current time into a color and color transition which is stored in a ColorConstructor as colorValues
//This function is made to ensure a color cycle stays consistent when a user refreshes the page.
//The value currentTimeInSeconds is the elapsed amount of seconds past since 00:00 or 12:00AM
//Cycle Remainder tells you how far into a current cycle the time is in.
//singleCycle represents a single color transition phase
function setCurrentColorValues(currentTimeInSeconds){
    var cycleRemainder = (currentTimeInSeconds/1530)%1;
    var singleCycle = (255/1530);

    //Red to Yellow
    if(cycleRemainder>=0 && cycleRemainder<=singleCycle){
        colorValues.setRed(255)
        colorValues.setGreen(Math.round(cycleRemainder*1530))
        colorValues.setCycle(0)
    }
    //Yellow to Green
    else if(cycleRemainder>singleCycle && cycleRemainder<=(2*singleCycle)){
        colorValues.setGreen(255)
        colorValues.setRed(Math.round((255-cycleRemainder*1530)+255))
        colorValues.setCycle(1)
    }
    //Green to Cyan
    else if(cycleRemainder>(2*singleCycle) && cycleRemainder<=(3*singleCycle)){
        colorValues.setGreen(255)
        colorValues.setBlue(Math.round(cycleRemainder*1530-(255*2)))
        colorValues.setCycle(2)
    }
    //Cyan to Blue
    else if(cycleRemainder>(3*singleCycle) && cycleRemainder<=(4*singleCycle)){
        colorValues.setBlue(255)
        colorValues.setGreen(Math.round((255-cycleRemainder*1530)+255*3))
        colorValues.setCycle(3)
    }
    //Blue to Magenta
    else if(cycleRemainder>(4*singleCycle) && cycleRemainder<=(5*singleCycle)){
        colorValues.setBlue(255)
        colorValues.setRed(Math.round(cycleRemainder*1530-(255*4)))
        colorValues.setCycle(4)
    }
    //Magenta to Red
    else if(cycleRemainder>(5*singleCycle) && cycleRemainder<=(6*singleCycle)){
        colorValues.setRed(255)
        colorValues.setBlue(Math.round(255-cycleRemainder*1530)+255*5)
        colorValues.setCycle(5)
    }
    else{
        console.log('error in setCurrentColorValues')
    }
}

