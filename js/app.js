let allEnemies = [];
function Enemy() {
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
};

Enemy.prototype.update = function(dt) {
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
    this.random = Math.floor(Math.random() * 4);
    this.moveY = 4;
    this.moveX = 2;
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.dificulty = 0;
    this.levels = 0;
    this.continue = false;
};


Player.prototype.render = function() {
    this.localSprite = localStorage.Recent_Character;
    if (this.localSprite != undefined && this.continue === true) {
        ctx.drawImage(Resources.get(this.sprite[parseInt(this.localSprite)]), this.gridX[this.moveX], this.gridY[this.moveY]);
    } else {
        ctx.drawImage(Resources.get(this.sprite[this.random]), this.gridX[this.moveX], this.gridY[this.moveY]);
    }
};

Player.prototype.update = function() {
    if (this.hit === true) {
        this.hit = false;
        this.moveY = 4;
        this.moveX = 2;
        hearts.hearts -= 1;
        player.handleInput("boom");
    }
};

Player.prototype.handleInput = function(press) {
    if (press === "up") {
        if (this.moveY === 0) {
            this.dificulty += 1
            this.levels += 1;
            this.moveY = 5;
            this.moveX = 2;
            heart.randomSpawn = Math.floor(Math.random() * 4);
            star.reset(true);
            heart.reset(true);
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
    hearts.hearts = 3;
    this.moveY = 4;
    this.moveX = 2;
    this.dificulty = 0;
    this.levels = 0;
    this.random = Math.floor(Math.random() * 4);
};

const player = new Player();

function Collectibles(type) {
    this.gridX = [];
    this.gridY = [];
    this.typeArr = [];
    this.typeArr.push(type);
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
    this.randomSpawn;
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.colide = 1;
    this.heartSpawn = 0;
    this.starSpawn = 0;
    this.keySpawn = 1;
    this.amount;
    this.score = 0;

    this.starArr = [];
};

Collectibles.prototype.render = function() {
    if (this.colide === 1 && this.type === "Heart" && this.heartSpawn === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
    }
    if (this.colide === 1 && this.type === "Star" && this.starSpawn === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
    }
};

Collectibles.prototype.update = function() {
    if (this.type === "Heart"  && this.heartSpawn === 1 && col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
            console.log("Heart");
            hearts.hearts += 1;
            this.colide = 0;
            this.coordinatesX, this.coordinatesY = -9001
    }
    if (this.type === "Star" && this.starSpawn === 1 && col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
        console.log("Star");
        this.colide = 0;
        this.score += 10;
        this.coordinatesX, this.coordinatesY = -9001
    }
};


Collectibles.prototype.reset = function(el) {
    this.moveY = Math.floor(Math.random() * 3);
    this.moveX = Math.floor(Math.random() * (5 - 1) + 1);
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
    this.colide = 1;
    if (el === true) {
        if (hearts.hearts === 3) {
        heart.heartSpawn = 0;
        heart.starSpawn = 1;
        star.heartSpawn = 0;
        star.starSpawn = 1;
        } else if (hearts.hearts < 3 && heart.randomSpawn === 1) {
        heart.starSpawn = 0;
        heart.heartSpawn = 1;
        star.starSpawn = 0;
        star.heartSpawn = 1;
        } else {
            heart.starSpawn = 1;
            heart.heartSpawn = 0;
            star.starSpawn = 1;
            star.heartSpawn = 0;
        }
    } else {
        star.score = 0;
    }
};


const star = new Collectibles('Star');
const heart = new Collectibles('Heart');
const key = new Collectibles('Key');





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


//let k = false;
//let b = false;
function Tab(type, x, y, width, height) {
    this.sprite = 'images/Heart.png';
    this.hearts = 3;
    this.heartsX = 0;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.k = false;
    this.count = 0;
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

    if (this.type === "timer") {
        ctx.font = "35px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.count, this.x, this.y);
    }
};

Tab.prototype.update = function(el) {
    if (this.type === "hearts") {
            if (this.hearts < 0) {
                this.hearts = 0;
            }
            if (this.hearts > 3) {
                this.hearts = 3;
            }
    }
    if (this.type === "timer") {
        this.count = timer.timerEnd();
    }
};

Tab.prototype.paused = function(e) {
        this.pausedX = e.offsetX;
        this.pausedY = e.offsetY;
            if (this.pausedX < 100 && this.pausedY < 50) {
              pause.k = true;
            }
};

Tab.prototype.timerStart = function() {
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.seconds = new Date().getSeconds();
    this.startPoint = (this.hours * 120) + (this.minutes * 60) + this.seconds;
};

Tab.prototype.timerEnd = function() {
    this.h = new Date().getHours();
    this.m = new Date().getMinutes();
    this.s = new Date().getSeconds();
    this.endPoint = (this.h * 120) + (this.m * 60) + this.s;
    return this.endPoint - this.startPoint;
};

Tab.prototype.timerCompensate = function() {
    this.ho = new Date().getHours();
    this.mi = new Date().getMinutes();
    this.se = new Date().getSeconds();
    this.end = (this.h * 120) + (this.m * 60) + this.s;
    this.compensate = this.endPoint - this.startPoint;
    this.startPoint = this.startPoint + this.compensate;
};

const pause = new Tab("button", 0, 10, 100, 35);
const hearts = new Tab("hearts", 400, 10, 30, 50);
const timer = new Tab("timer", 300, 40, 100, 35)

function Menus() {
        this.menus = [];
        this.menusVar = [];
}

Menus.prototype.inputField = function(el) {
    if (el === "win") {
        this.text = "Congratulations you won!!!!"
        this.class = 'textWin';
    } else {
        this.text = "You lost, try again!!!!";
        this.class = 'textLose';
    }
    const menu = document.querySelector('.menu');
    const inputDiv = document.createElement('div');
    inputDiv.classList.add('nameDiv');
    menu.appendChild(inputDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('textDiv');
    inputDiv.appendChild(textDiv);

    const text = document.createElement('span');
    text.classList.add(this.class);
    text.innerHTML = this.text;
    textDiv.appendChild(text);
    if (el === "lost") {
        return;
    }
    const input = document.createElement('input');
    input.classList.add('nameInput');
    inputDiv.appendChild(input);
};

Menus.prototype.menu = function(el) {
    if (el === "menu") {
            this.menus = ["Quick Game", "Player Select", "Leaderboard"];
            if (player.localSprite != undefined) {
                this.menus.unshift("Continue");
            }
        } else if (el === "pause") {
            this.menus = ["Resume", "Restart", "Quit"];
        } else if (el === "win") {
            this.menus = ["Submit", "Restart", "Leaderboard", "Quit"];
            this.inputField("win");
        } else if (el === "lost") {
            this.menus = ["Restart", "Leaderboard", "Quit"];
            this.inputField("lost");
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
    this.tagArr = [];
    this.first = [1, 150, 25, 75, 150];
    this.second = [2, 50, 100, 100, 200];
    this.third = [3, 150, 100, 200, 350];
    this.forth = [4, 350, 100, 100, 200];
    this.fith = [5, 300, 25, 75, 150];
    this.tagArr.push(this.first, this.second, this.third, this.forth, this.fith);
    this.arr = [x, y, width, height];
    this.tag;
    this.mark = 0;
    this.move = false;

    this.mX;
    this.mY;
    this.mW;
    this.mH;
    this.remXBy;
    this.count;
}

Select.prototype.render = function() {
    ctx.drawImage(Resources.get(player.sprite[this.num]), this.x, this.y, this.width, this.height);
};

Select.prototype.update = function() {
    if (this.move === true && this.count > 0) {
        this.x -= (this.moveXBy / 25); // 4
        this.y -= (this.moveYBy / 25); //-1
        this.width -= (this.widthBy / 25); //-1
        this.height -= (this.heightBy / 25); //-2
        this.count -= 4;
    }

};

Select.prototype.check = function(el) {
    this.arr = [this.x, this.y, this.width, this.height];
    this.mark = 0;
    this.generator = this.return();
    while (this.mark === 0) {
        this.test = this.generator.next();
        if (this.arr[0] === this.test.value[1] && this.arr[1] === this.test.value[2] &&
            this.arr[2] === this.test.value[3] && this.arr[3] === this.test.value[4] &&
            this.arr[4] === this.test.value[5]) {
            this.tag = this.test.value[0];
            this.mark = 1;
            console.log(this.tag + " taged");
        }
    }
    if (el === null) {
        return;
    }
    this.cycle(el);
    this.move = true;
    this.count = 100;
    console.log(this.moveXBy);
};

Select.prototype.return = function*() {
    yield this.first;
    yield this.second;
    yield this.third;
    yield this.forth;
    yield this.fith;
};

Select.prototype.cycle = function(el) {
    if (el === true) {
        for (i = 0; i < 5; i++) {

            if (this.tag === this.tagArr[i][0]) {
                if (this.tag === 5) {
                    this.increment = this.tagArr[0];
                } else {
                    this.increment = this.tagArr[i + 1];
                }
                this.moveXBy = this.tagArr[i][1] - this.increment[1];
                this.moveYBy = this.tagArr[i][2] - this.increment[2];
                this.widthBy = this.tagArr[i][3] - this.increment[3];
                this.heightBy = this.tagArr[i][4] - this.increment[4];
            }
        }
    } else if (el === false) {
        for (i = 4; i >= 0; i--) {

            if (this.tag === this.tagArr[i][0]) {
                if (this.tag === 1) {
                    this.increment = this.tagArr[4];
                } else {
                    this.increment = this.tagArr[i - 1];
                }
                this.moveXBy = this.tagArr[i][1] - this.increment[1];
                this.moveYBy = this.tagArr[i][2] - this.increment[2];
                this.widthBy = this.tagArr[i][3] - this.increment[3];
                this.heightBy = this.tagArr[i][4] - this.increment[4];
            }
        }
    }
};

Select.prototype.buttons = function(e) {
            const pausedX = e.offsetX;
            const pausedY = e.offsetY;
        if (pausedX > 350 && pausedY > 400 && pausedX < 450 && pausedY < 450) {
            console.log(9001);
            char1.check(true);
            char2.check(true);
            char3.check(true);
            char4.check(true);
            char5.check(true);
        }

        if (pausedX > 50 && pausedY > 400 && pausedX < 150 && pausedY < 450) {
            console.log(9001);
            char1.check(false);
            char2.check(false);
            char3.check(false);
            char4.check(false);
            char5.check(false);
        }

        if (pausedX < 100 && pausedY < 50) {
            reusedVar.c = true;
            canvas.removeEventListener('click', selectButtons.buttons);
            console.log(7);
        }

        if (pausedX > 200 && pausedX < 300 && pausedY > 500 && pausedY < 550) {
            console.log("works");
            data.insert("select");
            reusedVar.b = true;
            canvas.removeEventListener('click', selectButtons.buttons);
        }
};

const reusedVar = {
    b: false,
    c: false,
    star: true
};

const char1 = new Select(150, 25, 75, 150, 0);
const char2 = new Select(50, 100, 100, 200, 1);
const char3 = new Select(150, 100, 200, 350, 2);
const char4 = new Select(350, 100, 100, 200, 3);
const char5 = new Select(300, 25, 75, 150, 4);
const selectButtons = new Select();

function Data() {
    this.storage1 = "Recent_Character";
    this.name = "Name";
    this.character = "Character";
    this.score = "Score";
    this.time = "Time";
    this.star = "Stars";
    this.heart = "Hearts";
    this.tag;
    this.tagArr = [char1, char2, char3, char4, char5];
    this.stringTag = ["char1", "char2", "char3", "char4", "char5"];
    this.timesPlayed = localStorage.TimesPlayed;
    this.individualScore = [];
    this.leaderboard = [];
    this.scoreArr = [];
    this.sY = 260;
    this.bY = 275;
    this.gY = 240;
    this.namingArr = ["Name", "Score", "Time", "Stars", "Hearts"];
    this.test = 2356;
}

Data.prototype.insert = function(el) {
    for (let i = 0; i < this.tagArr.length; i++) {
        this.tagArr[i].check(null);
    }
    for (let i = 0; i < this.tagArr.length; i++) {
        if (this.tagArr[i].tag === 3) {
            this.tag = this.tagArr[i].num;
        }
    }
        this.input = document.querySelector('input');

    if (el === "select") {
        localStorage.setItem(this.storage1, this.tag);
        console.log(this.timesPlayed);
        return;
        console.log("test");
    }
    if (this.timesPlayed === undefined) {
        this.timesPlayed = 1;
    } else {
        this.int = parseInt(this.timesPlayed);
        this.int += 1;
        this.timesPlayed = this.int;
    }

    if (el === "random") {

        this.name += this.timesPlayed;
        this.character += this.timesPlayed;
        this.score += this.timesPlayed;
        this.time += this.timesPlayed;
        this.star += this.timesPlayed;
        this.heart += this.timesPlayed;
        if (player.localSprite != undefined && player.continue === true) {
            this.tag = parseInt(player.localSprite);
        } else {
            this.tag = player.random;
        }
        localStorage.setItem("TimesPlayed", this.timesPlayed)
        localStorage.setItem(this.timesPlayed, this.stringTag);

        localStorage.setItem(this.character, this.tag);
        localStorage.setItem(this.name, this.input.value);
        localStorage.setItem(this.score, star.score);
        localStorage.setItem(this.time, 12);
        localStorage.setItem(this.star, 2);
        localStorage.setItem(this.heart, hearts.hearts);

        console.log(this.timesPlayed);
        this.name = "Name";
        this.character = "Character";
        this.score = "Score";
        this.time = "Time";
        this.star = "Stars";
        this.heart = "Hearts";
    }
};

Data.prototype.update = function() {
    this.highest;
    this.first = [];
    this.second = [];
    this.third = [];
    this.index = []
    this.list = [];
    this.highestArr = [];
    this.timesPlayed = parseInt(this.timesPlayed);

    if (this.timesPlayed > 0) {

        for (let i = 1; i <= this.timesPlayed; i++) {
            this.n = this.name + i;
            this.names = localStorage[this.n];
            this.c = this.character + i;
            this.characters = localStorage[this.c];
            this.s = this.score + i;
            this.scores = localStorage[this.s];
            this.t = this.time + i;
            this.times = localStorage[this.t];
            this.st = this.star + i;
            this.stars = localStorage[this.st];
            this.h = this.heart + i;
            this.hearts = localStorage[this.h];

            this.leaderboard.push([this.characters, this.names, this.scores, this.times, this.stars, this.hearts]);
        }
        for (let i = 0; i < this.leaderboard.length; i++) {
            this.scoreArr.push(parseInt(this.leaderboard[i][2]));
            }
            while (this.list.length < this.leaderboard.length) {
                for (let i = 0; i < this.leaderboard.length; i++) {
                    this.highest = Math.max(...this.scoreArr);
                    this.highestArr.push(this.highest);
                    this.index.push(this.scoreArr.indexOf(this.highest));
                    this.scoreArr[this.index[i]] = -1;
                    this.list.push(this.leaderboard[this.index[i]]);
                }
            }
    }
};

Data.prototype.render = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#A9BCF5";
        ctx.fillRect(0,50,canvas.width,canvas.height - 70);

        const bod = document.querySelector('body');
        const modal = document.createElement('div');
        modal.classList.add('scoreListDiv');
        bod.appendChild(modal);

        const ulItems = document.createElement('ol');
        ulItems.classList.add('ulCont');
        ulItems.setAttribute("start", 4)
        modal.appendChild(ulItems);

        ctx.beginPath();
        ctx.fillStyle = "#C0C0C0";
        ctx.fillRect(0, 240, canvas.width / 3, 70);
        ctx.beginPath();
        ctx.moveTo(1, 240);
        ctx.lineTo(10, 190);
        ctx.lineTo(canvas.width / 3 + 5, 190);
        ctx.lineTo(canvas.width / 3, 240);
        ctx.lineTo(1, 240);
        ctx.lineTo(1, 340);
        ctx.lineTo(canvas.width / 3, 340);
        ctx.lineTo(canvas.width / 3, 240);
        ctx.fill();
        ctx.stroke();
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        for (let i = 0; i < this.namingArr.length; i++) {
            ctx.fillText(this.namingArr[i], 15, this.sY);
            this.sY += 15;
        }



        ctx.beginPath();
        ctx.fillStyle = "#cd6532";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3 * 2, 260);
        ctx.lineTo(canvas.width / 3 * 2 - 5, 210);
        ctx.lineTo(canvas.width / 3 * 3 - 5, 210);
        ctx.lineTo(canvas.width / 3 * 3, 260);
        ctx.lineTo(canvas.width / 3 * 2, 260);
        ctx.lineTo(canvas.width / 3 * 2, 340);
        ctx.lineTo(canvas.width / 3 * 3, 340);
        ctx.lineTo(canvas.width / 3 * 3, 260);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        for (let i = 0; i < this.namingArr.length; i++) {
            ctx.fillText(this.namingArr[i], 350, this.bY);
            this.bY += 15;
        }

        ctx.beginPath();
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3, 220);
        ctx.lineTo(canvas.width / 3 + 5, 170);
        ctx.lineTo(canvas.width / 3 * 2 - 5, 170);
        ctx.lineTo(canvas.width / 3 * 2, 220);
        ctx.lineTo(canvas.width / 3, 220);
        ctx.lineTo(canvas.width / 3, 340);
        ctx.lineTo(canvas.width / 3 * 2, 340);
        ctx.lineTo(canvas.width / 3 * 2, 220);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        for (let i = 0; i < this.namingArr.length; i++) {
            ctx.fillText(this.namingArr[i], 180, this.gY);
            this.gY += 15;
        }


    for (let i = 0; i < this.list.length; i++) {
        if (this.first[0] === undefined) {
            this.first.push(this.list[i]);
            console.log(this.first);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.first[0][0])]), 180, 0, 150, 250);
            ctx.fillStyle = "black";
            this.gY = 240;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.first[0][i], 240, this.gY);
            this.gY += 15;
            }
        } else if (this.second[0] === undefined) {
            this.second.push(this.list[i]);
            console.log(this.second);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.second[0][0])]), 10, 20, 150, 250);
            this.sY = 260;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.second[0][i], 75, this.sY);
            this.sY += 15;
            }
        } else if (this.third[0] === undefined) {
            this.third.push(this.list[i]);
            console.log(this.third);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.third[0][0])]), 350, 40, 150, 250);
            this.bY = 275;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.second[0][i], 410, this.bY);
            this.bY += 15;
            }
        } else {
                const listItems = document.createElement('li');
                listItems.classList.add('listItems');
                listItems.innerHTML = this.list[i][1] + "_" + this.list[i][2] + "_" +
                this.list[i][3] + "_" + this.list[i][4] + "_" + this.list[i][5];
                ulItems.appendChild(listItems);

                console.log(this.list[i]);
        }
    }
};

const data = new Data();



