/**
* app.js
* This is where all of the interactions of the game are coded. Most of the games functions and object methods
* are written here and called in engine.js file.
*/

/**
* Enemies array
* hold all of the enemies in an array.
*/
let allEnemies = [];

/**
* An object which values are used in an engine.js so that certain conditions
* would be tested.
*/
const reusedVar = {
    b: false,
    c: false,
    d: false,
    start: true
};

/**
* Enemy class
* defines the properties of the enemies.
*/
function Enemy() {
    /*
    * Creates a grid out of the entire canvas.
    */
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

/**
* Enemy update prototype.
* updates all of the coordinates and speed of the enemies
*/
Enemy.prototype.update = function(dt) {
    this.coordinatesX += (this.speed * dt);
    /*
    * Checks whther to respawn the enemy in the beginning.
    */
    if (this.coordinatesX > 606) {
        this.coordinatesX = -101;
        this.moveY = Math.floor(Math.random() * 3);
        this.coordinatesY = this.gridY[this.moveY];
        /*
        * If the player reaches the water tile 9 times then the enemies start
        * moving faster.
        */
        if (player.levels > 9) {
            if (this.speed > 500) {
            this.speed = Math.floor(Math.random() * (600 - 501) + 501);
            } else if (this.speed > 400) {
            this.speed = Math.floor(Math.random() * (500 - 401) + 401);
            }
        }
        /*
        * Gives the enemies random speed everytime they respawn.
        */
        if (this.speed >= 350) {
            this.speed = Math.floor(Math.random() * (400 - 300) + 300);
        } else if (this.speed < 300 && this.speed >= 250) {
            this.speed = Math.floor(Math.random() * (299 - 200) + 200);
        } else {
            this.speed = Math.floor(Math.random() * (400 - 150) + 150);
        }
        /*
        * adds one extra enemy.
        */
        if (player.levels === 5) {
            if (player.dificulty === 1) {
            allEnemies.push(new Enemy);
            player.dificulty = 0;
            }
        }
        if (player.levels === 2) {
            this.speed = Math.floor(Math.random() * (500 - 300) + 300);
        } else if (player.levels === 3) {
            this.speed = Math.floor(Math.random() * (600 - 400) + 400);
        } else if (player.levels === 7) {
            if (player.dificulty === 1) {
                allEnemies.push(new Enmey);
                player.dificulty = 0;
            }
        }
    }
};
/**
* Enemy resnder prototype.
* renders the enemy images
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.coordinatesY);
};
/**
* Enemy reset prototype.
* resets the coordinates and speed of the enemy objects
*/
Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * (400 - 170) + 170);
    this.coordinatesX = - 101;
    this.coordinatesY = this.gridY[this.moveY];
};
/**
* Player class
* defines the properties of the player.
*/
function Player() {
    /*
    * Creates a grid out of the canvas.
    */
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
    this.score = 0;
};

/**
* Player render prototype
* renders the players depending whether the player was selected or not.
*/
Player.prototype.render = function() {
    this.localSprite = localStorage.Recent_Character;
    if (this.localSprite != undefined && this.continue === true) {
        ctx.drawImage(Resources.get(this.sprite[parseInt(this.localSprite)]), this.gridX[this.moveX], this.gridY[this.moveY]);
    } else {
        ctx.drawImage(Resources.get(this.sprite[this.random]), this.gridX[this.moveX], this.gridY[this.moveY]);
    }
};

/**
* Player update prototype.
* updates the score and position when hit by the enemy.
*/
Player.prototype.update = function() {
    if (this.hit === true) {
        this.hit = false;
        this.moveY = 4;
        this.moveX = 2;
        hearts.hearts -= 1;
        player.handleInput("boom");
    }
    if (player.levels === 5) {
        player.score *= 2;
        player.score += hearts.hearts * 20;
        player.score -= timer.count;
        if (star.starsCollected > 10) {
            player.score += 100;
        }
        if (player.score < 1) {
            player.score = 0;
        }
    }
};

/**
* Player handleInput prototype.
* handles the input from the keyboard and arrows pressed fom the mobile buttons.
*/
Player.prototype.handleInput = function(press) {
    if (press === "up") {
        if (this.moveY === 0) {
            this.dificulty += 1
            this.levels += 1;
            this.moveY = 5;
            this.moveX = 2;
            heart.randomSpawn = Math.floor(Math.random() * 2);
            star.reset(true);
            heart.reset(true);
        }
        this.moveY -= 1;
    }
    if (press === "down") {
        if (this.moveY === 4) {
            return;
        }
        this.moveY += 1;
    }
    if (press === "left") {
        if (this.moveX === 0) {
            return;
        }
        this.moveX -= 1;
        this.posX = this.gridX[this.moveX];
    }
    if (press === "right") {
        if (this.moveX === 4) {
            return;
        }
        this.moveX += 1;
        this.posX = this.gridX[this.moveX];
    }
    /**
    * Helps to solve the issue of adding only one integer to this.levels and this.dificulty
    */
    if (press === "boom") {
    }
    this.coordinatesX = this.gridX[this.moveX];
    this.coordinatesY = this.gridY[this.moveY];
};
/**
* Player reset prototype
* resets the player's properties, such as position, score, hearts, random sprite select, dificulty and level progress.
*/
Player.prototype.reset = function() {
    hearts.hearts = 3;
    this.moveY = 4;
    this.moveX = 2;
    this.dificulty = 0;
    this.levels = 0;
    this.random = Math.floor(Math.random() * 4);
    this.score = 0;
};

/**
* Creates a ne player object.
*/
const player = new Player();
/**
* Collectibles collisions
* mesures the distance between the centers of two objects.
*/
function col(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    /**
    * returns the distance between the centers of two objects.
    */
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
/**
* Enemy and player collisions.
* mesures the distance between the centers of two objects.
*/
function checkCollisions() {
    allEnemies.forEach(function(el) {
        let x = el.coordinatesX - player.coordinatesX;
        let y = el.coordinatesY - player.coordinatesY;
        let center = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (center < 60) {
            player.hit = true;
        }
    });
}
/**
* Collectibles class
* holds all the properties for stars and hearts.
* @param - sets the type of the object.
*/
function Collectibles(type) {
    /**
    * Creates a grid out of the canvas.
    */
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
    this.starsCollected = 0;
    this.starArr = [];
};
/**
* Collectibles render prototype.
* renders stars or hearts.
*/
Collectibles.prototype.render = function() {
    if (this.colide === 1 && this.type === "Heart" && this.heartSpawn === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
    }
    if (this.colide === 1 && this.type === "Star" && this.starSpawn === 1) {
        ctx.drawImage(Resources.get(this.sprite), this.coordinatesX, this.gridY[this.moveY]);
    }
};
/**
* Collectibles update prototype.
* updates the star's or heart's collision status.
*/
Collectibles.prototype.update = function() {
    if (this.type === "Heart"  && this.heartSpawn === 1 && col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
            hearts.hearts += 1;
            this.colide = 0;
            this.coordinatesX, this.coordinatesY = -9001
    }
    if (this.type === "Star" && this.starSpawn === 1 && col(player.coordinatesX, player.coordinatesY, this.coordinatesX, this.coordinatesY) < 50) {
        this.colide = 0;
        player.score += 30;
        this.starsCollected +=1;
        this.coordinatesX, this.coordinatesY = -9001
    }
};
/**
* Collectibles reset prototype.
* resets stars and hearts.
*/
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
        this.starsCollected = 0;
    }
};
/**
* star and heart objects.
*/
const star = new Collectibles('Star');
const heart = new Collectibles('Heart');
/**
* Allowed key presses object
*/
var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
/**
* Event listener for the arrow buttons.
* calls the player handleInput prototype.
*/
document.addEventListener('keyup', function(e) {
player.handleInput(allowedKeys[e.keyCode]);
});
/**
* Mobile buttons function
* makes on screen buttons for mobile users.
*/
(function mobileButtons() {
    const buttons = document.querySelector('.buttonCont')
    buttons.style.visibility = "hidden";
    buttons.addEventListener('click', function(event) {

        if (event.target.className === 'up' || event.target.className === 'glyphicon glyphicon-arrow-up') {
            player.handleInput(allowedKeys[38]);
            const upBu = document.querySelector('.up')
            upBu.className += ' anim';
            setTimeout(function() {
                upBu.className = 'up';
            }, 100);

        }
        if (event.target.className === 'down' || event.target.className === 'glyphicon glyphicon-arrow-down') {
            player.handleInput(allowedKeys[40]);
            const downBu = document.querySelector('.down');
            downBu.className += ' anim';
            setTimeout(function() {
                downBu.className = 'down';
            }, 100);

        }
        if (event.target.className === 'left' || event.target.className === 'glyphicon glyphicon-arrow-left') {
            player.handleInput(allowedKeys[37]);
            const leftBu = document.querySelector('.left');
            leftBu.className += ' anim';
            setTimeout(function() {
                leftBu.className = 'left';
            }, 100);

        }
        if (event.target.className === 'right' || event.target.className === 'glyphicon glyphicon-arrow-right') {
            player.handleInput(allowedKeys[39]);
            const rightBu = document.querySelector('.right');
            rightBu.className += ' anim';
            setTimeout(function() {
                rightBu.className = 'right';
            }, 100);
        }
    });
}());
/**
* Tab class
* holds the properties for the tab objects.
* @param type: the type of the object. x: x position. y: y position.
* width: width of the object. height: height of the object.
*/
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
/**
* Tab render prototype
* renders the tab objects.
*/
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
/**
* Tab update prototype.
* updates the tab objects.
*/
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
        this.count = Math.floor(timer.timerEnd());
    }
};
/**
* Tab paused prototype.
* changes the value of pause.k to true when the pause button is clicked
*/
Tab.prototype.paused = function(e) {
    this.pausedX = e.offsetX;
    this.pausedY = e.offsetY;
    if (this.pausedX < 100 && this.pausedY < 50) {
      pause.k = true;
    }
};
/**
* Tab timerStart prototype
* starts the timer.
*/
Tab.prototype.timerStart = function() {
    this.seconds = Date.now() / 1000;
    this.startPoint = this.seconds;
};
/**
* Tab timerEnd prototype
* ends the timer.
*/
Tab.prototype.timerEnd = function() {
    this.s = Date.now() / 1000;
    this.endPoint = this.s;
    return this.endPoint - this.startPoint;
};
/**
* Tab timerCompensate prototype
* compensates the time that elapsed during the pause screen the timer.
*/
Tab.prototype.timerCompensate = function() {
    this.se = Date.now() / 1000;
    this.end = this.se;
    this.compensate = this.end - this.endPoint;
    this.startPoint += this.compensate;
};
/**
* pause button object, hearts object and timer object
*/
const pause = new Tab("button", 0, 10, 100, 35);
const hearts = new Tab("hearts", 400, 10, 30, 50);
const timer = new Tab("timer", 300, 40, 100, 35)
/**
* inputField function.
* creates an input field for the winning screen and the text for
* the winning and losing screens.
*/
const inputField = {
    text: "",
    cal: "",
    input: function(el) {
        if (el === "win") {
            this.text = "Congratulations you won!!!!"
            this.cla = 'textWin';
        } else {
            this.text = "You lost, try again!!!!";
            this.cla = 'textLose';
        }
        const menuDiv = document.querySelector('.menu');
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('nameDiv');
        menuDiv.appendChild(inputDiv);

        const textDiv = document.createElement('div');
        textDiv.classList.add('textDiv');
        inputDiv.appendChild(textDiv);

        const texts = document.createElement('span');
        texts.className = this.cla;
        texts.innerHTML = this.text;
        textDiv.appendChild(texts);
        if (el === "lost") {
            return;
        }
        const input = document.createElement('input');
        input.classList.add('nameInput');
        if (localStorage[data.storage2] != undefined && player.continue === true){
            input.setAttribute('value', localStorage[data.storage2]);
        } else {
            input.placeholder = "Name";
        }
        inputDiv.appendChild(input);
    }
}
/**
* menu function
* creates the menus depending of the el value.
* @param el: the required menu to load.
*/
function menu(el) {
    let menus = [];
    let menusVar = [];
    if (el === "menu") {
        menus = ["Quick Game", "Player Select", "Leaderboard"];
        if (player.localSprite != undefined) {
            menus.unshift("Continue");
        }
    }
    if (el === "pause") {
        menus = ["Resume", "Restart", "Quit"];
    }
    if (el === "win") {
        reusedVar.d = true;
        menus = ["Submit", "Restart", "Leaderboard", "Quit"];
        inputField.input("win");
        const menuDiv = document.querySelector('.menu');
        const scoreShow = document.createElement('span');
        scoreShow.classList.add('scoreShow');
        scoreShow.innerHTML = `Your score is ${player.score}.`;
        menuDiv.prepend(scoreShow);
        menuDiv.style.padding = "10px";
    }
    if (el === "lost") {
        menus = ["Restart", "Leaderboard", "Quit"];
        inputField.input("lost");
    }

    for (let i = 0; i < menus.length; i++) {
        menusVar[i] = document.createElement('button');
        menusVar[i].innerHTML = menus[i];
        menusVar[i].className = menus[i];
        modal.appendChild(menusVar[i]);
        }
}
/*
* The player select screen function that creates a player select screen.
*/
function playerSelect() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const body = document.querySelector('body');
    const input = document.createElement('input');
    input.classList.add('selectInput');
    input.innerHTML = "";
    input.placeholder = "Name";
    body.appendChild(input);
    canvas.addEventListener('click', selectButtons.buttons);
    selectUpdate();
}
/*
* The Leaderboard function that runs the leaderboard screen.
*/
function leaderboards() {
    reset();
    document.querySelector('.menu').remove();
    data.update();
    data.render();
    ctx.fillStyle = "black";
    ctx.strokeRect(0, 10, 100, 35);
    ctx.font = '20px serif';
    ctx.fillText("Back", 28, 35);
    canvas.addEventListener('click', selectButtons.back);
}
/**
* Select class.
* Holds the properties for the player select screen.
* @param x: x position. y: t position. width: width of the object
* height: height of the object. num: the number of the player sprite.
*/
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
    this.count;
}

/**
* Select render prototype.
* renders the player characters.
*/
Select.prototype.render = function() {
    ctx.drawImage(Resources.get(player.sprite[this.num]), this.x, this.y, this.width, this.height);
};

/**
* Select update prototype.
* updates the player characters' position
*/
Select.prototype.update = function() {
    if (this.move === true && this.count > 0) {
        this.x -= (this.moveXBy / 25); // 4
        this.y -= (this.moveYBy / 25); //-1
        this.width -= (this.widthBy / 25); //-1
        this.height -= (this.heightBy / 25); //-2
        this.count -= 4;
    }
};

/**
* Select check prototype.
* checks the tags of the characters.
*/
Select.prototype.check = function(el) {
    this.arr = [this.x, this.y, this.width, this.height];
    this.mark = 0;
    /**
    * the returned generator functions value.
    */
    this.generator = this.return();
    /**
    * Perform the position check until it matches the individual objects location
    * with the pre typed location. And then tags the object with a certain number.
    */
    while (this.mark === 0) {
        this.test = this.generator.next();
        if (this.arr[0] === this.test.value[1] && this.arr[1] === this.test.value[2] &&
            this.arr[2] === this.test.value[3] && this.arr[3] === this.test.value[4] &&
            this.arr[4] === this.test.value[5]) {
            this.tag = this.test.value[0];
            this.mark = 1;
        }
    }
    /**
    * Checks the position and adds the tag without cycling the character sprites.
    */
   if (el === null) {
        return;
    }
    /**
    * the cycle method is called.
    */
    this.cycle(el);
    this.move = true;
    this.count = 100;
};

/**
* Select return prototype
* a generator which returns the arrays of the sprites' positions.
*/
Select.prototype.return = function*() {
    yield this.first;
    yield this.second;
    yield this.third;
    yield this.forth;
    yield this.fith;
};
/**
* Select cycle prototype.
* moves the sprites to the next location.
*/
Select.prototype.cycle = function(el) {
    /**
    * move the characters to one side
    */
    if (el === true) {
        /**
        * a loop to check all of the scharacter sprites. The check
        * tells how much pixels to move to the next location.
        */
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
    /**
    * move the characters to another side
    */
    } else if (el === false) {
        /**
        * a loop to check all of the scharacter sprites. The check
        * tells how much pixels to move to the next location.
        */
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
/**
* Select buttons prototype.
* select screen buttons.
* @param e: info about the click event.
*/
Select.prototype.buttons = function(e) {
    this.canWidL = canvas.offsetWidth / 10;
    this.canHigLR = canvas.offsetHeight / 1.5;
    this.canWidR = canvas.offsetWidth / 1.109;
    this.canWidM = canvas.offsetWidth / 2.52;
    this.canHigM = canvas.offsetHeight / 1.21;
    this.size = [100, 90, 100, 50];
    const pausedX = e.offsetX;
    const pausedY = e.offsetY;
    if (canvas.offsetWidth < 400) {
        this.size = [80, 80, 70, 40];
    }
    /**
    * right arrow button
    */
    if (pausedX < this.canWidR && pausedY > this.canHigLR - 50 && pausedX > this.canWidR - this.size[0] && pausedY < this.canHigLR + 50) {
        char1.check(true);
        char2.check(true);
        char3.check(true);
        char4.check(true);
        char5.check(true);
     }
    /**
    * left arrow button
    */
    if (pausedX > this.canWidL && pausedY > this.canHigLR - 50 && pausedX < this.canWidL + this.size[1] && pausedY < this.canHigLR + 50) {
        char1.check(false);
        char2.check(false);
        char3.check(false);
        char4.check(false);
        char5.check(false);
    }
    /**
    * player select button.
    */
    if (pausedX > this.canWidM && pausedX < this.canWidM + this.size[2] && pausedY > this.canHigM && pausedY < this.canHigM + this.size[3]) {
        data.insert("select");
        document.querySelector('.selectInput').remove();
        reusedVar.b = true;
        canvas.removeEventListener('click', selectButtons.buttons);
    }
    /**
    * back button
    */
    if (pausedX < this.size[0] && pausedY < this.size[3]) {
        reusedVar.c = true;
        document.querySelector('.selectInput').remove();
        start = false;
        canvas.removeEventListener('click', selectButtons.buttons);
    }
};
/**
* Select back prototype
* back button
* @param e: info about the click event.
*/
Select.prototype.back = function(e) {
    this.size = [100, 90, 100, 50];
    const pausedX = e.offsetX;
    const pausedY = e.offsetY;
    if (canvas.offsetWidth < 400) {
        this.size = [80, 80, 70, 40];
    }
    /**
    * if certain place is clicked then this is executed.
    */
    if (pausedX < this.size[0] && pausedY < this.size[3]) {
        data.leaderboard = [];
        data.scoreArr = [];
        data.sY = 260;
        data.bY = 275;
        data.gY = 240;
        canvas.removeEventListener('click', selectButtons.back);
        document.querySelector('.scoreListDiv').remove();
        /**
        * creates a winning screen.
        */
        if (reusedVar.d === true) {
            reusedVar.d = false;
            reusedVar.start = false;
            reset();
            menu("win");
            if (menuButtons.submit === true) {
                const submit = document.querySelector('.Submit');
                submit.style.background = "grey";
                submit.style.opacity = "0.3";
                submit.setAttribute('disabled', "");
            }
        } else if (hearts.hearts === 0) {
            /**
            * creates a lost screen
            */
            reset();
            menu("lost");
        } else {
            /**
            * creates a menu screen.
            */
            reusedVar.start = true;
            reset();
        }
    }
};
/**
* objects of all of the characters and a back button.
*/
const char1 = new Select(150, 25, 75, 150, 0);
const char2 = new Select(50, 100, 100, 200, 1);
const char3 = new Select(150, 100, 200, 350, 2);
const char4 = new Select(350, 100, 100, 200, 3);
const char5 = new Select(300, 25, 75, 150, 4);
const selectButtons = new Select();
/**
* Data class
* hold all of the parameters for the player and sprite data insert into the databse and display on the screen.
*/
function Data() {
    this.storage1 = "Recent_Character";
    this.storage2 = "Recent_Name";
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
}
/**
* Data insert prototype
* inserts typed and/or character unique tag data into localStorage.
*/
Data.prototype.insert = function(el) {
    /**
    * checks the postion and tags the character sprites.
    */
    for (let i = 0; i < this.tagArr.length; i++) {
        this.tagArr[i].check(null);
    }
    /**
    * adds the tag of the third sprite.
    */
    for (let i = 0; i < this.tagArr.length; i++) {
        if (this.tagArr[i].tag === 3) {
            this.tag = this.tagArr[i].num;
        }
    }
    /**
    * if the player selects the character then the characters tag and name
    * is inserted into the localStorage.
    */
    this.input = document.querySelector('input');
    if (el === "select") {
        this.value = document.querySelector('.selectInput').value;
        localStorage.setItem(this.storage1, this.tag);
        localStorage.setItem(this.storage2, this.value);
        return;
    }
    if (this.timesPlayed === undefined) {
        this.timesPlayed = 1;
    } else {
        this.int = parseInt(this.timesPlayed);
        this.int += 1;
        this.timesPlayed = this.int;
    }
    /**
    * if the player has not clicked a select button in player select screen then
    * all of the score is inserted into the localStorage.
    */
    if (el === "random") {

        this.name += this.timesPlayed;
        this.character += this.timesPlayed;
        this.score += this.timesPlayed;
        this.time += this.timesPlayed;
        this.star += this.timesPlayed;
        this.heart += this.timesPlayed;
        /**
        * if the player select tag is present in the localStorage, then
        * that tag will be used to add together with other scores.
        */
        if (player.localSprite != undefined && player.continue === true) {
            this.tag = parseInt(player.localSprite);
        } else {
            this.tag = player.random;
        }
        localStorage.setItem("TimesPlayed", this.timesPlayed)
        localStorage.setItem(this.timesPlayed, this.stringTag);

        localStorage.setItem(this.character, this.tag);
        localStorage.setItem(this.name, this.input.value);
        localStorage.setItem(this.score, player.score);
        localStorage.setItem(this.time, timer.count);
        localStorage.setItem(this.star, star.starsCollected);
        localStorage.setItem(this.heart, hearts.hearts);

        this.name = "Name";
        this.character = "Character";
        this.score = "Score";
        this.time = "Time";
        this.star = "Stars";
        this.heart = "Hearts";
    }
};
/**
* Data update prototype
* updates the localStorage keys so that they would not be overwritten,
* also selects the player data from localStorage and stores it on an array
* from the highest score value to the lowest.
*/
Data.prototype.update = function() {
    this.highest;
    this.first = [];
    this.second = [];
    this.third = [];
    this.index = []
    this.list = [];
    this.highestArr = [];
    this.timesPlayed = parseInt(this.timesPlayed);
    /**
    * Increments the Keys of the localStorage, so that the data would not be overwritten.
    */
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
            /**
            * pushes all of the players data into an array from localStorage.
            */
            this.leaderboard.push([this.characters, this.names, this.scores, this.times, this.stars, this.hearts]);
        }
        /**
        * pushes into a this.scoreArr only the scores data.
        */
        for (let i = 0; i < this.leaderboard.length; i++) {
            this.scoreArr.push(parseInt(this.leaderboard[i][2]));
            }
            /**
            * loops through this.scoreArr until the highest value is found,
            * the highest value is pushed into the this.highestArr array,
            * and the same value is then marked as -1 in the this.scoreArr,
            * then it gets added to the this.list array.
            */
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
/**
* Data render prototype.
* renders the extracted data from the localStorage. Also the required visual object
* are drawn or created with DOM manipulation.
*/
Data.prototype.render = function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#A9BCF5";
    ctx.fillRect(0,50,canvas.width,canvas.height - 70);
    /**
    * a modal is created for score display
    */
    const bod = document.querySelector('body');
    const modal = document.createElement('div');
    modal.classList.add('scoreListDiv');
    bod.appendChild(modal);

    const namingUl = document.createElement('ul');
    namingUl.classList.add('namingUl');
    modal.appendChild(namingUl);
    /**
    * adds the titles of the column
    */
    for (let i = 0; i < 5; i++) {
        const namingLi = document.createElement('li');
        namingLi.classList.add('namingLi');
        namingLi.innerHTML = this.namingArr[i];
        namingUl.appendChild(namingLi);
    }

    const ulItems = document.createElement('ol');
    ulItems.classList.add('ulCont');
    ulItems.setAttribute("start", 4)
    modal.appendChild(ulItems);
    /**
    * draws platforms for the characters.
    */
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
    /**
    * loops though the this.list array.
    */
    for (let i = 0; i < this.list.length; i++) {
        /**
        * draws the character with the highest score.
        */
        if (this.first[0] === undefined) {
            this.first.push(this.list[i]);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.first[0][0])]), 180, 0, 150, 250);
            ctx.fillStyle = "black";
            this.gY = 240;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.first[0][i], 240, this.gY);
            this.gY += 15;
            }
        } else if (this.second[0] === undefined) {
            /**
            * draws the character with the second highest score.
            */
            this.second.push(this.list[i]);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.second[0][0])]), 10, 20, 150, 250);
            this.sY = 260;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.second[0][i], 75, this.sY);
            this.sY += 15;
            }
        } else if (this.third[0] === undefined) {
            /**
            * draws the character with the third highest score.
            */
            this.third.push(this.list[i]);
            ctx.drawImage(Resources.get(player.sprite[parseInt(this.third[0][0])]), 350, 40, 150, 250);
            this.bY = 275;

            for (let i = 1; i <= this.namingArr.length; i++) {
            ctx.fillText(this.third[0][i], 410, this.bY);
            this.bY += 15;
            }
        } else {
            /**
            * draws creates a list element
            */
            const listItems = document.createElement('li');
            listItems.classList.add('listItems');
            ulItems.appendChild(listItems);
            /**
            * creates a span element for ever entry associated with the characters score.
            */
            for (let p = 1; p < 6; p++) {
                const liItems = document.createElement('span');
                liItems.classList.add('liItems');
                liItems.innerHTML = this.list[i][p];
                listItems.appendChild(liItems)
            }
        }
    }
};
/**
* data object
*/
const data = new Data();