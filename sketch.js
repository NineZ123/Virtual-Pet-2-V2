var dog, happyDog, database;
var foodS, foodStock;
var dogSprite;
var addFoodButton, feedPetButton;
var fedTime, lastFed;
var foodObj;

var input, greeting, name, button;
function preload()
{
	dog=loadImage("images/Dog.png");
 happyDog=loadImage("images/happydog.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1200, 800);
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dogSprite = createSprite(1000,300,100,100)
  dogSprite.addImage(dog);
  dogSprite.scale=0.25;

foodObj = new Food();
feedPetButton=createButton("Feed the Dog");
feedPetButton.position(700,95);
feedPetButton.mousePressed(feedDog);

addFoodButton=createButton("Add Food");
addFoodButton.position(800,95);
addFoodButton.mousePressed(addFood);

input=createInput("Change the Pet's Name");
input.position(900,95);

button=createButton("ENTER")
button.position(1300,90);
button.mousePressed(dogRename);
}


function draw() {  
background(46,139,87);


foodObj.display();
  drawSprites();

  //add styles here

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });


 


  textSize(20);
  fill("aqua");
  stroke("black");
  text("Remaining Food:" + foodS, 200,100);

  fill(255);
  textSize(20);
  if(lastFed>=12){
    text("Last fed: "+lastFed%12+"PM", 400, 100);
  }else if(lastFed===0){
    text("Last fed: "+lastfed+"AM", 400, 100)
  }

}




function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
  x=x-1;
  }
  
  database.ref('/').update({
    'Food':x


})
}

function readStock(data) {
  foodS = data.val()
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dogSprite.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()  
  });
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });   
}


function dogRename(name){

  name=input.value();
button.hide();
input.hide();
database.ref('/').update
name:name

}