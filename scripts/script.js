 //  __  __         _       _           ___                 
 // |  \/  |__ _ __| |___  | |__ _  _  / __| ___ __ _ _ _   
 // | |\/| / _` / _` / -_) | '_ \ || | \__ \/ -_) _` | ' \  
 // |_|  |_\__,_\__,_\___| |_.__/\_, | |___/\___\__,_|_||_| 
 //                              |__/                       

//Color constructor is used to store RGB values which can be retrieved and set with set/get methods
//Color constructor can alter the values with addToColor() and subtractToColor() for single incremental change
//getHexCodes() methods returns the current rgb values in a hexadecimal format string
//setCycleSpeed() method alters the speed at which the rainbow cycles
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

    //GET METHODS
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
    this.getCycleSpeed = function(){
        return this.cycleSpeed;
    }
    //SET METHODS
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
    this.setCycleSpeed = function(x){
        this.cycleSpeed = x
    }

    //INCREMENT/DECREMENT METHODS
    this.addToColor = function(color){
        if(this[color]<256-(this.cycleSpeed)){
            this[color]+=this.cycleSpeed;
        }
        else{
            this[color] = 255;
            console.log(color+ " reached positive limit");
        }
    }
    this.subtractToColor = function(color){
        if(this[color]>0+(this.cycleSpeed)){
            this[color]-=this.cycleSpeed;
        }
        else{
            this[color]=0;
            console.log(color+" reached negative limit");
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
function setCurrentColorValues(colorValues){
    var dateVar = new Date();
    var currentTimeInSeconds= dateVar.getHours()*3600+dateVar.getMinutes()*60+dateVar.getSeconds()

    var cycleRemainder = (currentTimeInSeconds*colorValues.getCycleSpeed()/1530)%1;
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
//cycleColor takes the cycle value from the color constructor and runs the corresponding color transition from that value.
//a color transition cycles through the colors of the rainbow
//cycleColor will change the cycle value if the current color transition has finished and will move seamlessly to the next transition
function cycleColor(colorCycleNum){
    switch(colorCycleNum){
        //Red to Yellow
        case 0:
            if(colorValues.getGreen()<255){
                colorValues.addToColor('green')
            }
            else{
                colorValues.subtractToColor('red')
                colorValues.setCycle(1)
            }
            break;
        //Yellow to Green
        case 1:
            if(colorValues.getRed()>0){
                colorValues.subtractToColor('red')
            }
            else{
                colorValues.addToColor('green')
                colorValues.setCycle(2)
            }
            break;
        //Green to Cyan
        case 2:
            if(colorValues.getBlue()<255){
                colorValues.addToColor('blue')
            }
            else{
                colorValues.subtractToColor('green')
                colorValues.setCycle(3)
            }
            break;
        //Cyan to Blue
        case 3:
            if(colorValues.getGreen()>0){
                colorValues.subtractToColor('green')
            }
            else{
                colorValues.addToColor('red')
                colorValues.setCycle(4)
            }
            break;
        //Blue to Magenta
        case 4:
            if(colorValues.getRed()<255){
                colorValues.addToColor('red')
            }
            else{
                colorValues.subtractToColor('blue')
                colorValues.setCycle(5)
            }
            break;
        //Magenta to Red
        case 5:
            if(colorValues.getBlue()>0){
                colorValues.subtractToColor('blue')
            }
            else{
                colorValues.addToColor('green')
                colorValues.setCycle(0)
            }
            break;
        //Error message
        default:
            console.log("uh oh spaghetti-os: problem in cycleColor")
            break;
    }
}

//Display functions alter their corresponding html tags
function displayDate(displayNode){
    hexNode.innerHTML = ''
    timeNode.innerHTML = getDate()
} 
function displayHex(displayNode){
    timeNode.innerHTML = ''
    hexNode.innerHTML = colorValues.getHexCodes()
}
function displayBackground(bgNode){
    bgNode.style.background = colorValues.getHexCodes()
}
function displayMinuteAnimation(timeNode){
    var date = new Date()
    var percent = Math.round(date.getSeconds())
    var clientHeight = document.getElementById('textContainer').clientHeight;

    //this is done because making font-size a vh unit adds extra content space to the top and bottom, 
    //and the gradient will start at the content of the page rather than the bottom of the text
    //the first parenthesis equation turns the 60 second scale into a 100%-like scale, 29 adds 29% to the gradient
    //which is the default bottom "content padding", the cycle scale is then changed to cycle to the top of the letters
    percent = ((percent*5/3)+29)*(6/10)

    timeNode.style.background = "-webkit-linear-gradient(bottom, rgba(0,0,0,.5) 0%,rgba(0,0,0,.5)" + (percent+1)+ "% ,rgba(50,50,50,.5)" + percent + "%,rgba(50,50,50,.5) 100%)"; 
    timeNode.style['-webkit-background-clip'] = "text"
    timeNode.style['-webkit-text-fill-color'] = "transparent"
}
// function displayLoadAnimation(date){
//     date.setAttribute('data-text', date)
// }


var colorValues = new ColorConstructor(0,0,0,0)


function main(){
    var containerNode = document.querySelector('#textContainer')
        timeNode = document.querySelector('#time')
        hexNode = document.querySelector('#hex')
        bgNode = document.querySelector('#background')
        pNode = document.querySelector('p')
        hoverState = {hover:false}
    
    colorValues.setCycleSpeed(15)
    setCurrentColorValues(colorValues)
    //These need to be declared so that the page doesn't start out on a blank screen
    displayDate(timeNode)
    displayBackground(bgNode)

    //If mouse over the text container for 500ms, set hover to hoverstate to true
    containerNode.addEventListener('mouseenter' , function(){
        var timer = setTimeout(function(){hoverState.hover = true},500); //sets true if hovered for 400ms
        containerNode.onmouseleave = function() {  clearTimeout(timer); } //remove timer        
    })

    //if mouse has left text container for 500ms, set hover state to false
    containerNode.addEventListener('mouseleave', function(){
        var timer = setTimeout(function(){hoverState.hover = false},500); //sets false if left for 400ms
        containerNode.onmouseenter = function() {  clearTimeout(timer); } //remove timer
    })

    function updatePage(){
        setInterval(function(){
            displayBackground(bgNode)
            displayMinuteAnimation(timeNode)
            if(!hoverState.hover){
                displayDate(timeNode)
            }
            else{
                displayHex(hexNode)
            }
        },50)

        setInterval(function(){
            cycleColor(colorValues.getCycle())
        },1000)

    }
    updatePage()
}

main()

