# Frogger-Clone

## Table of Contents

* [About](#about)
* [Mechanics](#mechanics)
* [Code](#code)
* [Dependencies](#dependencies)




## About

This "Frogger" clone can be started by opening the index.html file. The start screen will display a menu with a few choices, such as quick game, player select, leaderboard and also depending whether you have selected the player before or not, the continue button will also be available to press.

The game is played out like a classic "Frogger" game. The player is controlling a character, and tries to avoid moving objects from left to right. When the player reaches a water tile, a character will be placed at the very begining, if the player reaches the water tile 10 times, then he will win the game.

The score is calculated based on how many stars the player has collected and how many hearts he still has and also how quickly was the level finished.

After a loss the player is given a choice to restart the game, to check the leaderboards or to quit the game.

After a win the player is given a choice to enter a name and submit the score to the leaderboard. Also the player could just restart or quit the game.

## Mechanics

The player can control the character by arrow keys on the keyboard or on the screen if the user chooses to play on a mobile device. Also after a certain amount of crosses through the road, the enemy objects will increase in speed. If the player is hit by the enemy, the player will be placed at the beginning. If the player runs out of hearts, then the player will lose the game. If a player crosses the road a certain amount of times, then the player wins the game.

## Code

The JavaScript programming language was used for all of the logic of the game. Also some of the elements were added into the DOM using JavaScript: such as a modal and buttons.

CSS3 was used to style the elements.

HTML5 was used to add the primary elements into the DOM.

Some of the formulas used for the collision code were taken from http://strd6.com/2010/06/circular-collision-detection-in-javascript/.

## Dependencies

Styles,

app.css - styles the whole page. Adjusts the font sizes, colors and position of the elements. Also makes the page responsive.

Bootstrap - from https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css, adds icons such as arrows for the screen movement buttons

Game logic,

app.js - this is all of the code that is responsible for calculating and creating various objects, movements and interactions.

engine.js - this is a game engine, which runs in a loop. All of the necessary invocations are placed here, so that they would be repeated continuesly and the animations would be possible and the collision and other required information would be updated.

recource.js - this is where all of the images are loaded and stored, so that some stress would be relieved from all of the image loading.

Local browser storage - stores the information of the players current match such as the players chosen name also the matches score, time, hearts and stars.