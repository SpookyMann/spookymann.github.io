// global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var s1 = 0;
var s2 = 0;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

// start ball motion
window.addEventListener('load', function() {
  startBall();
});

// Move paddles
document.addEventListener('keydown', function(e) {
    // console.log("key down " + e.keyCode);
    if (e.keyCode == 87 || e.which == 87) { // W
        speedOfPaddle1 = -10;
    }

    if (e.keyCode == 83 || e.which == 83) { // S
        speedOfPaddle1 = 10;
    }

    if (e.keyCode == 38 || e.which == 38) { // ^
        speedOfPaddle2 = -10;
    }

    if (e.keyCode == 40 || e.which == 40) { // v
        speedOfPaddle2 = 10;
    }

});

// Stop paddles
document.addEventListener('keyup', function(e) {
    // console.log("key up " + e.keyCode);
    if (e.keyCode == 87 || e.which == 87) { // W
        speedOfPaddle1 = 0;
    }
    if (e.keyCode == 83 || e.which == 83) { // S
        speedOfPaddle1 = 0;
    }
    if (e.keyCode == 38 || e.which == 38) { // ^
        speedOfPaddle2 = 0;
    }

    if (e.keyCode == 40 || e.which == 40) { // v
        speedOfPaddle2 = 0;
    }

});


function startBall() {
  let direction = 1;
  topPositionOfBall = startTopPositionOfBall;
  leftPositionOfBall = startLeftPositionOfBall;


  // 50% chance of starting in either direction (right or left)
  if (Math.random() < 0.5) {
   direction = 1;
  } else {
   direction = -1;
  }
  topSpeedOfBall = Math.random() * 2 + 3; // 3-4.999
  leftSpeedOfBall = direction * (Math.random() * 2 + 3);


} // start ball


// update locations of paddles and ball
window.setInterval (function show() {

  // update positions of elements
  positionOfPaddle1 += speedOfPaddle1;
  positionOfPaddle2 += speedOfPaddle2;
  topPositionOfBall += topSpeedOfBall;
  leftPositionOfBall += leftSpeedOfBall;


  // stop paddle from leaving top of gameboard
  if(positionOfPaddle1 <= 0) {
    positionOfPaddle1 = 0;
  } // if

  if(positionOfPaddle2 <= 0) {
    positionOfPaddle2 = 0;
  } // if

  // stop the paddle from leaving bottom of gameboard
  if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
    positionOfPaddle1 = gameboardHeight - paddleHeight;
  } // if

  // stop the paddle from leaving bottom of gameboard
  if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
    positionOfPaddle2 = gameboardHeight - paddleHeight;
  } // if

  // if ball hits top, or bottom, of gameboard, change direction
  if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
      topSpeedOfBall *= -1;
  } // if

  // ball on left edge of gameboard
  if (leftPositionOfBall <= paddleWidth) {

    // if ball hits left paddle, change direction
    if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1
        + paddleHeight) {
      leftSpeedOfBall *= -1;
    } else {
      startBall();
      s2 += 1;
      document.getElementById("score2").innerHTML = s2;
    } // else
  } // if

  // ball on right edge of gameboard
  if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
    // if ball hits right paddle, change direction
    if (topPositionOfBall > positionOfPaddle2 &&
        topPositionOfBall < positionOfPaddle2 + paddleHeight) {
      leftSpeedOfBall *= -1;
    } else {
      startBall();
      s1 += 1;
      document.getElementById("score1").innerHTML = s1;
    } // else
  } // if

  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";

}, 1000/60); // show
