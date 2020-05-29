// global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var s1 = 0;
var s2 = 0;
var specialBar1 = 100;
var specialBar2 = 100;
var pwrUpOn1 = false;
var pwrUpOn2 = false;

var time = 60;
var timer;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
var   pwrUpPaddleHeight = 225;
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

var bounce = new sound("sounds/collide.mp3");
var score = new sound("sounds/score.mp3");

// used to control game start/stop
var controlPlay;

var gameStarted = false;
var gamePaused = false;

// start ball motion
window.addEventListener('load', function() {
  changeVisibility("lightbox");
  changeVisibility("titleMenu");
});

// Move paddles
document.addEventListener('keydown', function(e) {
     console.log("key down " + e.keyCode);
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

    if (e.keyCode == 69 && specialBar1 == 100|| e.which == 69 && specialBar1 == 100) { // e
      pwrUp("paddle1");

      setTimeout(function(){endPwrUp("paddle1");}, 2000);

      specialBar1 = 0;

    }

    if (e.keyCode == 80 && specialBar2 == 100|| e.which == 80 && specialBar2 == 100) { // p
      pwrUp("paddle2");

      setTimeout(function(){endPwrUp("paddle2");}, 2000);

      specialBar2 = 0;
    }


});

function pwrUp(p) {
  if(p == "paddle1"){
    pwrUpOn1 = true;
  } else {
    pwrUpOn2 = true;
  }

}

function endPwrUp(p) {
  if(p == "paddle1"){
    pwrUpOn1 = false;
  } else {
    pwrUpOn2 = false;
  }
}

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

// object constructor to play sounds
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// start the ball movement
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

  // speed of ball depends on time
   if (s1 == 5 || s2 == 5) {
  topSpeedOfBall = Math.random() * 4 + 5;
  leftSpeedOfBall = direction * (Math.random() * 4 + 5);
} else if (s1 == 10 || s2 == 10) {
  topSpeedOfBall = Math.random() * 5 + 6;
  leftSpeedOfBall = direction * (Math.random() * 5 + 6);
} else if (s1 > 10 || s2 > 10) {
  topSpeedOfBall = Math.random() * 6 + 7;
  leftSpeedOfBall = direction * (Math.random() * 6 + 7);
} else {
  topSpeedOfBall = Math.random() * 3 + 4;
  leftSpeedOfBall = direction * (Math.random() * 3 + 4);
}


} // start ball



// update locations of paddles and ball
function show() {

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
  if (pwrUpOn1 == true && positionOfPaddle1 >= gameboardHeight - pwrUpPaddleHeight) {
    positionOfPaddle1 = gameboardHeight - pwrUpPaddleHeight;
  } else if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
    positionOfPaddle1 = gameboardHeight - paddleHeight;
  } // if

  // stop the paddle from leaving bottom of gameboard
  if (pwrUpOn2 == true && positionOfPaddle2 >= gameboardHeight - pwrUpPaddleHeight) {
    positionOfPaddle2 = gameboardHeight - pwrUpPaddleHeight;
  } else if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
    positionOfPaddle2 = gameboardHeight - paddleHeight;
  } // if

  // if ball hits top, or bottom, of gameboard, change direction
  if (topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight) {
      topSpeedOfBall *= -1;
  } // if

  // ball on left edge of gameboard
  if (leftPositionOfBall <= paddleWidth) {

    // if ball hits left paddle, change direction
    if(pwrUpOn1 == true && topPositionOfBall > positionOfPaddle1 &&
        topPositionOfBall < positionOfPaddle1 + pwrUpPaddleHeight){
          bounce.play();
          leftSpeedOfBall *= -1;
        } else if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1
        + paddleHeight) {
          bounce.play();
      leftSpeedOfBall *= -1;
      if(specialBar1 < 100){
      specialBar1 += 10;
      }
    } else {
      if(specialBar2 < 90){
      specialBar2 += 20;
    } else if(specialBar2 = 90){
      specialBar2 += 10;
      }
      startBall();
      score.play();
      s2++;
    } // else
  } // if

  // ball on right edge of gameboard
  if (leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight) {
    // if ball hits right paddle, change direction
    if(pwrUpOn2 == true && topPositionOfBall > positionOfPaddle2 &&
        topPositionOfBall < positionOfPaddle2 + pwrUpPaddleHeight){
          bounce.play();
          leftSpeedOfBall *= -1;
        } else if (topPositionOfBall > positionOfPaddle2 &&
        topPositionOfBall < positionOfPaddle2 + paddleHeight) {
          bounce.play();
      leftSpeedOfBall *= -1;
      if(specialBar2 < 100){
      specialBar2 += 10;
      }
    } else {
      if(specialBar1 < 90){
      specialBar1 += 20;
    } else if(specialBar1 = 90){
        specialBar1 += 10;
        }
      startBall();
      score.play();
      s1++;
    } // else
  } // if

  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
  document.getElementById("ball").style.top = topPositionOfBall + "px";
  document.getElementById("ball").style.left = leftPositionOfBall + "px";
  document.getElementById("score1").innerHTML = s1;
  document.getElementById("score2").innerHTML = s2;
  document.getElementById("sp1").style.width = specialBar1 + "px";
  document.getElementById("sp2").style.width = specialBar2 + "px";

  if (pwrUpOn1 == true){
    document.getElementById("paddle1").style.height = pwrUpPaddleHeight + "px";
  } else {
    document.getElementById("paddle1").style.height = 125 + "px";
  }

  if (pwrUpOn2 == true){
    document.getElementById("paddle2").style.height = pwrUpPaddleHeight + "px";
  } else {
    document.getElementById("paddle2").style.height = 125 + "px";
  }

} // show


// resume game play
function resumeGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  countdown();

  gamePaused = false;

  if (!controlPlay){
    controlPlay = window.setInterval(show, 1000/60);
  }

} // resumeGame

// pause game play
function pauseGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  clearTimeout(timer);

  window.clearInterval(controlPlay);
  controlPlay = false;
} // pauseGame

// start game play
function newGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");


  time = 60;
  countdown();

  gamePaused = false;

  // reseting locations and scores
  s1 = 0;
  s2 = 0;
  specialBar1 = 0;
  specialBar2 = 0;
  positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;

  startBall();


  if (!controlPlay){
    controlPlay = window.setInterval(show, 1000/60);
  }
}

function stopGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  gameStarted = false;

  window.clearInterval(controlPlay);
  controlPlay = false;

  // show lightbox with score
  let message = "Tie Game";
  let message2 = "";

  if (s2 > s1){
    message = "Player 2 wins with " + s2 + " points";
    message2 = "Player 1 had " + s1 + " points";
  } else if (s1 > s2){
    message = "Player 1 wins with " + s1 + " points";
    message2 = "Player 2 had " + s2 + " points";
  }

  showLightBox(message, message2);
}

function startGame() {
  changeVisibility("lightbox");
  changeVisibility("titleMenu");

  gameStarted = true;
  countdown();

  startBall();

  if (!controlPlay){
    controlPlay = window.setInterval(show, 1000/60);
  }
}

// sets up the timer
// code from: https://www.youtube.com/watch?v=u_6CqjQ-L8Q
function countdown() {
  document.getElementById("timer").innerHTML = time;
  if(time < 0) {
    clearTimeout(timer);
    document.getElementById("timer").innerHTML = 0;
    gameStarted = false;

    window.clearInterval(controlPlay);
    controlPlay = false;

    // show lightbox with score
    let message = "Tie Game";
    let message2 = "";

    if (s2 > s1){
      message = "Player 2 wins with " + s2 + " points";
      message2 = "Player 1 had " + s1 + " points";
    } else if (s1 > s2){
      message = "Player 1 wins with " + s1 + " points";
      message2 = "Player 2 had " + s2 + " points";
    }

    showLightBox(message, message2);

    return;
  }

  time--;
  timer = setTimeout('countdown('+time+',"timer")',1000);
}

/*** Lightbox Code ***/

// change the visibility of divID
function changeVisibility(divID){
  var element = document.getElementById(divID);

  // if element exists, it is considered true
  if (element) {
    element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
  } // if

} // changeVisibility

function showLightBox(message, message2) {

  // set messages
  document.getElementById("message").innerHTML = message;
  document.getElementById("message2").innerHTML = message2;

  // show light box
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");

}

function continueGame() {
  changeVisibility("lightbox");
  changeVisibility("boundaryMessage");


  time = 60;
  countdown();

  gameStarted = true;

  s1 = 0;
  s2 = 0;
  specialBar1 = 0;
  specialBar2 = 0;
  positionOfPaddle1 = startPositionOfPaddle1;
  positionOfPaddle2 = startPositionOfPaddle2;

  startBall();


  if (!controlPlay){
    controlPlay = window.setInterval(show, 1000/60);
  }
}// continueGame


/*** End Lightbox Code ***/
