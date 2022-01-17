var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0
var collection=0
var boy,ground,gem,ring,coin1;
var boyimg,gameOverImg;

var  groundimg,gemimg,ringimg,coinimg;
var invisibleGround1,invisibleGround2;

var gameover,restart;
var restartImg
var sword,swordimg;

var boyImg;


function preload(){

   boyimg = loadAnimation("Runner-1.png","Runner-2.png");
   groundimg = loadImage("Road.png")
   ringimg = loadImage("ring.png")
   gameOverImg = loadImage("gameOver.png")
   restartImg = loadImage("restart.png")
   swordimg = loadImage("sword.png")
   coinimg = loadImage("coin.png")
   gemimg = loadImage("gem.jpg")
   boy_collided = loadAnimation("Runner-1.png")

}

function setup() {
 createCanvas(windowWidth,windowHeight)

   
   


     ground= createSprite(500,400,width+500,height);
     ground.addImage(groundimg);
     ground.scale=0.5
     ground.x = width/2
     ground.velocityX = -(6 + 3*score/100);
     
     boy= createSprite(200,500);
     boy.addAnimation("Running",boyimg);
     boy.addAnimation("collided",boy_collided)
     boy.scale=0.08;
     
     
     

   
     

     invisibleGround1 = createSprite(500,10,width,50);
     invisibleGround1.visible = false;
    

     invisibleGround2 =createSprite(700,5,width,50)
     invisibleGround2.visible = false;
       

     gameover = createSprite(600,280);
     gameover.addImage(gameOverImg);
     gameover.scale=0.5; 
     gameover.visible=false;
    

     restart = createSprite(600,330);
     restart.addImage(restartImg);
     restart.scale = 0.07;
     restart.visible=false;
   



     gemGroup = new Group();
     ringGroup = new Group();
     swordGroup = new Group();
     coinGroup = new Group();

     collection = 0;
     score = 0;
     
}

function draw() {
    
    background(40) 
    
   

  
   if (gameState === PLAY) {
     score = score + Math.round(getFrameRate()/60);
     ground.velocityX = -(6 + 3*score/100);
     
     boy.y = World.mouseY;
   
   if(coinGroup.isTouching(boy)){
      collection= collection+1
      coinGroup.destroyEach();
   }
   
   
   if(ground.x < 0 ){
      ground.x = width/2;
    }

      boy.collide(invisibleGround1);
     boy.collide(invisibleGround2);
 
     creategem ();
     createring ();
     createsword ();
     createcoin ();
    
   
    
   if (gemGroup.isTouching(boy))  {
       collection=collection+3
       gemGroup.destroyEach()
   }
   
   if (ringGroup.isTouching(boy))  {
       collection=collection+2
       ringGroup.destroyEach()
}
    
     
   if(swordGroup.isTouching(boy))  {

       swordGroup.destroyEach()
       ringGroup.destroyEach()
       gemGroup.destroyEach()
       coinGroup.destroyEach()
       gameState = END;
   }  
    
    
     
   
   
   }
   
       
     
  



   else if (gameState === END) {
      
       gameover.visible = true;
       restart.visible = true;
      
       ground.velocityX = 0;
       coinGroup.setVelocityXEach(0);
       swordGroup.setVelocityXEach(0);
       ringGroup.setVelocityXEach(0);
       gemGroup.setVelocityXEach(0);
     
       ringGroup.setLifetimeEach(-1);
       coinGroup.setLifetimeEach(-1);
       gemGroup.setLifetimeEach(-1);
       swordGroup.setLifetimeEach(-1);
       
        boy.changeAnimation("collided",boy_collided)
      

     if( keyDown("SPACE"))  {
          reset();
          touches = []
    


     }
       



   
    
    
}

  

drawSprites();

textSize(20);
fill("white");
text("Collection: "+ collection,width-180,70);

textSize(20);
fill("white");
text("Score: "+ score,width-180,40);

 
}


function createring() {

if(frameCount%100===0){
    ring=createSprite(600,550,400,10);
    ring.velocityX= -(6 + 3*score/100);;
    ring.addImage(ringimg);
    ring.y=Math.round(random(100,1000));
    ring.scale=0.4;
    ring.lifetime = 300
    ringGroup.add(ring);
   
    ring.depth = boy.depth;
    boy.depth = boy.depth+1;
    
   
    
}


    

}


function creategem() {

  if(frameCount%150===0){
     gem =createSprite(600,350,400,10);
     gem.velocityX= -(6 + 3*score/100);
     gem.addImage(gemimg);
     gem.y=Math.round(random(100,1000));
     gem.scale=0.4;
     
      gemGroup.add(gem)

      gem.depth = boy.depth;
      boy.depth = boy.depth+1;
    
  }
  
  
  }


  function createcoin() {

    if(frameCount%500===0){
       coin1 =createSprite(600,400,400,10);
       coin1.velocityX=-10;
       coin1.addImage(coinimg);
       coin1.y=Math.round(random(100,1000));
       coin1.scale=0.4;
       coin1.lifetime = 300
       coinGroup.add(coin1);

       coin1.depth = boy.depth;
       boy.depth = boy.depth+1;
       
    }
    
    
    
    }




  function createsword() {

    if(frameCount%200===0){
       sword =createSprite(700,200,400,10);
       sword.velocityX= -(6 + 3*score/100);
       sword.addImage(swordimg);
       sword.y=Math.round(random(100,1000));
       sword.scale=0.2;
       sword.lifetime = 300
       swordGroup.add(sword);
        
       sword.depth = boy.depth;
       boy.depth = boy.depth+1;
       
       

    }
    
    
    
    }
  
  
    

  function reset(){
     gameState = PLAY;
     gameover.visible = false;
     restart.visible = false;
    
     ringGroup.destroyEach()
     gemGroup.destroyEach()
     coinGroup.destroyEach()
     swordGroup.destroyEach()
     
     boy.changeAnimation("Running",boyimg)
    
    score = 0;
    collection = 0
  }




















