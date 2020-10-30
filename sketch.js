
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime, score, ground;
var PLAY = 1;
var END = 0;
var gamestate = 1;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(60,170,0,0);
  monkey.addAnimation('running',monkey_running);
  monkey.scale=0.1;

  ground = createSprite(590,180,600,5);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  score=0;
  survivalTime=0;
  
  FoodGroup = new Group();
  obstacleGroup= new Group();
}


function draw() {
  
background("white");
  
   monkey.collide(ground);
    if(ground.x < 300){
      ground.x = ground.width/2;
    }
  
  if(gamestate == PLAY){
    
    survivalTime = Math.ceil(frameCount/frameRate());

    
    if(frameCount%150==0){
    banana = createSprite(550,Math.round(random (10,150)));
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.lifetime = 320;
    banana.scale=0.09;
    FoodGroup.add(banana);
    }
    
    if(monkey.isTouching(FoodGroup)){
       FoodGroup.destroyEach();
       score=score+2;
    }
    
    if(frameCount%300==0){
      obstacle = createSprite(500,160,0,0);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-4;
      obstacle.scale=0.12;
      obstacle.lifetime=200;
      obstacleGroup.add(obstacle);
    }
    
    if(monkey.isTouching(obstacleGroup)){
         gamestate=END;
         }
    
    if(keyDown("space") && monkey.y >=100){
      monkey.velocityY = -10 ;
    }
    
    monkey.velocityY = monkey.velocityY+0.8;
  }
    
  if(gamestate==END){
    
    ground.velocityX=0; 
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    
  
  }
drawSprites() 
  textSize(15);
  textFont("Crossiant One");
  text("Survival Time : "+survivalTime,245,20);
  
  textSize(15);
  textFont("Crossiant One")
  text(" score : "+score,270,40);
  
}


  
    





