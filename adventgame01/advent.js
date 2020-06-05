  const levels = [
    // level 0
   ["flag", "rock", "", "", "",
   "fenceSide", "rock", "", "", "rider",
   "", "tree", "animate","animate","animate",
   "", "water", "", "", "",
   "", "fenceUp", "", "mountUp", ""],

   // level 1
   ["rock", "rock", "rock", "rock", "rock",
   "", "water", "", "animate", "",
   "flag", "fenceUp", "rider","animate","mountLeft",
   "", "water", "", "animate", "",
   "rock", "rock", "rock", "rock", "rock"],

   // level 2
   ["flag", "rock", "", "", "",
   "fenceSide", "rock", "", "", "rider",
   "", "tree", "animate","animate","animate",
   "", "", "", "", "",
   "water", "rock", "mountUp", "rock", "water"]

   ];

const gridBoxes = document.querySelectorAll("#gameBoard div")
var currentLevel = 0; // starting level
var riderOn = false; // is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level

// start game
window.addEventListener("load", function () {
    loadLevel();
});

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
