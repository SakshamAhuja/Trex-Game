var trex;
var treximg;
var trex_collided;
var trex_collidedimg;
var ground2;
var ground2img;
var invisibleGround;
var cloud;
var cloudimg;
var cloudGroup;
var obstacle1;
var obstacle1img;
var obstacle2;
var obstacle2img;
var obstacle3;
var obstacle3img;
var obstacle4;
var obstacle4img;
var obstacle5;
var obstacle5img;
var obstacle6;
var obstacle6img;
var obstacleGroup;
var PLAY = 1 ;
var END = 0;
var gameState = PLAY ;

var score = 0

var gameOver ;
var gameOverimg;
var restart ;
var restartimg;








function preload() {
  treximg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collidedimg = loadAnimation("trex_collided.png");
  ground2img = loadAnimation("ground2.png");
  cloudimg = loadAnimation("cloud.png");
  obstacle1img = loadAnimation("obstacle1.png");
  obstacle2img = loadAnimation("obstacle2.png");
  obstacle3img = loadAnimation("obstacle3.png");
  obstacle4img = loadAnimation("obstacle4.png");
  obstacle5img = loadAnimation("obstacle5.png");
  obstacle6img = loadAnimation("obstacle6.png");
  gameOverimg = loadAnimation("gameOver.png");
  restartimg = loadAnimation("restart.png");
  
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30, 160, 30, 30);
  trex.addAnimation("trex", treximg);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,50);
  
  
  ground2 = createSprite(27, 181, 1200, 2);
  ground2.addAnimation("ground2", ground2img);

  invisibleGround = createSprite(27, 181, 1200, 2);
  invisibleGround.visible = false;

  score = 0 ;
  
  gameOver = createSprite(320,125,60,60);
  gameOver.addAnimation("gameOver", gameOverimg);
  restart = createSprite(325,120,60,20);
  restart.addAnimation("restart",restartimg);
  
  gameOver.visible = false ;
  restart.visible = false ;
    
    
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background("white");
  
  text(mouseX + "," + mouseY, mouseX, mouseY);
  drawSprites();

  if (gameState === PLAY) {
    
    text("Score: "+ score, 450, 70);
  console.log(gameState);
    
    score = Math.round(World.frameCount/4);
  
    if (keyDown("space")) {
      trex.velocityY = -5;
      ground2.velocityX = -7 ;
    }
    trex.velocityY = trex.velocityY + 0.8


    if (ground2.x < 0) {
      ground2.x = ground2.width / 2;
    }
    


    trex.collide(invisibleGround);

    spawnClouds();

    spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)) {
     gameState = END ;
     
    }
  
    

  }

  else if (gameState === END) {
    trex.velocityY = 0 ;
    ground2.velocityX = 0 ;
  cloudGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  
    trex.addAnimation("trex_collided", trex_collidedimg);
    trex.changeAnimation("trex_collided", trex_collidedimg);
    
    gameOver.visible = true;
    restart.visible = true; 
  }
    
  
  if(mousePressedOver(restart)){
      gameState = PLAY
    trex.changeAnimation("trex",treximg) ;
    restart.visible = false ;
    gameOver.visible = false ;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
  
}
  
  


}


function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 200, 5, 5);
    cloud.y = Math.round(random(100, 150));
    cloud.addAnimation("cloud", cloudimg);
    cloud.velocityX = -10;

    cloud.lifetime = -6;
    
    cloudGroup.add(cloud) ;

  }
}

function spawnObstacles() {
  if (frameCount % 30 === 0) {
    var obstacle = createSprite(600, 160, 7, 7);
    obstacle.velocityX = -10;
    obstacle.scale = 0.5;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addAnimation("obstacle1", obstacle1img);
        obstacle.scale =0.5 ;
        break;
      case 2:
        obstacle.addAnimation("obstacle2", obstacle2img)
        obstacle.scale = 0.5 ;
        break;
      case 3:
        obstacle.addAnimation("obstacle3", obstacle3img)
        break;
      case 4:
        obstacle.addAnimation("obstacle4", obstacle4img)
        break;
      case 5:
        obstacle.addAnimation("obstacle5", obstacle5img)
        break;
      case 6:
        obstacle.addAnimation("obstacle6", obstacle6img)
        break;
    }
    
    obstacleGroup.add(obstacle)
    
  }
}