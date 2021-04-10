var back,backGround;
var spaceship,spaceshipImg;
var alien,alienImg;
var alienGroup1,bulletGroup;
var gameState = 1;
var bullet,bulletImg;
var score = 0;
var alienImg2,alien2,alienGroup2;
var alienImg3,alien3,alienGroup3;
var score = 0;
var lives = 3;
var fuel,fuelImg,fuelGroup,fuelCount;
var 

function preload(){
  backGround = loadImage("backGr.jpg");
  spaceshipImg = loadImage("shooter.png");
  alienImg = loadImage("alien.png");
  bulletImg = loadImage("bullet.png");
  alienImg2 = loadImage("alien2.png");
  alienImg3 = loadImage("alien3.png");
  fuelImg = loadImage("fuel.png");
  
}

function setup() {
  createCanvas(1500,750);

  back = createSprite(750, 375, 50, 50);
  back.addImage(backGround);
  back.scale = 2;
  back.velocityY = 2;

  spaceship = createSprite(700, 650, 50, 50);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.6;

  alienGroup1 = new Group();
  alienGroup2 = new Group();
  alienGroup3 = new Group();
  bulletGroup = new Group();
  fuelGroup = new Group();
  
  fuelCount = 0;
}


function draw() {
  background(0);
  if(back.y > 500){
    back.y = 300;
  } 
  
if(gameState === 1){
  if(keyWentDown("Enter")){
    gameState = 2;
  }

}else if(gameState === 2){
  spawnAliens();
  spawnAliens2();
  spawnAliens3();
  spawnFuel();
//Moving the shooter with the arrow keys
    if(keyDown(LEFT_ARROW)){
      spaceship.x = spaceship.x - 10;
    }else if(keyDown(RIGHT_ARROW)){
      spaceship.x = spaceship.x + 10;
    }

    back.velocityY = (6 +1*score/10)
    
// release bullets when space key is pressed
  if (keyDown("space")) {
    createbullets();
  }
//Destroy the aliens 
  if(bulletGroup.isTouching(alienGroup1)){
    alienGroup1.destroyEach();
    bulletGroup.destroyEach();
    score = score + 5;
  }
  if(bulletGroup.isTouching(alienGroup2)){
    alienGroup2.destroyEach();
    bulletGroup.destroyEach();
    score = score + 10;
  }
  if(bulletGroup.isTouching(alienGroup3)){
    alienGroup3.destroyEach();
    bulletGroup.destroyEach();
    score = score + 3;
  }

  if(spaceship.isTouching(alienGroup1) && spaceship.isTouching(alienGroup2) && spaceship.isTouching(alienGroup3)){
    lives = lives - 1
  }
  if(spaceship.isTouching(fuelGroup)){
    fuelGroup.destroyEach();
    fuelCount = fuelCount + 1;
  }
  if(spaceship.distance > 1650){
    gameState = 3;
    
  }

  }

  drawSprites();
//Displaying Score 
  if(gameState === 2){
  textSize(25);
  fill("white");
  text("Score : " + score, 50,50);
  text("Lives : "+ lives, 1300,50);
  text("FuelCount : "+fuelCount,1250,600);
}

//Displaying instructions  
  if(gameState === 1){
  textSize(35);
  fill("white");
  stroke("white");
  textFont("astron")
  textStyle(ITALIC && BOLD);
  text("Instructions",100,100);
  text("1. Use the Arrow Keys to move left and right",100,200);
  text("2. Press Space key to shoot the aliens",100,300);
  text("3. You will have 3 lives to beat the aliens",100,400);
  text("Click Enter to start",900,650);
  }

  if(gameState === 3){
    fill("white");
    text("Yay!! You reached Earth safely",750,350);
  }
}
//Creating aliens
function spawnAliens2(){
  if(frameCount % 80 === 0){
  alien2 = createSprite(1200, 100, 50, 50);
  alien2.addImage(alienImg2);
  alien2.scale = 0.3;
  alien2.velocityY = 3
  alien2.x = Math.round(random(10,1200));
  alien2.lifetime = 750;
  alienGroup2.add(alien2);
  }
}

function spawnAliens3(){
  if(frameCount % 100 === 0){
  alien3 = createSprite(1200, 100, 50, 50);
  alien3.addImage(alienImg3);
  alien3.scale = 0.4;
  alien3.velocityY = 3;
  alien3.x = Math.round(random(10,1200));
  alien3.lifetime = 750;
  alienGroup3.add(alien3);
  }
}

function spawnAliens(){
  if(frameCount % 60 === 0){
  alien = createSprite(1200, 100, 50, 50);
  alien.addImage(alienImg);
  alien.scale = 0.3;
  alien.velocityY = 3
  alien.x = Math.round(random(10,1200));
  alien.lifetime = 750;
  alienGroup1.add(alien);
  }
}
// Creating  bullets
function createbullets() {
  var bullet= createSprite(100, 550, 30, 30);
  bullet.addImage(bulletImg);
  bullet.x = 360;
  bullet.x=spaceship.x;
  bullet.velocityY = -4;
  bullet.lifetime = 150;
  bullet.scale = 0.3;
  bulletGroup.add(bullet);
   
}
function spawnFuel(){
  if(frameCount % 450 === 0){
  fuel = createSprite(1200, 100, 50, 50);
  fuel.addImage(fuelImg);
  fuel.scale = 0.3;
  fuel.velocityY = 3
  fuel.x = Math.round(random(10,1200));
  fuel.lifetime = 750;
  fuelGroup.add(fuel);
  }
}