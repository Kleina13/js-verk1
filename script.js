"use strict";

const canvas = document.querySelector('canvas'); // Selectar canvas

const ctx = canvas.getContext('2d'); // Nær í contextið fyrir canvasinn

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const img = document.getElementById('image');
const imgW = img.width / 4;
const imgH = img.height / 4;

function random(min, max) { // Býr til random tölu á milli var:min og var:max
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function loop() { // Loopa sem fer í gegnum alla boltana í listanum og teiknar þá 
    ctx.fillStyle = '#00000040'; // Teiknar skjáinn svartann
    ctx.fillRect(0, 0, width, height);
  
    for(let i = 0; i < balls.length; i++) { // For loopa fyrir alla boltana
        /* balls[i].collisionDetect(); */ // Detects if ball is touching another ball; editors_note: "Hah gaaaaay!"
        balls[i].draw(); // Draws them
        balls[i].update(); // Moves the balls
    }
  
    requestAnimationFrame(loop);
}

class Ball {
    constructor(x, y, velX, velY, color) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.width = imgW;
        this.height = imgH;
    }

    draw() {
        ctx.drawImage(img, this.x, this.y, this.width, this.height)
    }

    update() {
        if((this.x + this.width) >= width) {
          this.velX = -(this.velX);
        }
      
        if((this.x) <= 0) {
          this.velX = -(this.velX);
        }
      
        if((this.y + this.height) >= height) {
          this.velY = -(this.velY);
        }
      
        if((this.y) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
    }

    recolor() {
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    /* collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < (this.width * this.height) + (balls[j].width * balls[j].height)) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    } */
}

let balls = [], ball, speed = [];

while(balls.length < 25) {
    speed = [random(-7, -3), random(3, 7)];
    ball = new Ball(
        random(0, width - imgW - 1),
        random(0, height - imgH - 1),
        speed[random(0, 1)],
        speed[random(0, 1)],
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    );

    balls.push(ball);
}

loop();
