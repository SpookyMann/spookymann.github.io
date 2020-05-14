// global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

// Move paddles
document.addEventListener('keydown', function(e) {
    // console.log("key down " + e.keyCode);
    if (e.keyCode == 87 || e.which == 87) { // W
        speedOfPaddle1 = -20;
    }

    if (e.keyCode == 83 || e.which == 83) { // S
        speedOfPaddle1 = 20;
    }

    if (e.keyCode == 38 || e.which == 38) { // ^
        speedOfPaddle2 = -20;
    }

    if (e.keyCode == 40 || e.which == 40) { // v
        speedOfPaddle2 = 20;
    }
    show();

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
    show();

});

// update locations of paddles and ball
function show() {
  let paddleHeight = document.getElementById("paddle1").offsetHeight;
  let paddleHeight2 = document.getElementById("paddle2").offsetHeight;
  let gameboardHeight = document.getElementById("gameBoard").offsetHeight;

  positionOfPaddle1 += speedOfPaddle1;
  document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
  positionOfPaddle2 += speedOfPaddle2;
  document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";

  // stop paddle from leaving top of gameboard
  if(positionOfPaddle1 <= 0) {
    positionOfPaddle1 = 0;
  }

  // stop the paddle from leaving bottom of gameboard
  if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
    positionOfPaddle1 = gameboardHeight - paddleHeight;
  }

  if(positionOfPaddle2 <= 0) {
    positionOfPaddle2 = 0;
  }

  // stop the paddle from leaving bottom of gameboard
  if (positionOfPaddle2 >= gameboardHeight - paddleHeight2) {
    positionOfPaddle2 = gameboardHeight - paddleHeight2;
  }


} // show
