  const levels = [
    // level 0
   ["flag", "rock", "", "", "",
   "fenceSide", "rock", "", "", "rider",
   "", "tree", "animate","animate","animate",
   "", "water", "", "", "",
   "", "fenceUp", "", "mountup", ""],

   // level 1
   ["rock", "rock", "rock", "rock", "rock",
   "", "water", "rider", "fenceUp", "",
   "flag", "fenceUp", "animate","animate", "mountleft",
   "", "water", "", "", "",
   "rock", "rock", "rock", "rock", "rock"],

   // level 2
   ["", "rock", "flag", "rock", "",
   "", "rock", "fenceSide", "rock", "rider",
   "", "", "animate","animate","animate",
   "", "", "", "", "",
   "water", "rock", "mountup", "rock", "water"]

   ];

const gridBoxes = document.querySelectorAll("#gameBoard div")
const noPassObstacles = ["rock", "tree", "water"];


var currentLevel = 0; // starting level
var riderOn = false; // is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;

// start game
window.addEventListener("load", function () {
    loadLevel();
});

// move horse
document.addEventListener("keydown", function (e) {

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
    if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
       tryToMove("down");
    }
    break;
  } // switch

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

  let newClass = "" // new class to switch to if move sucessful


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

  // if the obstacle is not passable, don't move
  if (noPassObstacles.includes(nextClass)) { return; }

  // if it's a fence, and there is no rider, don't move
  if (!riderOn && nextClass.includes("fence")) { return; }

  // if there is a fence, move two spaces with animation
  if (nextClass.includes("fence")) {

    // rider must be on to jump
    if (riderOn) {
      gridBoxes[currentLocationOfHorse].className = "";
      oldClassName = gridBoxes[nextLocation].className;

      // set values accoding to direction
      if (direction == "left") {
        nextClass = "fenceJumpLeft";
        nextClass2 = "mountedleft";
        nextLocation2 = nextLocation - 1;
      } else if (direction == "right") {
        nextClass = "fenceJumpRight";
        nextClass2 = "mountedright";
        nextLocation2 = nextLocation + 1;
      } else if (direction == "up") {
        nextClass = "fenceJumpUp";
        nextClass2 = "mounteup";
        nextLocation2 = nextLocation - widthOfBoard;
      } else if (direction == "down") {
        nextClass = "fenceJumpDown";
        nextClass2 = "mounteddown";
        nextLocation2 = nextLocation + widthOfBoard;
      }

      // show horse jumping
      gridBoxes[nextLocation].className = nextClass;

      setTimeout(function() {

        // set jump back to just a fence
        gridBoxes[nextLocation].className = oldClassName;

        // update current location of horse to be 2 spaces past take off
        currentLocationOfHorse = nextLocation2;

        // get class of box after the jump
        nextClass = gridBoxes[currentLocationOfHorse].className;

        // show horse and rider after landing
        gridBoxes[currentLocationOfHorse].className = nextClass2;

        // if next box is a flag, go up a level
        levelUp(nextClass);

      }, 350);
      return;

    } // if riderOn

  } // if class has fence

  // if there is a rider, add rider
  if (nextClass == "rider") {
    riderOn = true;
  }

  // if there is a bridge in the old location keep it
  if (oldClassName.includes("bridge")) {
    gridBoxes[oldLocation].className = "bridge";
  } else {
    gridBoxes[oldLocation].className = "";
  } // else

  // build name of new class
  newClass = (riderOn) ? "mounted" : "mount";
  newClass += direction;

  // if there is a bridge in the next location, keep it
  if (gridBoxes[nextLocation].classList.contains("bridge")) {
    newClass += " bridge";
  }

  // move 1 space
  currentLocationOfHorse = nextLocation;
  gridBoxes[currentLocationOfHorse].className = newClass;

  // if it is an enemy
  if (nextClass.includes("mob")) {
    document.getElementById("lose").style.display = "block";
    return;
  }

  // move up to next level if needed
  levelUp(nextClass);

} // tryToMove

// move up a level
function levelUp(nextClass) {
  if (nextClass == "flag" && riderOn) {
    document.getElementById("levelup").style.display = "block";
    clearTimeout(currentAnimation);
    setTimeout (function(){
      document.getElementById("levelup").style.display = "none";
      currentLevel++;
      loadLevel();
    }, 1000);
  }
} // levelUp

// load levels 0 - maxlevel
function loadLevel(){
  let levelMap = levels[currentLevel];
  let animateBoxes;
  riderOn = false;

  // load board
  for (i = 0; i < gridBoxes.length; i++) {
    gridBoxes[i].className = levelMap[i];
    if (levelMap[i].includes("mount")) currentLocationOfHorse = i;
  } // for

  animateBoxes = document.querySelectorAll(".animate");

  animateEnemy(animateBoxes, 0, "right");

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
  }, 750);
} // animateEnemy
