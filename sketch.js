var snow = [];
var snowBank;
var timer;
var killedParticles = 0;

function setup() {
    createCanvas(windowWidth,windowHeight);

    snowBank = new snowBank();
    timer = new textEngine(windowHeight/2,windowWidth/2);
}

function draw() {
    background(25);

    timer.update();
    timer.draw();
    
    snowBank.update();
    snowBank.draw();

    for (let i = snow.length - 1; i >= 0; i--) {
        snow[i].update();
        snow[i].draw();

        if (snow[i].pos.y > windowHeight) {
            snow.splice(i, 1);
            killedParticles++;
        }
    }

    if (frameCount % 2) {
        snow.push(new particle());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function textEngine(x,y) {

    this.pos = createVector(x,y);

    this.draw = function () {
        textSize(30);
        fill(255);
        text("",this.pos.x,this.pos.y);
    }

    this.update = function() {

    }
}

function snowBank() {
    this.size = killedParticles / 100;

    this.draw = function () {
        noStroke();
        fill('rgba(255,255,255,1)');
        rect(0, windowHeight - this.size, windowWidth, this.size);
        // fill('rgba(255,255,255,0.66)');
        // rect(0, windowHeight - this.size + 15, windowWidth, this.size);
        // fill('rgba(255,255,255,1)');
        // rect(0, windowHeight - this.size + 40, windowWidth, this.size);
    }

    this.update = function () {
        this.size = killedParticles / 100;
    }
}


function particle() {

    this.pos = createVector(0,0);
    this.isSpeedChange = false;

    this.pos.x = random(windowWidth);
    this.size = random(5,10);
    this.speed = random(1,5);
    this.roffset = random(0,100);

    this.hspeed = 0;

    this.transparency = Math.abs((3 - this.speed) / 2) + (this.roffset / 100);
    this.color = color('rgba(255,255,255,' + this.transparency + ')'); 

    this.draw = function () {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x,this.pos.y,this.size);
    }

    this.update = function () {
        if (random(0,200) > 180) {
            this.isSpeedChange = true;
        } else {
            this.isSpeedChange = false;
        }

        this.roffset = random(-100,100);

        if (this.isSpeedChange) {
            this.speed += ((sin((frameCount + this.roffset) / 50) / 10) / 2);
            this.hspeed += ((sin((frameCount + this.roffset) / 50) / 10) / 2);
        }
        
        this.pos.y += this.speed;
        this.pos.x += this.hspeed;

        if (this.pos.y > windowHeight - snowBank.size - 30) {
            if (this.transparency <= 0.01) {
                this.transparency = 0;
            } else {
                this.transparency -= 0.01 * (this.transparency * 10);
            }
        }
        

        this.color = color('rgba(255,255,255,' + this.transparency + ')'); 
    }
}