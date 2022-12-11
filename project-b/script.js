let animals;

function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer")
    animals = new animal();
}

function draw(){
    animals.display();
    animals.update();
}

class animal {
    constructor() {
      this.canvasDiv = (1 / 4) * width;
      this.x = (width - this.canvasDiv) / 2;
      this.y = (2 / 5) * height;
      this.numTools = 3;
  
      //Side Bar
      this.margin = 20;
  
      //Crumbles Variables
      this.cSize = [];
      this.cLocX = [];
      this.cLocY = [];
      this.cFallSpd = []; 
      this.numberOfCrumbles = 100;
      for (let i = 0; i < this.numberOfCrumbles; i++) {
        this.cLocX[i] = random(-50,50);
        this.cLocY[i] = random(-100,100);
        this.cSize[i] = random(10);
        this.cFallSpd[i] = random(3,10);
      }
      
      //Corn Variables
      this.cornFillDisappear = 255;
      this.leafY = 0;
      this.decider = 0;
      
      //Dirt Variables
      this.dSize = [];
      this.dLocX = [];
      this.dLocY = [];
      this.numberOfDirt = 100;
      for (let i = 0; i < this.numberOfDirt; i++) {
        this.dLocX[i] = random(width - this.canvasDiv);
        this.dLocY[i] = random(height);
        this.dSize[i] = random(5, 15);
      }
  
      //Sponge Variables
      this.spongeWidth = 30;
      this.spongeHeight = 50;
      this.hSize = [];
      this.hLocX = [];
      this.hLocY = [];
      this.spongeHolesNum = 100;
      for (let i = 0; i < this.spongeHolesNum; i++) {
        this.hLocX[i] = random(-this.spongeWidth / 2 + 5, this.spongeWidth / 2 - 5);
        this.hLocY[i] = random(-this.spongeHeight / 2 + 5, this.spongeHeight / 2 - 5);
        this.hSize[i] = random(5);
      }
  
      //Bubbles Variables
      this.bSize = [];
      this.bLocX = [];
      this.bLocY = [];
      this.numOfBubbles = 10;
      for (let i = 0; i < this.numOfBubbles; i++) {
        this.bLocX[i] = random(-this.spongeWidth / 2, this.spongeWidth / 2);
        this.bLocY[i] = random(-this.spongeHeight / 2, this.spongeHeight / 2);
        this.bSize[i] = random(20, 25);
      }
      
      this.time = 0;
  
      //Waves
      this.numOfWaves = 10;
      this.dia = 0;
  
      //Droplet falling height
      this.dropH = -this.x;
      
      //Background Color
      this.bgColorR = 250;
      this.bgColorG = 222;
      this.bgColorB = 220;
      this.numOfStars = 10;
      
      //Sleeping mouth size
      this.angle = 0;
      this.xSleep = 0;
      this.ySleep = 0;
      
      //Waving Variables
      this.wAngle = 45;
      this.changer = 0.05;
      
      //Bear Color
      this.skin = true;
      this.r = 250;
      this.g = 190;
      this.b = 100;
      this.subR = 250;
      this.subG = 170;
      this.subB = 120;
      this.subM = 255;
    }
  
    update() {
      push();
      translate(this.x, this.y);
      //Blinking every time
      if (this.time < 200 && this.time > 100) {
        this.eyesClosed(19, -8);
      } else if (this.time > 500) {
        this.time = 0;
      } else {
        this.eyesOpen(19, -8);
      }
  
      if (mouseIsPressed) {
        if((mouseX > this.margin + width - this.canvasDiv) && (mouseX < width - this.margin) && (mouseY > this.margin) && (mouseY < this.canvasDiv - this.margin)) {
          //Bear eats when corn toolbox is pressed
          this.eyesOpen(19, -8);
          fill(50);
          circle(0, 23, 20); //Mouth
          this.crumbles(0, 50, 1 / 4);
          this.corn(0, 50, 1 / 4, 1);
        } else if ((mouseX > this.margin + width - this.canvasDiv) && (mouseX < width - this.margin) && (mouseY > this.margin + height / this.numTools) && (mouseY < this.canvasDiv - this.margin + height / this.numTools)) {
          //Everything is being washed with Water
          push();
            translate(0, this.dropH);
            this.time = 100;
            if (this.dropH > 0) {
              this.disperse();
            } else {
              this.droplet(20, 40, 0, -10);
              this.dropH+=2;
            }
          pop();
        } else if ((mouseX > this.margin + width - this.canvasDiv) && (mouseX < width - this.margin) && (mouseY > this.margin + 2 * height / this.numTools) && (mouseY < this.canvasDiv - this.margin + 2 * height / this.numTools)) { 
          //nightime
          this.bgColorR = 42;
          this.bgColorG = 59;
          this.bgColorB = 69;
          this.time = 100;
        } else if((mouseX > this.x - 120) && (mouseX < this.x - 90) && (mouseY > height - 40) && (mouseY < height - 10)){
          //Waving
          this.wAngle -= this.changer;
          fill(175);
          rect(-10, 20, 20, 2);
          if(this.wAngle < 43){
            this.changer = -this.changer;
          } else if(this.wAngle > 45){
            this.changer = -this.changer;
          }  
      } else if((mouseX > this.x + 100) && (mouseX < this.x + 130) && (mouseY > height - 40) && (mouseY < height - 10)){
          if(this.skin == true){
            this.r = 250;
            this.g = 250;
            this.b = 250;
            this.subR = 150;
            this.subG = 150;
            this.subB = 150;
            this.subM = 150;
            this.skin = false;
          } else {
            this.r = 250;
            this.g = 190;
            this.b = 100;
            this.subR = 250;
            this.subG = 170;
            this.subB = 120;
            this.subM = 255;
            this.skin = true;
          }
      } else if (mouseX > 0 && mouseX < width - this.canvasDiv && this.bgColorR == 250) {
          //The Sponge and Bubbles appear and clean when mouse is pressed within the grey area
          push();
            translate(mouseX - this.x, mouseY - this.y);
            this.bubble();
            this.sponge();
            this.clean();
            this.time = 100;
          pop();
        }
      } else {
        fill(175);
        rect(-10, 20, 20, 2); // Mouse is not Pressed normal mouth
        //Return to Orginal Positions
        this.dropH = -this.x;
        this.dia = 0;
        this.bgColorR = 250;
        this.bgColorG = 222;
        this.bgColorB = 220;
        this.cornFillDisappear = 255;
        this.leafY = 0;
        this.wAngle = 45;
        for (let i = 0; i < this.numberOfCrumbles; i++){
          this.cLocY[i] = 0;
        }
      }
      
      //Nighttime Blanket
      if(this.bgColorR == 42){
         let mSize = 5 * sin(radians(this.angle)) + 10;    //Equation

          fill(150);
          stroke(1);
          circle(0,22,mSize);                              //Dialating Mouth
          
          push();
            translate(20,-10);
            rotate(60);
            //Flying Letters
            for(let i = 0; i < 3; i++){
              strokeWeight(2);
              fill(255 + this.xSleep * 50);
              text("Z",(i * 20 - 40) + this.xSleep, (-i * 15) + this.ySleep);
            }
            if(this.xSleep < -5){
              this.xSleep = 0;
              this.ySleep = 0;
            }else{
              this.xSleep-=0.1;
              this.ySleep+=1.1;
            }
          pop();
          
          fill(200);
          rect(-100,50,200,140);
          for(let j = 0; j < this.numOfStars * 7/10; j++){
            for(let i = 0; i < this.numOfStars; i++){
              fill(255, 244, 43,200);
              this.star(-90 + i * (180/this.numOfStars + this.numOfStars/5),60 + j *(120/this.numOfStars + this.numOfStars * 7/9))
            }
          }
          
          this.angle++;
         }
      
      pop();
    }
  
    display() {
      background(this.bgColorR, this.bgColorG,this.bgColorB);
      
      push();
        translate(this.x, this.y); //Bear
        this.body();
        this.head();
      pop();
  
      push();
        let sideSqr = (this.canvasDiv - this.margin * 2)
        translate(width - this.canvasDiv, 0); //Toolbar
        fill(131, 76, 161);
        rect(0, 0, this.canvasDiv, height); //Main Bar
        for (let i = 0; i < this.numTools; i++) {
          stroke(4);
          fill(255);
          square(this.margin,(this.margin + i * (height / this.numTools)), sideSqr);
        }
        this.corn((this.canvasDiv / 2),(height / this.numTools - this.canvasDiv + this.margin),1/5);
        this.droplet(25, 40, (this.canvasDiv / 2), (2 * height / this.numTools - this.canvasDiv + (3 / 2) * this.margin));
        this.moon((this.canvasDiv / 2),(3 * height / this.numTools - this.canvasDiv + this.margin));
      
        //Instructions
        push();
          translate((this.canvasDiv / 2) - sideSqr/2,(height / this.numTools - sideSqr + 1.2 * this.margin));
          textSize(14);
          text("Feeding 🍼",0,0);
          text("Washing 🚿",0,(height / this.numTools));
          text("Sleep 😴",  0,(2 * height / this.numTools))
        pop();
        
        //Bellow Bear
        push();
          translate((-this.x - 70), (height - 20));
          fill(255);
          square(-50, -20, 30);
          rect(0, -20, 150, 30);
          square(170, -20, 30);
          fill(0);
          textSize(20);
          text("👋",-45,2);
          text("👕",175,2);
          textSize(12);
          text("Press Screen to Clean 🧽",10,0);
        pop();
      pop();
  
      this.dirt();
      this.time++;
    }
  
    head() {
      this.ears(40, -40);
      fill(this.r, this.g, this.b);
      ellipse(0, 0, 110, 100);
      noStroke();
      fill(this.subM);
      ellipse(0, 20, 55, 50);
      stroke(1);
      fill(201, 124, 6);
      triangle(0, 10, -10, 0, 10, 0); //Nose
      this.eyesClosed(-19, 0);
    }
  
    body() {
      stroke(1);
      fill(this.r, this.g, this.b);
      ellipse(0, 100, 130, 140); //Body
      fill(this.subR, this.subG, this.subB);
      ellipse(0, 100, 80, 80); //Inner body
      
      //Right Arm
      push();
        translate(70,90);
        rotate(-45);
        fill(this.r, this.g, this.b);
        ellipse(0, -40, 60, 80);
        fill(60);
        rect(-10, -80, 5, 25);
        rect(5, -80, 5, 25);
      pop();
      
      //Left Arm
      push();
        translate(-70,90);
        rotate(this.wAngle);
        fill(this.r, this.g, this.b);
        ellipse(0, -40, 60, 80);
        fill(60);
        rect(-10, -80, 5, 25);
        rect(5, -80, 5, 25);
      pop();
      
      fill(this.r, this.g, this.b);
      circle(45, 150, 70); //Outer Right Feet
      circle(-45, 150, 70); //Outer Left Feet
      fill(this.subR, this.subG, this.subB);
      circle(45, 145, 40); //Inner Right Feet
      circle(-45, 145, 40); //Inner Left Feet
    }
    
    moon(x,y){
      push();
        translate(x,y);
        noStroke();
        fill(163);
        circle(0,0,50);
        fill(255);
        circle(10,-5,40);
        fill(255, 244, 43);
        this.star(10,-7,1);
      pop();
    }
    
    star(x,y){
      push();
        translate(x,y);
        stroke(1);
        beginShape();
          vertex(5, -3);
          vertex(10, -3);
          vertex(6, 3);
          vertex(10, 10);
          vertex(0, 6);
          vertex(-10, 10);
          vertex(-6, 3);
          vertex(-10, -3);
          vertex(-5, -3);
          vertex(0, -10);
        endShape(CLOSE);
      pop();
    }
  
    droplet(dia, height, x, y) {
      push();
        translate(x, y);
        noStroke();
        fill(107, 198, 250, 240);
        triangle(-dia / 2, 0, dia / 2, 0, 0, -height);
        circle(0, 0, dia);
      pop();
    }
  
    disperse() {
      //All the dirt disperses away from the water droplet/bear
      for (let i = 0; i < this.numberOfDirt; i++) {
        if (this.dLocX[i] - this.x > 0) {
          this.dLocX[i] += random(1);
        } else {
          this.dLocX[i] -= random(1);
        }
  
        if (this.dLocY[i] - this.y > 0) {
          this.dLocY[i] += random(1);
        } else {
          this.dLocY[i] -= random(1);
        }
      }
      this.dirtWithin();
  
      //Waves
      for (let i = 0; i < this.numOfWaves; i++) {
        fill(107, 198, 250, 100 - (i * 100) / this.numOfWaves);
        ellipse(0,0, ((i * this.dia) / this.numOfWaves),(i * this.dia / this.numOfWaves * 1.5));
      }
  
      //Waves within limit
      if (this.dia > 3 * this.x) {
        this.dia = 3 * this.x;
      } else {
        this.dia++;
      }
    }
  
    dirt() {
      for (let i = 0; i < this.numberOfDirt; i++) {
        noStroke();
        fill(100, 150);
        circle(this.dLocX[i], this.dLocY[i], this.dSize[i]);
      }
    }
  
    sponge() {
      fill(252, 186, 3, 150);
      rect((-this.spongeWidth / 2),(-this.spongeHeight / 2),(this.spongeWidth),(this.spongeHeight),20);
      for (let i = 0; i < this.spongeHolesNum; i++) {
        fill(201, 150, 6, 150);
        circle(this.hLocX[i], this.hLocY[i], this.hSize[i]);
      }
    }
  
    bubble() {
      for (let i = 0; i < this.numOfBubbles; i++) {
        fill(255, 100);
        circle((random(-10, 10) + this.bLocX[i]),(random(-10, 10) + this.bLocY[i]), this.bSize[i]);
      }
    }
  
    clean() {
      for (let i = 0; i < this.numberOfDirt; i++) {
        //Disperse away from mouse when within distance
        if ((dist(mouseX, mouseY, this.dLocX[i], this.dLocY[i])) < 50) {
          if (this.dLocX[i] - mouseX > 0) {
            this.dLocX[i] += random(1); // Moving to the Right if the distance between the mouse and the dirt is greater than 50; mouse is to the left
          } else {
            this.dLocX[i] -= random(1); // Moving to the Left if the distance between the mouse and the dirt is greater than 50; mouse is to the right
          }
  
          if (this.dLocY[i] - mouseY > 0) {
            this.dLocY[i] += random(1); // Moving to the Up if the distance between the mouse and the dirt is greater than 50; mouse is to the down
          } else {
            this.dLocY[i] -= random(1); // Moving to the Down if the distance between the mouse and the dirt is greater than 50; mouse is to the up
          }
  
          if (this.dSize[i] > 1) {
            this.dSize[i] -= 0.15; //Dirt will diminish in size the longer it stays close to the mouse
          }
        }
      }
      this.dirtWithin();
    }
  
    dirtWithin() {
      for (let i = 0; i < this.numberOfDirt; i++) {
        if (this.dLocX[i] < 10) {
          this.dLocX[i] = 10;
        } else if (this.dLocX[i] > width - this.canvasDiv - 10) {
          this.dLocX[i] = width - this.canvasDiv - 10;
        } else if (this.dLocY[i] < 10) {
          this.dLocY[i] = 10;
        } else if (this.dLocY[i] > height - 10) {
          this.dLocY[i] = height - 10;
        }
      }
    }
  
    corn(x, y, s, a) {
      push();
        translate(x, y);
        scale(s);
        
        //Making the Leaf Fall
        if(this.cornFillDisappear == 0){
          noStroke();
          if(this.leafY > 500){
            this.leafY = 500;
          } else {
            this.leafY+= 10;
          }
        } else {
          stroke(1);
        }
        
        //Action or Not
        if(a == 1){
          this.decider = this.leafY;
        }else{
          this.decider = 0;
        }
        
        fill(245, 213, 32,this.cornFillDisappear);
        ellipse(0, 0, 100, 200);
        //Line Dividsion Horizontal
        for (let i = 0; i < 11; i++) {
          noFill();
          ellipse(0, 0, 100, 200 - i * 20);
        }
        //Line Dividsion Vertical
        for (let i = 0; i < 6; i++) {
          noFill();
          ellipse(0, 0, 100 - i * 20, 200);
        }
  
        //Leaf
        push();
          translate(0,this.decider);
          noStroke();
          fill(2, 212, 124);
          circle(0, 100, 50);
          triangle(-25, 100, 0, 75, -90, -50);
          triangle(25, 100, 0, 75, 90, -50);
        pop();
      pop();
    }
    
    crumbles(x, y, s){
      push();
        translate(x, y);
        scale(s);
        stroke(1);
      
        for (let i = 0; i < this.numberOfCrumbles; i++) {
          fill(245, 213, 32);
          circle(this.cLocX[i],this.cLocY[i],this.cSize[i]);
          
          if(this.cLocY[i] > 600){
            this.cLocY[i] = 600;
            if(this.cLocY[this.numberOfCrumbles - 1] > 600){
              this.cornFillDisappear = 0;
            }
          } else {
            this.cLocY[i]+= this.cFallSpd[i];
          }
        }
      pop();
    }
  
    ears(dist, alt) {
      push();
        translate(dist, alt);
        fill(this.r, this.g, this.b);
        circle(0, 0, 50); //Outer Left
        circle(-2 * dist, 0, 50); //Outer Right
        fill(this.subR, this.subG, this.subB);
        circle(-2 * dist, 0, 30); //Inner Right
        circle(0, 0, 30); //Inner Left
      pop();
    }
  
    eyesOpen(dist, alt) {
      //looking direction
      let idirectX = map(mouseX, 0, width, -2, 2);
      let idirectY = map(mouseY, 0, height, -3, 1);
      let pdirectX = map(mouseX, 0, width, -4, 4);
      let pdirectY = map(mouseY, 0, height, -4, 0);
  
      push();
        translate(dist, alt);
        fill(255);
        ellipse(-2 * dist, 0, 15, 20); //Eyeball Left
        ellipse(0, 0, 15, 20); //Eyeball Right
        fill(0);
        ellipse(-2 * dist + idirectX, idirectY, 14, 18); //Iris Left
        ellipse(idirectX, idirectY, 14, 18); //Iris Right
        fill(255);
        ellipse(-2 * dist + idirectX + pdirectX, idirectY + pdirectY, 3.75, 5); //Iris Left
        ellipse(idirectX + pdirectX, idirectY + pdirectY, 3.75, 5); //Iris Right
      pop();
    }
  
    eyesClosed(dist, alt) {
      push();
        translate(dist, alt);
        line(-2 * dist - 15 / 2, -10, -2 * dist + 15 / 2, -10);
        line(-15 / 2, -10, 15 / 2, -10);
      pop();
    }
}