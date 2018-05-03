/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */
var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);
    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;
        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        let anim = win.requestAnimationFrame(main);
        /*checks whether certain conditions are met.
        */
        pauseSc(anim);
    }
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();

    }
    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }
    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        star.update();
        heart.update();
        hearts.update();
        timer.update();
    }
    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }
    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        heart.render();
        star.render();
        player.render();
        hearts.render();
        pause.render();
        timer.render();
    }
    /* It is called when the app starts and creates a modal and calls
    * the render() function which renders all of the visuals of the game.
    * an if statement checks whether to open up the main menu or not.
    */
    function reset() {
        const body = document.querySelector('body');
        const modal = document.createElement('modal');
        modal.classList.add('menu');
        modal.style.background = "rgba(0, 0, 0, 0.4)";
        ctx.clearRect(0,0,canvas.width,canvas.height)
        body.appendChild(modal);
        global.modal = modal;
        render();
        modal.addEventListener('click', menuButtons.Buttons);
        if (reusedVar.start === true) {
            menu("menu");
            reusedVar.start = false;
        }
    }
    /*
    * an event listener function for all of the menu buttons
    */
    const menuButtons = {
        submit: false,
        Buttons: function(e) {
            const target = e.target.className;
            if (target === "Quick Game") {
                playState();
            }
            if (target === "Resume") {
                timer.timerCompensate();
                modal.remove();
                pause.k = false;
                lastTime = Date.now();
                main();
            }
            if (target === "Quit") {
                location.reload();
            }
            if (target === "Restart") {
                menuButtons.submit = false;
                playState();
            }
            if (target === "Player Select") {
                modal.remove();
                playerSelect();
            }
            if (target === "Continue") {
               player.continue = true;
                playState();
            }
            if (target === "Submit") {
                menuButtons.submit = true;
                data.insert("random");
                e.target.style.background = "grey";
                e.target.style.opacity = "0.3";
                e.target.setAttribute('disabled', "");
            }
            if (target === "Leaderboard") {
                canvas.removeEventListener('click', pause.paused);
                modal.remove();
                ctx.clearRect(0,0,canvas.width,canvas.height);
                leaderboards();
            }
        }
    }
    /* The gameplay state,
    */
    function playState() {
        document.querySelector('.buttonCont').style.visibility = "visible";
        pause.k = false;
        modal.remove();
        player.reset();
        star.reset(true);
        star.reset(false);
        heart.reset();
        timer.timerStart();
        allEnemies.forEach(function(enemy) {
            enemy.reset();
        });
        allEnemies = [];
        for (let i = 0; i <= 2; i++) {
            allEnemies.push(new Enemy);
        }
        canvas.addEventListener('click', pause.paused)
        lastTime = Date.now();
        main();
    }
    /* A function that runs in a loop. It draws all of the visual objects for the select screen,
    * and calls the necessary object methods.
    */
    function selectUpdate() {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "#A9BCF5";
        ctx.fillRect(0,50,canvas.width,canvas.height - 70);

        ctx.strokeStyle = "black";
        ctx.fillStyle = "#F5D0A9";
        ctx.beginPath();
        ctx.ellipse(250, 450, 40, 70, 90 * Math.PI/180, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(175, 380);
        ctx.lineWidth = 2;
        ctx.lineTo(180, 450);
        ctx.lineTo(320, 450);
        ctx.lineTo(325, 380);
        ctx.lineTo(175, 380);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(175, 380);
        ctx.lineTo(180, 450);
        ctx.stroke();
        ctx.moveTo(320, 450);
        ctx.lineTo(325, 380);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(250, 380, 40, 75, 90 * Math.PI/180, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#FA5858";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(50, 400);
        ctx.lineTo(120, 350);
        ctx.lineTo(120, 380);
        ctx.lineTo(150, 380);
        ctx.lineTo(150, 420);
        ctx.lineTo(120, 420);
        ctx.lineTo(120, 450);
        ctx.lineTo(50, 400);
        ctx.fill();
        ctx.stroke();


        ctx.beginPath();
        ctx.moveTo(455, 400);
        ctx.lineTo(385, 350);
        ctx.lineTo(385, 380);
        ctx.lineTo(355, 380);
        ctx.lineTo(355, 420);
        ctx.lineTo(385, 420);
        ctx.lineTo(385, 450);
        ctx.lineTo(455, 400);
        ctx.fill();
        ctx.stroke();

        ctx.fillRect(200, 500, 100, 50);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial"
        ctx.fillText("Select", 223, 532)
        ctx.strokeRect(200, 500, 100, 50);
        ctx.strokeStyle = "black";


        char1.render();
        char1.update();
        char2.render();
        char2.update();
        char3.render();
        char3.update();
        char4.render();
        char4.update();
        char5.render();
        char5.update();

        ctx.fillStyle = "black";
        ctx.strokeRect(0, 10, 100, 35);
        ctx.font = '20px serif';
        ctx.fillText("Back", 28, 35);

        const anim = win.requestAnimationFrame(selectUpdate);
        if (reusedVar.b === true || reusedVar.c === true) {
            pauseSc(anim);
        }
    }
    /* This function checks whether certain conditions are met.
    * It is responsible for openning a win and lost screen. A pause modal and for the back buttons.
    */
    function pauseSc(el) {
        if (player.levels === 5) {
            win.cancelAnimationFrame(el);
            reset();
            menu("win");
        }
        if (hearts.hearts === 0) {
            win.cancelAnimationFrame(el);
            reset();
            menu("lost");
        }
        if (pause.k === true) {
            win.cancelAnimationFrame(el);
            reset();
            menu("pause");
        }
        if (reusedVar.b === true) {
            win.cancelAnimationFrame(el);
            ctx.clearRect(0,0,canvas.width,canvas.height)
            player.continue = true;
            reset();
            reusedVar.b = false;
            playState();
        }
        if (reusedVar.c === true) {
            win.cancelAnimationFrame(el);
            ctx.clearRect(0,0,canvas.width,canvas.height)
            reusedVar.start = true;
            reusedVar.c = false;
            reset();
        }
    }
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/Rock.png',
        'images/Star.png',
        'images/Heart.png',
        'images/Key.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]);
    Resources.onReady(init);
    /* Assign the canvas' context object, reset, playState, selectUpdate, main functions and
    * menuButtons object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;
    global.reset = reset;
    global.playState = playState;
    global.selectUpdate = selectUpdate;
    global.main = main;
    global.menuButtons = menuButtons;
})(this);