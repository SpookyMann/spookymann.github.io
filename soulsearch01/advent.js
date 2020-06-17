  const levels = [

    // level 0
   ["heart", "rocktwo", "", "", "", "tree",
   "wallUp", "water", "", "wallSide", "pwrup", "rock",
   "", "water", "animate","animate","animate", "rock",
   "", "water", "", "tree", "cursedWallUp", "water",
   "", "wallSide", "", "girlup", "", "water"],

   // level 1
   ["rock", "rock", "rocktwo", "rock", "rocktwo", "rock",
   "water", "water", "pwrup", "cursedWallSide", "", "rocktwo",
   "heart", "wallSide", "animate", "animate", "wallUp", "girlleft",
   "water", "water", "", "", "", "",
   "rocktwo", "rock", "rocktwo", "rock", "rocktwo", "rock"],

   // level 2
   ["rocktwo", "heart", "cursedWallSide", "", "wallSide", "pwrup",
   "rocktwo", "wallUp", "rock", "wallUp", "water",  "",
   "", "animate", "" , "",  "",  "animate",
   "tree", "rock", "", "tree", "rock",  "rock",
   "water", "rocktwo", "girlup", "",  "rock", "water"],

   // level 3
   ["rocktwo", "", "girldown", "", "", "pwrup",
   "rocktwo", "wallUp", "cursedWallUp", "rock", "mobUp",  "mobUp",
   "", "animate", "animate" , "tree",  "",  "",
   "", "rocktwo", "rock", "", "",  "wallUp",
   "", "", "", "",  "water", "heart"],

   // level 4
   ["heart", "wallSide", "", "", "", "pwrup",
   "water", "water", "water", "water", "bridge", "water",
    "tree", "", "", "animate", "animate", "animate",
    "water", "water", "bridge", "water", "water", "water",
    "", "", "", "", "", "girlup"],

    // level 5
    ["pwrup", "mobLeft", "girldown", "mobRight", "", "heart",
     "", "rocktwo", "", "rock", "wallUp", "cursedWallUp",
     "", "tree", "", "rocktwo", "", "",
     "", "rock", "", "tree", "wallUp", "wallUp",
     "animate", "animate", "animate", "animate", "animate", "animate"],

     // final level (level 6)
     ["mobDown", "mobDown", "mobDown", "mobDown", "mobDown", "mobDown",
     "mobDown", "mobDown", "mobDown", "mobDown", "mobDown", "mobDown",
     "heart", "", "pwrup", "", "", "girlleft",
     "mobUp", "mobUp", "mobUp", "mobUp", "mobUp", "mobUp",
     "mobUp", "mobUp", "mobUp", "mobUp", "mobUp", "mobUp"],

   ];

// game timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water", "rocktwo", "waterBorderUp",
                          "waterBorderDown"];

var health = 200;

var gameStarted = false; // if game has started or not
var gamePaused = false; // if game is paused or not


var currentLevel = 0; // starting level
var level = 1; // to show current level
var pwrupOn = false; // is the pwrup on?
var invinc = false; // gives player invincibility depending on if game is pause or not
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var animatedBoxes;
var widthOfBoard = 6;

// start game
window.addEventListener("load", function () {
    changeVisibility("titleMenu");
});

// move horse
document.addEventListener("keydown", function (e) {

  if (gamePaused == false){
  switch (e.keyCode) {
    case 37: // left arrow
      if (currentLocationOfHorse % widthOfBoard !== 0) {
         tryToMove("left");
      }
      break;

    case 38: // up arrow
    if (currentLocationOfHorse - widthOfBoard >= 0) {
       tryToMove("up");
    }
    break;

    case 39: // right arrow
    if (currentLocationOfHorse % widthOfBoard < widthOfBoard -1) {
       tryToMove("right");
    }
    break;

    case 40: // down arrow
    if (currentLocationOfHorse + widthOfBoard < widthOfBoard * 5) {
       tryToMove("down");
    }
    break;
  } // switch

}

}); // key event listener

// try to move horse
function tryToMove(direction) {

  // location before move
  let oldLocation = currentLocationOfHorse;

  // class of location before move
  let oldClassName = gridBoxes[oldLocation].className;

  let nextLocation = 0; // location we wish to move to
  let nextClass = ""; // class of location we wish to move to

  let nextLocation2 = 0;
  let nextClass2 = "";

  let newClass = ""; // new class to switch to if move sucessful


  switch (direction) {
    case "left":
      nextLocation = currentLocationOfHorse - 1;
      break;
    case "right":
      nextLocation = currentLocationOfHorse + 1;
      break;
    case "up":
      nextLocation = currentLocationOfHorse - widthOfBoard;
      break;
    case "down":
      nextLocation = currentLocationOfHorse + widthOfBoard;
      break;

  } // switch

  nextClass = gridBoxes[nextLocation].className;

  if (!pwrupOn && nextClass.includes("heart")) { return; }

  // if the obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) { return; }

  // if it's a wall, and there is no pwrup, don't move
  if (!pwrupOn && nextClass.includes("wall")) { return; }

  if (nextClass.includes("cursed")){
    if(health == 40) {
      health -= 40;
      document.getElementById("health").style.width = health + "px";
      death();
      return;
    } else {
    health -= 40;
    document.getElementById("health").style.width = health + "px";
    return;
    }
  }
  if (nextClass.includes("mobUp") || nextClass.includes("mobDown")){
    if(health == 40) {
      health -= 40;
      document.getElementById("health").style.width = health + "px";
      death();
      return;
    } else {
    health -= 40;
    document.getElementById("health").style.width = health + "px";
    return;
    }
  }

  if (direction == "left" && nextClass.includes("wallUp") ||
      direction == "right" && nextClass.includes("wallUp") ||
      direction == "up" && nextClass.includes("wallSide") ||
      direction == "down" && nextClass.includes("wallSide")) {
        return;
  } else {

  // if there is a wall, move two spaces with animation
  if (nextClass.includes("wall")) {

    // pwrup must be on to jump
    if (pwrupOn) {
      gridBoxes[currentLocationOfHorse].className = "";
      oldClassName = gridBoxes[nextLocation].className;

      // set values accoding to direction
      if (direction == "left" && nextClass.includes("wallSide")) {
        nextClass = "wallPhaseLeft";
        nextLocation2 = nextLocation - 1;

        // check if there is obstacle after jump
        if (noPassObstacles.includes(gridBoxes[nextLocation2].className)) {
          nextClass2 = "awakenedright";
          nextLocation2 = nextLocation + 1;
        } else {
          nextClass2 = "awakenedleft";
        }
      } else if (direction == "right" && nextClass.includes("wallSide")) {
        nextClass = "wallPhaseRight";
        nextLocation2 = nextLocation + 1;

        // check if there is obstacle after jump
        if (noPassObstacles.includes(gridBoxes[nextLocation2].className)) {
          nextClass2 = "awakenedleft";
          nextLocation2 = nextLocation - 1;
        } else {
          nextClass2 = "awakenedright";
        }
      } else if (direction == "up" && nextClass.includes("wallUp")) {
        nextClass = "wallPhaseUp";
        nextLocation2 = nextLocation - widthOfBoard;

        // check if there is obstacle after jump
        if (noPassObstacles.includes(gridBoxes[nextLocation2].className)) {
          nextClass2 = "awakeneddown";
          nextLocation2 = nextLocation + widthOfBoard;
        } else {
          nextClass2 = "awakenedup";
        }
      } else if (direction == "down" && nextClass.includes("wallUp")) {
        nextClass = "wallPhaseDown";
        nextLocation2 = nextLocation + widthOfBoard;

        // check if there is obstacle after jump
        if (noPassObstacles.includes(gridBoxes[nextLocation2].className)) {
          nextClass2 = "awakenedup";
          nextLocation2 = nextLocation - widthOfBoard;
        } else {
          nextClass2 = "awakeneddown";
        }
      }

      // show horse jumping
      gridBoxes[nextLocation].className = nextClass;

      setTimeout(function() {

        // set jump back to just a wall
        gridBoxes[nextLocation].className = oldClassName;

        // update current location of horse to be 2 spaces past take off
        currentLocationOfHorse = nextLocation2;

        // get class of box after the jump
        nextClass = gridBoxes[currentLocationOfHorse].className;

        // show horse and pwrup after landing
        gridBoxes[currentLocationOfHorse].className = nextClass2;

        // if next box is a heart, go up a level
        levelUp(nextClass);

      }, 350);
      return;

    } // if pwrupOn

  } // if class has wall
}

  // if there is a pwrup, add pwrup
  if (nextClass == "pwrup") {
    pwrupOn = true;
  }

  // if there is a bridge in the old location keep it
  if (oldClassName.includes("bridge")) {
    gridBoxes[oldLocation].className = "bridge";
  } else {
    gridBoxes[oldLocation].className = "";
  } // else

  // build name of new class
  newClass = (pwrupOn) ? "awakened" : "girl";
  newClass += direction;

  // if there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
    newClass += " bridge";
  }

  // move 1 space
  currentLocationOfHorse = nextLocation;
  gridBoxes[currentLocationOfHorse].className = newClass;

  // if it is an enemy
  if (nextClass.includes("mob") && invinc == false) {
    if(health == 40) {
      health -= 40;
      document.getElementById("health").style.width = health + "px";
      death();
    } else {
    health -= 40;
    document.getElementById("health").style.width = health + "px";
    }
  }

  // move up to next level if needed
  levelUp(nextClass);

} // tryToMove

// move up a level
function levelUp(nextClass) {
  if (nextClass == "heart" && pwrupOn) {
    document.getElementById("levelup").style.display = "block";
    gamePaused = true;
    clearTimeout(currentAnimation);
    setTimeout (function(){
      document.getElementById("levelup").style.display = "none";
      gamePaused = false;
      currentLevel++;
      level++;
      loadLevel();
    }, 2000);
  }
} // levelUp

// load levels 0 - maxlevel
function loadLevel(){
  let levelMap = levels[currentLevel];
  pwrupOn = false;

  document.getElementById("left").innerHTML = "Level: " + level;

  if (currentLevel < 7) {
  // load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("girl")) currentLocationOfHorse = i;
  } // for


  animateBoxes = document.querySelectorAll(".animate");

  animateEnemy(animateBoxes, 0, "right");
} else {
  gamePaused = true;
  changeVisibility("endscreen");
}
} // loadLevel

// animate enemy left to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {

  // exit function if no animation
  if (boxes.length <= 0) { return; }

  // update images
  if (direction == "right") {
    boxes[index].classList.add("mobRight");
  } else {
    boxes[index].classList.add("mobLeft");
  }

  // remove images from other boxes
  for (i = 0; i < boxes.length; i++){
    if (i != index){
      boxes[i].classList.remove("mobLeft");
      boxes[i].classList.remove("mobRight");
    } // if
  } // for

  if(invinc == false){
    if (boxes[index].className.includes("girl") || boxes[index].className.includes("awakened")) {
      if(health == 40) {
        health -= 40;
        document.getElementById("health").style.width = health + "px";
        death();
      } else {
      health -= 40;
      document.getElementById("health").style.width = health + "px";
      }
    }
  }

  // moving right
  if (direction == "right") {
    // turn around if hit right side
    if (index == boxes.length - 1){
      index--;
      direction = "left";
    } else {
      index++;
    }

  // moving left
  } else {
    // turn around if hit left side
    if (index == 0) {
      index++;
      direction = "right";
    } else {
      index--;
    }
  } // else

  currentAnimation = setTimeout(function() {
      animateEnemy(boxes, index, direction);
  }, 650);

} // animateEnemy

// game timer code
// code from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
setInterval(function () {
  if(gamePaused == false && gameStarted == true){
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  } else {
    return;
  }
}, 1000);

// resume game play
function resumeGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  invinc = false;
  gamePaused = false;

} // resumeGame

// pause game play
function pauseGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  invinc = true;
  gamePaused = true;
} // pauseGame

// start game play
function newGame() {
  changeVisibility("lightbox");
  changeVisibility("Menu");

  gamePaused = false;
  invinc = false;

  health = 200;
  document.getElementById("health").style.width = health + "px";
  totalSeconds = 0;
  currentLevel = 0;
  level = 0;
  clearTimeout(currentAnimation);
  loadLevel();
}

// replay after death
function reGame() {
  changeVisibility("lightbox");
  changeVisibility("deathScreen");

  gamePaused = false;
  invinc = false;


  health = 200;
  document.getElementById("health").style.width = health + "px";
  currentLevel = 0;
  level = 0;
  clearTimeout(currentAnimation);
  loadLevel();
}

// replay after death
function renewGame() {
  changeVisibility("endscreen");

  gamePaused = false;
  invinc = false;


  health = 200;
  document.getElementById("health").style.width = health + "px";
  totalSeconds = 0;
  currentLevel = 0;
  level = 0;
  clearTimeout(currentAnimation);
  loadLevel();
}

// starts game
function startGame() {
  changeVisibility("lore");

  gameStarted = true;
  loadLevel();
}

function instructions() {
  changeVisibility("titleMenu");
  changeVisibility("guide");
}

function lore() {
  changeVisibility("guide");
  changeVisibility("lore");
}

function death() {
  changeVisibility("lightbox");
  changeVisibility("deathScreen");
  gamePaused = true;
}

function changeVisibility(divID){
  var element = document.getElementById(divID);

  // if element exists, it is considered true
  if (element) {
    element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
  } // if

} // changeVisibility
