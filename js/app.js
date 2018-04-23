// Enemies our player must avoid
let allEnemies = [];

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.gridX = [];
    this.gridY = [];
    for (i = 0; i <= 4; i++) {
        this.gridX.push(i * 101);
    }
    for (i = 0; i <= 5; i++) {
        this.gridY.push(i * 83 + 50);
    }
    this.sprite = 'images/enemy-bug.png';
    this.moveY = Math.floor(Math.random() * 3);
    this.speed = Math.floor(Math.random() * (400 - 170) + 170);
    this.coordinatesX = - 101;
    this.coordinatesY = this.gridY[this.moveY];




    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.coordinatesX += this.speed * dt;

    if (this.coordinatesX > 606) {
        this.coordinatesX = -101;
        this.moveY = Math.floor(Math.random() * 3);
        this.coordinatesY = this.gridY[this.moveY];
        if (this.speed >= 350)
        this.speed = Math.floor(Math.random() * (400 - 300) + 300);
        else if (this.speed < 300 && this.speed >= 250) {
            this.speed = Math.floor(Math.random() * (299 - 200) + 200);
        } else {
            this.speed = Math.floor(Math.random() * (400 - 150) + 150);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.coordinatesY);
};


function checkCollisions() {
    allEnemies.forEach(function(el) {
        if (col(player.coordinatesX, player.coordinatesY, el.coordinatesX, el.coordinatesY) < 50) {
            player.hit = true;
        }
    });
}


for (let i = 0; i <= 3; i++) {
    allEnemies.push(new Enemy);
}





// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {
    this.hit = false;
    this.gridX = [];
    this.gridY = [];
    for (i = 0; i <= 4; i++) {
        this.gridX.push(i * 101);
    }
    for (i = 0; i <= 5; i++) {
        this.gridY.push(i * 83 + 50);
    }
    this.char = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
    this.random = Math.floor(Math.random() * 5);
    this.moveY = 4;
    this.moveX = 2;
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.char[this.random]), this.gridX[this.moveX], this.gridY[this.moveY]);
};

Player.prototype.update = function() {
    if (this.hit) {
        this.moveY = 4;
        this.moveX = 2;
        this.hit = false;
    }
};

Player.prototype.handleInput = function(press) {
    if (press === "up") {
        if (this.moveY === 0) {
            this.moveY = 5;
            this.moveX = 2;
        }
        console.log('up');
        this.moveY -= 1;
    }
    if (press === "down") {
        if (this.moveY === 4) {
            return;
        }
        console.log('down');
        this.moveY += 1;
    }
    if (press === "left") {
        if (this.moveX === 0) {
            return;
        }
        console.log('left');
        this.moveX -= 1;
        this.posX = this.gridX[this.moveX];
    }
    if (press === "right") {
        if (this.moveX === 4) {
            return;
        }
        console.log('right');
        this.moveX += 1;
        this.posX = this.gridX[this.moveX];
    }
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
};

var player = new Player();

function Collectibles() {
    this.gridX = [];
    this.gridY = [];
    for (i = 0; i <= 4; i++) {
        this.gridX.push(i * 101);
    }
    for (i = 0; i <= 2; i++) {
        this.gridY.push(i * 83 + 50);
    }
    this.char = ['images/Star.png'];
    this.moveY = Math.floor(Math.random() * 3);;
    this.moveX = Math.floor(Math.random() * 5);;
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.colide = 1;
};

Collectibles.prototype.render = function() {
    if (this.colide === 1) {
        ctx.drawImage(Resources.get(this.char), this.coordinatesX, this.gridY[this.moveY]);
    } else {
        return;
    }
    if (col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
        this.colide = 0;
    }
};


const star = new Collectibles();

function col(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
document.addEventListener('keyup', function(e) {


    player.handleInput(allowedKeys[e.keyCode]);
});
let test;
(function mobileButtons() {
    const buttons = document.querySelector('.buttonCont');
    buttons.addEventListener('click', function(event) {
        test = event.target;
        if (event.target.className === 'up' || event.target.className === 'glyphicon glyphicon-arrow-up') {
            player.handleInput(allowedKeys[38]);
        }
        if (event.target.className === 'down' || event.target.className === 'glyphicon glyphicon-arrow-down') {
            player.handleInput(allowedKeys[40]);
        }
        if (event.target.className === 'left' || event.target.className === 'glyphicon glyphicon-arrow-left') {
            player.handleInput(allowedKeys[37]);
        }
        if (event.target.className === 'right' || event.target.className === 'glyphicon glyphicon-arrow-right') {
            player.handleInput(allowedKeys[39]);
        }

    });

}());
