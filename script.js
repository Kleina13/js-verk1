"use strict";

const canvas = document.querySelector('canvas'); // Selectar canvas

const ctx = canvas.getContext('2d'); // Nær í contextið fyrir canvasinn

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

/* let block_to_insert;

for (let i = 1; i < 8; i++) {
    block_to_insert = document.createElement('img');
    block_to_insert.src = 'dvd' + String(i) + '.png';
    block_to_insert.id  = 'image' + String(i);
    block_to_insert.style = "display: none;";
    document.body.lastChild.insertAdjacentElement('beforebegin', block_to_insert);
} */

let imgs = new Array();

for (let i = 1; i < 8; i++) {
    imgs.push(document.getElementById('image' + String(i)))
}

const imgW = imgs[0].width / 4; // dtdxs
const imgH = imgs[0].height / 4;

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
        this.img = imgs[random(0, imgs.length - 1)];
    }

    draw() { // Teiknar myndina
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    changeImage() { // breytir um mynd
        this.curImg = this.img;
        do {
            this.img = imgs[random(0, imgs.length - 1)];
        } while(this.img === this.curImg);
    }

    update() { // uppfærir myndina
        if((this.x + this.width) >= width) { // Ef myndinn snertir enda skjásins þá snýst hún við og skiptir um lit
          this.velX = -(this.velX);
          this.changeImage();
        }
      
        if((this.x) <= 0) { // Ef myndinn snertir enda skjásins þá snýst hún við og skiptir um lit
          this.velX = -(this.velX);
          this.changeImage();
        }
      
        if((this.y + this.height) >= height) { // Ef myndinn snertir enda skjásins þá snýst hún við og skiptir um lit
          this.velY = -(this.velY);
          this.changeImage();
        }
      
        if((this.y) <= 0) { // Ef myndinn snertir enda skjásins þá snýst hún við og skiptir um lit
          this.velY = -(this.velY);
          this.changeImage();
        }
      
        this.x += this.velX; // Færir myndina eftir X ásnum
        this.y += this.velY; // Færir myndina eftir Y ásnum
    }

    recolor() { // concepta WIP
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

let balls = [], ball, speed = []; // Býr til breytur fyrir for loopuna

while(balls.length < 25) {
    speed = [random(-7, -3), random(3, 7)];
    ball = new Ball( // Býr til bolta 
        random(0, width - imgW - 1),
        random(0, height - imgH - 1),
        speed[random(0, 1)],
        speed[random(0, 1)],
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    );

    balls.push(ball); // Bætir boltunum í arrayinn
}

loop(); // Keyrir .essa loopu að EILÍFU!
