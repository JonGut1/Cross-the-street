// Enemies our player must avoid
let allEnemies = [];
let test = false;
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
    this.coordinatesX += (this.speed * dt);

    if (this.coordinatesX > 606) {
        this.coordinatesX = -101;
        this.moveY = Math.floor(Math.random() * 3);
        this.coordinatesY = this.gridY[this.moveY];
        if (this.speed > 500) {
            this.speed = Math.floor(Math.random() * (600 - 501) + 501);
        } else if (this.speed > 400) {
            this.speed = Math.floor(Math.random() * (500 - 401) + 401);
        } else if (this.speed >= 350) {
            this.speed = Math.floor(Math.random() * (400 - 300) + 300);
        } else if (this.speed < 300 && this.speed >= 250) {
            this.speed = Math.floor(Math.random() * (299 - 200) + 200);
        } else {
            this.speed = Math.floor(Math.random() * (400 - 150) + 150);
        }
        if (player.levels <= 1) {
            if (player.dificulty === 1) {
            allEnemies.push(new Enemy);
            player.dificulty = 0;
            }
        }
        if (player.levels === 2) {
            this.speed = Math.floor(Math.random() * (500 - 300) + 300);
        } else if (player.levels === 3) {
            this.speed = Math.floor(Math.random() * (600 - 400) + 400);
        } else if (player.levels === 5) {
            if (player.dificulty === 1) {
                allEnemies.push(new Enmey);
                player.dificulty = 0;
            }
        }

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.coordinatesY);
};

Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * (400 - 170) + 170);
    this.coordinatesX = - 101;
    this.coordinatesY = this.gridY[this.moveY];
};

function col(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function checkCollisions() {
    allEnemies.forEach(function(el) {
        let x = el.coordinatesX - player.coordinatesX;
        let y = el.coordinatesY - player.coordinatesY;
        let center = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (center < 50) {
            player.hit = true;
            console.log(center);
        }
    });
}

for (let i = 0; i <= 2; i++) {
    allEnemies.push(new Enemy);
}



let w = false;

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
    this.sprite = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'];
    this.random = Math.floor(Math.random() * 5);
    this.moveY = 4;
    this.moveX = 2;
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.dificulty = 0;
    this.levels = 0;
    this.randomMovement = ["up", "down", "left", "right"];
};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite[this.random]), this.gridX[this.moveX], this.gridY[this.moveY]);
};

Player.prototype.update = function() {
    if (this.hit === true) {
        this.hit = false;
        this.moveY = 4;
        this.moveX = 2;
        hearts.hearts -= 1;
        player.handleInput("boom");
    }
       if (this.levels === 4) {
        w = true;
        }
};

Player.prototype.handleInput = function(press) {
    if (press === "up") {
        if (this.moveY === 0) {
            this.dificulty += 1
            this.levels += 1;
            this.moveY = 5;
            this.moveX = 2;
            star.reset(false);
            heart.reset(false);
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
    if (press === "boom") {
        console.log("boom");
    }
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
};

Player.prototype.reset = function() {
    this.moveY = 4;
    this.moveX = 2;
    this.dificulty = 0;
    this.levels = 0;
};

const player = new Player();

function Collectibles(type) {
    this.gridX = [];
    this.gridY = [];
    this.typeArr = ["Star", "Heart"];
    this.type = type;
    for (i = 0; i <= 4; i++) {
        this.gridX.push(i * 101);
    }
    for (i = 0; i <= 2; i++) {
        this.gridY.push(i * 83 + 50);
    }
    this.index = this.typeArr.indexOf(type);
    if (this.index === -1) {
        return;
    } else {
        this.sprite = [`images/${type}.png`];
    }
    this.moveY = Math.floor(Math.random() * 3);
    this.moveX = Math.floor(Math.random() * (5 - 1) + 1);
    this.heartSpawn = 0;
    this.starSpawn = 1;
    this.randomSpawn = Math.floor(Math.random() * 3);
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.colide = 1;
};

Collectibles.prototype.render = function() {
    if (this.colide === 1) {
        if (this.type === 'Star' && this.starSpawn === 1) {
            ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
        }
        if (this.type === 'Heart' && this.heartSpawn === 1) {
            ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
        }
    } else {
        return;
    }
    if (col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
        this.colide = 0;
        if (heart.colide === 0) {
            hearts.hearts += 1;
        }
    }
};

Collectibles.prototype.update = function() {
    if (hearts.hearts < 3 && heart.randomSpawn === 1) {
        this.starSpawn = 0;
        this.heartSpawn = 1;
    } else if (hearts.hearts <= 3 && heart.randomSpawn != 1){
        this.starSpawn = 1;
        this.heartSpawn = 0;
    }
};


Collectibles.prototype.reset = function(el) {
    this.moveY = Math.floor(Math.random() * 3);
    this.moveX = Math.floor(Math.random() * (5 - 1) + 1);
    this.randomSpawn = Math.floor(Math.random() * 3);
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.colide = 1;
    if (el === true) {
        this.starSpawn = 1;
        this.heartSpawn = 0;
    }
};


const star = new Collectibles('Star');
const heart = new Collectibles('Heart');





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

(function mobileButtons() {
    const buttons = document.querySelector('.buttonCont');
    buttons.addEventListener('click', function(event) {

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


let k = false;
function Tab(type, x, y, width, height) {
    this.pausedX;
    this.pausedY;
    this.sprite = 'images/Heart.png';
    this.hearts = 3;
    this.heartsX = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;


}

Tab.prototype.render = function() {
    if (this.type === "button") {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.font = '20px serif';
        ctx.fillText("Pause", 28, 35);
    }
    if (this.type === "hearts") {
        for (let i = 1; i <= this.hearts; i++) {
            ctx.drawImage(Resources.get(this.sprite), this.x + this.heartsX, this.y, this.width, this.height);
            this.heartsX += 30;
        }
        this.heartsX = 0;
    }
};

Tab.prototype.update = function() {
    canvas.addEventListener('click', function(e) {
    this.pausedX = e.offsetX;
    this.pausedY = e.offsetY;
        if (this.pausedX < 100 && this.pausedY < 50) {
            k = true;
        }
    });

    if (this.type === "hearts") {
            if (this.hearts < 0) {
                this.hearts = 0;
            }
            if (this.hearts > 3) {
                this.hearts = 3;
            }
    }
};

Tab.prototype.reset = function() {
    this.hearts = 3;
};

const pause = new Tab("button", 0, 10, 100, 35);
const hearts = new Tab("hearts", 400, 10, 30, 50);

function Menus() {
        this.menus = [];
        this.menusVar = [];
}

Menus.prototype.menu = function(el) {
    if (el === "menu") {
            this.menus = ["Quick Game", "Player Select", "Level Select", "Leaderboard"];
        } else if (el === "pause") {
            this.menus = ["Resume", "Restart", "Quit"];
        } else if (el === "win") {
            this.menus = ["Restart", "Leaderboard", "Quit"];
        } else if (el === "lost") {
            this.menus = ["Restart", "Leaderboard", "Quit"];
        }

    for (let i = 0; i < this.menus.length; i++) {
        this.menusVar[i] = document.createElement('button');
        this.menusVar[i].innerHTML = this.menus[i];
        this.menusVar[i].className = this.menus[i];
        modal.appendChild(this.menusVar[i]);
        }
};

const menu = new Menus();


function Select(x, y, width, height, num) {
    this.num = num;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.first = [150, 120, 70, 140];
    this.second = [50, 150, 100, 200];
    this.third = [150, 100, 200, 350];
    this.forth = [350, 150, 100, 200];
    this.fith = [300, 120, 70, 140];
    this.arr = [];
    this.tag;
    this.test = this.first;
}

Select.prototype.render = function() {
    ctx.drawImage(Resources.get(player.sprite[this.num]), this.x, this.y, this.width, this.height);
};

Select.prototype.update = function() {
    char1.x - char2.x;
    char2.x - char3.x;
    char4.x - char5.x;
    char5.x - char1.x;
    this.arr = [this.x, this.y, this.width, this.height];
};

Select.prototype.check = function() {
        if (this.arr[0] === this.test[0] && this.arr[1] === this.test[1] &&
            this.arr[2] === this.test[2] && this.arr[3] === this.test[3] &&
            this.arr[4] === this.test[4]) {
        } else {
            return;
        }
};

const char1 = new Select(150, 120, 70, 140, 0);
const char2 = new Select(50, 150, 100, 200, 1);
const char3 = new Select(150, 100, 200, 350, 2);
const char4 = new Select(350, 150, 100, 200, 3);
const char5 = new Select(300, 120, 70, 140, 4);







