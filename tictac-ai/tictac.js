let currentPlayer = "X";
let gameStatus = ""; // " " - continue, "Tie", "X wins", "O wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six",
                  "seven", "eight", "nine"];

// reset board and all variables
function newGame() {

  //reset board
  for (var i = 0; i < idNames.length; i++) {
    document.getElementById(idNames[i]).innerHTML = "";
  } // for

  numTurns = 0;
  gameStatus = "";
  currentPlayer = "X";

  changeVisibility("controls");

} // newGame

// randomly chooses a free box for computer
function computerTakesTurn() {
  let idName = "";
  let cornerIds = ["one", "three", "seven", "nine"];


  // chooses moves based on player's choice
   do {
    let rand = parseInt(Math.random()*9 + 1);
    let randC = parseInt(Math.random()*4 + 1);

    if(numTurns == 1 && document.getElementById(idNames[4]).innerHTML != ""){
    idName = cornerIds[randC-1];
  } else if(numTurns == 1 && document.getElementById(idNames[4]).innerHTML == ""){
    idName = idNames[4];
  } else if(document.getElementById(idNames[2]).innerHTML == "X"
            && document.getElementById(idNames[8]).innerHTML == "X"
            && document.getElementById(idNames[5]).innerHTML == "" ||
            document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[3]).innerHTML == "X"
            && document.getElementById(idNames[5]).innerHTML == ""){
    idName = idNames[5];
  } else if(document.getElementById(idNames[0]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == "X"
            && document.getElementById(idNames[3]).innerHTML == "" ||
            document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[5]).innerHTML == "X"
            && document.getElementById(idNames[3]).innerHTML == ""){
    idName = idNames[3];
  } else if(document.getElementById(idNames[0]).innerHTML == "X"
            && document.getElementById(idNames[3]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == "" ||
            document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[2]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == "" ||
            document.getElementById(idNames[8]).innerHTML == "X"
            && document.getElementById(idNames[7]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == ""){
    idName = idNames[6];
  } else if(document.getElementById(idNames[0]).innerHTML == "X"
            && document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[8]).innerHTML == "" ||
            document.getElementById(idNames[2]).innerHTML == "X"
            && document.getElementById(idNames[5]).innerHTML == "X"
            && document.getElementById(idNames[8]).innerHTML == "" ||
            document.getElementById(idNames[6]).innerHTML == "X"
            && document.getElementById(idNames[7]).innerHTML == "X"
            && document.getElementById(idNames[8]).innerHTML == ""){
    idName = idNames[8];
  } else if(document.getElementById(idNames[6]).innerHTML == "X"
            && document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[2]).innerHTML == "" ||
            document.getElementById(idNames[0]).innerHTML == "X"
            && document.getElementById(idNames[1]).innerHTML == "X"
            && document.getElementById(idNames[2]).innerHTML == "" ||
            document.getElementById(idNames[5]).innerHTML == "X"
            && document.getElementById(idNames[8]).innerHTML == "X"
            && document.getElementById(idNames[2]).innerHTML == ""){
    idName = idNames[2];
  } else if(document.getElementById(idNames[8]).innerHTML == "X"
            && document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[0]).innerHTML == "" ||
            document.getElementById(idNames[2]).innerHTML == "X"
            && document.getElementById(idNames[1]).innerHTML == "X"
            && document.getElementById(idNames[0]).innerHTML == "" ||
            document.getElementById(idNames[3]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == "X"
            && document.getElementById(idNames[0]).innerHTML == ""){
    idName = idNames[0];
  } else if(document.getElementById(idNames[7]).innerHTML == "X"
            && document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[1]).innerHTML == "" ||
            document.getElementById(idNames[0]).innerHTML == "X"
            && document.getElementById(idNames[2]).innerHTML == "X"
            && document.getElementById(idNames[1]).innerHTML == ""){
    idName = idNames[1];
  } else if(document.getElementById(idNames[1]).innerHTML == "X"
            && document.getElementById(idNames[4]).innerHTML == "X"
            && document.getElementById(idNames[7]).innerHTML == "" ||
            document.getElementById(idNames[8]).innerHTML == "X"
            && document.getElementById(idNames[6]).innerHTML == "X"
            && document.getElementById(idNames[7]).innerHTML == ""){
    idName = idNames[7];
  } else {
    idName = idNames[rand-1];
  }

    if(document.getElementById(idName).innerHTML == ""){
      document.getElementById(idName).innerHTML = currentPlayer;
      break;
    }

  } while (true);
} // computerTakesTurn

// take player turn
function playerTakesTurn(e) {

  if (e.innerHTML == "") {
    e.innerHTML = currentPlayer;
    checkGameStatus();

    // if game not over computer goes
    if (gameStatus == "") {
      setTimeout( function() {
          computerTakesTurn();
          checkGameStatus();
        },300
      );
    } // if

  } else {
    showLightBox("This box is already selected.", "Please try an empty box.");
    return;
  } // else

} // playerTakesTurn

// after each turn, check for a winner, a tie,
// or continue playing
function checkGameStatus(){
  numTurns++; // count turn

  // check for a win
  if (checkWin()) {
      gameStatus = currentPlayer + " won";
  } else if (numTurns == 9) {
      gameStatus = "Tied Game";
  } // else if

  // switch current player
  currentPlayer = (currentPlayer == "X" ? "O" : "X");

  // game is over
  if (gameStatus != ""){
    setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 300);
  }

} // checkGameStatus

// check for a Win, there 8 win paths
function checkWin() {
  let cb = []; // current board
  cb[0] = ""; // not gonna use
  cb[1] = document.getElementById("one").innerHTML;
  cb[2] = document.getElementById("two").innerHTML;
  cb[3] = document.getElementById("three").innerHTML;
  cb[4] = document.getElementById("four").innerHTML;
  cb[5] = document.getElementById("five").innerHTML;
  cb[6] = document.getElementById("six").innerHTML;
  cb[7] = document.getElementById("seven").innerHTML;
  cb[8] = document.getElementById("eight").innerHTML;
  cb[9] = document.getElementById("nine").innerHTML;

  // top row
  if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
    return true;
  } // if

   // bottom row
  if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
    return true;
  } // if

  // middle row
  if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
    return true;
  } // if

  // left column
  if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
    return true;
  } // if

  // right column
  if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
    return true;
  } // if

  // middle column
  if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
    return true;
  } // if

  // down diagnal
  if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
    return true;
  } // if

  // up diagnal
  if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
    return true;
  } // if

} // checkWin

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

  // if the game is over, show controls
  if (gameStatus != "") {
    changeVisibility("controls");
  }

} // continueGame
