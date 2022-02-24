
/***********************************************************************************
  Clickables
  by Hannah Gabany
  
  Start your localhost before running this, otherwise no PNGs will display


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
const whoIndex = 4;
const LargefitIndex = 5;
const SmallfitIndex = 6;



//varibles
let Largefit;
let Smallfit;
let current_img;
let current_txt;


function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}


function setup() {
  createCanvas(1280,600);
  Largefit = loadImage('assets/Largefit.png');
  Smallfit = loadImage('assets/Smallfit.png');
  current_img = Largefit;
  current_txt = 'Welcome to my Speculative Technology, Conforming Clothes! In the year 20XX, a new type of fabric will be developed that can fit to anyone';
  

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call function to setup additional information about the p5.clickables
  setupClickables(); 

  // output to the message window
  console.log(clickables);
}

// Just draw the button
function draw() {
  background(56, 104, 106);
  fill(161,204,165);
  strokeWeight(0);
  ellipse(690,280,460);
  image(current_img,460,60,460,460);
  
  if(current_txt !== ' '){
    drawRect();
  }
  fill(0);
  textFont('Helvetica', 13);
  text(current_txt,145,50,280,500);
  
  
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

//text background
function drawRect(){
  fill(163, 180, 162);
  strokeWeight(0);
  rect(140,40,295,490);
}

// change individual fields of the clickables
function setupClickables() {
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

// About, why, or who
  else if( this.id === whyIndex ) {
    current_txt = 'Why because this is a cool idea';
    
  }
  else if( this.id === aboutIndex ) {
    current_txt = 'Clothes that when put on would have a section bracelet or button, upon pressing they would contract, conform, resize or adjust to the user and surroundings. Using Conforming/adjusting clothes would not only eliminate the need to buy multiple sizes but also multiple styles. Once someone buys one piece it can last them a lifetime, as you grow so does your clothes! With the ability to adjust texture and style you can have a long sleeve change to a jacket at just a press of a button or jeans to sweatpants. By having one piece to meet all of your needs we can practically eliminate the fast fashion industry along with the enormous amount of clothing waste created by mankind. The benefits of such a technology would be the environmental aspect, and the biggest group that would be helped would be those in poverty. No longer needing new clothes every year parents or children simply need to buy one item of clothing and it will grow and change at the same rate they do. The only downside for this technology would be the price point, and job loss. Hopefully in the future when this becomes a possibility, the price will be low and accessible to everyone. With the ability to have a single item of clothing, comes the loss of jobs for those who work in the fashion industry. However, with a new invention comes new jobs.';
    
  }
  else if( this.id === whoIndex ) {
    current_txt = 'Who would benefit from this invention?\n- Those is impoverish areas\n-Those who cannot afford new cloths every year\n-Kids to young adults\n-People with body types that do not conform to societal standards\n-Designers who can create now looks without the waste of materials';
    
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#709775";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light green if off
clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === aboutIndex || this.id === whyIndex ) {
    this.color = "#A3B4A2";
  }
  else {
    this.color = "#A3B4A2";
  }

  this.noTint = true;
}