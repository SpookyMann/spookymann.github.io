// global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

document.addEventListener('keydown', function(e) {
    console.log("key down " + e.keyCode);

});

document.addEventListener('keyup', function(e) {
    console.log("key up " + e.keyCode);

});
