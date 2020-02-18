"use strict";

const canvas = document.querySelector('canvas'); // Selectar canvas

const ctx = canvas.getContext('2d'); // Nær í contextið fyrir canvasinn

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) { // Býr til random tölu á milli var:min og var:max
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function loop() { // A loop that goes through all the balls to animate them
    ctx.fillStyle = '#00000040'; // Teiknar skjáinn svartann
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) { // For loop for all the balls
        balls[i].collisionDetect(); // Detects if ball is touching another ball; editors_note: "Hah gaaaaay!"
        balls[i].draw(); // Draws them
        balls[i].update(); // Moves the balls
    }
  
    requestAnimationFrame(loop);
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if ((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if ((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if ((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
}

let balls = [];
let size;
let ball;

while (balls.length < 25) {
    size = random(10,20);
    ball = new Ball(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );

    balls.push(ball);
}

loop();
