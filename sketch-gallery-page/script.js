let spirals = [];
let sprNum = 10;

function setup(){
    let cnv = createCanvas(420,400);
    cnv.parent("canvasContainer")

    background(50);
    for (let i = 0; i < width; i+=10){
      noFill();
      stroke(255,100 - 100 * i/width);
      ellipse(width/2,height/2,i * 2/3,i);
    } 
    for (let i = 0; i < sprNum; i++) {
      spirals[i] = new Spiral(random(2/5 * width,3/5 * width),random(2/5 * height,3/5 * height),random(1,25));
    }
  }
  
  function draw() {
    for(let i = 0 ; i < spirals.length; i++){
      spirals[i].update();
      spirals[i].display();
    }
    
    //Information
    stroke(255);
    fill(0);
    rect(0,height * 15/18, 155, 65);
    stroke(255);
    strokeWeight(3);
    text(" Press to Add \n Press 'a' to add new spiral \n Press 's' to Change Color", 5, height * 7/8);
  }
  
  function keyPressed(){
    if(key == 'a'){
      let s = new Spiral(random(2/5 * width,3/5 * width),random(2/5 * height,3/5 * height),random(1,25));
    spirals.push(s)
    }
  }
  
  class Spiral{
    constructor(StartX,StartY,Scale){
      //Location Var
      this.x = StartX;
      this.y = StartY;
      
      //Spiral 
      this.spiralDirectionX = random([random(100,200),random(-100,-200)]);
      this.spiralDirectionY = random([random(100,200),random(-100,-200)]);
      this.spiralW = random(-60,60);
      this.spiralH = random(-60,60);
      this.angle = 0;
      
      //Time stop
      this.stop = 6 * PI;
      
      //Size
      this.s = Scale;
      
      //Color 
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
    
    display(){
      push();
        translate(this.x + this.spiralX,this.y + this.spiralY); 
        this.branch();
        this.newBranch();
      pop();
    }
    
    branch(){
      strokeWeight(1);
      stroke(0,205,205,100 - (100 * (this.angle/this.stop)));
      fill(this.r, this.g, this.b,100 - (100 * (this.angle/this.stop)));
      square(0,0,this.s);
    }
    
    update(){
      this.spiral();
      this.colorChange();
    }
    
    spiral(){
      //Equations for Loop
      this.spiralX = this.spiralW * sin(6 * this.angle) + this.spiralDirectionX * this.angle;
      this.spiralY = this.spiralH * sin(6 * this.angle) + this.spiralDirectionY * this.angle;
      
      if(mouseIsPressed == true){
        this.angle += PI/150;                  //Making the Branch
        this.s+= 10 * (this.angle/this.stop);  //Size changing
      }
      
      //Limit size no greater than 100
      if((this.s > 100)){
        this.angle = this.stop;
      }
    }
    
    newBranch(){
      //How much to the side the new branch is.
      this.sideX = random(-0.5,0.5);
      this.sideY = random(0.5,1);
      
      //Condition to making a new Branch
      if(mouseIsPressed == true){
        if(this.angle > random(0,this.stop)){
        
          //Making a new spiral
          for(let i = 0; i < this.s * 5; i++){
            //Equations
            this.cosVal = this.spiralW * sin(6 * i) + this.spiralDirectionX/15 * i;
            this.sinVal = this.spiralH * sin(6 * i) + this.spiralDirectionY/15 * i;
            
            this.colorChange();
  
            stroke(0,205,205,100 - (100 * (this.angle/this.stop)) - i/2);
            fill(this.r - 50, this.g - 50, this.b - 50, 100 - (100 * (this.angle/this.stop)) - i/2);
            square((i + this.cosVal) * this.sideX,(this.sideY + this.sinVal) * this.sideY,this.s);
          }
        }
      }
    }
    
    colorChange(){
      if(keyIsPressed){
        if (key == 's'){
          this.r = random(255);
          this.g = random(255);
          this.b = random(255);
        }
      }
    }
  }