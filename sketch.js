
/***********************************************************************************
  Clickables
  by Hannah Gabany
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of how to use allocation tables with the
  modified p5.clickable class. This uses a ClickableManager class to
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;
var gDebugMode = false;
var clothingImg;

// indexes into the array (constants) CHANGE to be png for conform and deconform
const shrinkIndex = 0;
const growIndex = 1;
const aboutIndex = 2;
const whyIndex = 3;
const LargefitIndex = 4;
const SmallfitIndex = 5;

// constants for the balloon
const startEllipseDiameter = 30;
const poppedEllipseDiameter = 0;
const deflateAmount = 10;
const inflateAmount = 5;
const maxDiameter = 200;
const minDeflateDiameter = 5;


// pop soun
var popSound;

let Largefit;
let Smallfit;
let current_img;
let current_txt;

// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path
function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(1280,600);
  Largefit = loadImage('assets/Largefit.png');
  Smallfit = loadImage('assets/Smallfit.png');
  current_img = Largefit;

  // load the pop sound
  soundFormats('mp3');
  popSound = loadSound('assets/pop.mp3');

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // output to the message window
  console.log(clickables);
}

// Just draw the button
function draw() {
  background(128);
  image(current_img,460,60,460,460);
  fill(0);
  textFont('Helvetica', 13);
  text(current_txt,170,50,300,500);
  
  
  if(gDebugMode == true ){
    drawDebugInfo();
  }

  // draw the p5.clickables
  clickablesManager.draw();
}


function keyTyped(){
  if(key === ' '){
    gDebugMode = !gDebugMode;
  }
}

//debug function
function drawDebugInfo(){
  fill(225);
  text("X: " + mouseX + "  Y:" + mouseY, 20, height - 20);
}


// change individual fields of the clickables
function setupClickables() {
  // set the pop, inflate and deflate to be false, we will change this after
  // first balloon gets pressed
  clickables[shrinkIndex].visible = true;
  clickables[growIndex].visible = true; 

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// Change size of clothing
  if( this.id === growIndex ) {
    current_img = Largefit;
    current_txt = ' ';
  }
  else if(this.id === shrinkIndex){
    current_img = Smallfit;
    current_txt = ' ';
  }

// INFLATE OR DEFLATE
  else if( this.id === whyIndex ) {
    current_txt = 'Why because this is a cool idea';

    /*ellipseDiameter -= deflateAmount;
    ellipseDiameter = max(minDeflateDiameter,ellipseDiameter);   // prevents < 0
    */
  }
  else if( this.id === aboutIndex ) {
    current_txt = 'Clothes that when put on would have a section bracelet or button, upon pressing they would contract, conform, resize or adjust to the user and surroundings. Using Conforming/adjusting clothes would not only eliminate the need to buy multiple sizes but also multiple styles. Once someone buys one piece it can last them a lifetime, as you grow so does your clothes! With the ability to adjust texture and style you can have a long sleeve change to a jacket at just a press of a button or jeans to sweatpants. By having one piece to meet all of your needs we can practically eliminate the fast fashion industry along with the enormous amount of clothing waste created by mankind. The benefits of such a technology would be the environmental aspect, and the biggest group that would be helped would be those in poverty. No longer needing new clothes every year parents or children simply need to buy one item of clothing and it will grow and change at the same rate they do. The only downside for this technology would be the price point, and job loss. Hopefully in the future when this becomes a possibility, the price will be low and accessible to everyone. With the ability to have a single item of clothing, comes the loss of jobs for those who work in the fashion industry. However, with a new invention comes new jobs.';
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === aboutIndex || this.id === whyIndex ) {
    this.color = "#FFFFFF";
  }
  else {
    this.color = "#AAAAAA";
  }

  this.noTint = true;
}

//--- BALLOON FUNCTIONS --

// when a new balloon is made, we show pop and inflate and deflate button,
// change fill color and reset ellipse diamter
/*function newBalloon(idNum) {
  clickables[inflateIndex].visible = true;
  clickables[deflateIndex].visible = true; 
  ellipseDiameter = startEllipseDiameter;

  if( idNum === redIndex) {
    balloonColor = color('#FF0000');
  }
  else if( idNum === greenIndex) {
    balloonColor = color('#00FF00');
  }
  else if( idNum === yellowIndex) {
    balloonColor = color('#FFFF00');
  }
}

// if we pop the balloon, then you can't re-pop or inflate or deflate
function popBalloon() {
  popSound.play();

  ellipseDiameter = poppedEllipseDiameter;

  // balloon popped, hide these buttons
  clickables[inflateIndex].visible = false;
  clickables[deflateIndex].visible = false; 
}
*/


