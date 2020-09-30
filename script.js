
var timer;
var durTime;
var elaTime;
var i;

var nameData = [];
var timeData = [];

var time;
var nTime;
var name;
var duration = 0;
var durSec = 0;
var durMin = 0;
var durHr = 0;
var elapsed = 0;
var elaSec = 0;
var elaMin = 0;
var elaHr = 0;
var seconds;
var minutes;
var nSec;
var nMin;

var rounds = 0;
var maxround = 0;

var pause = false;
var started = false;

// code from https://codepen.io/PeteTalksWeb/pen/eJQbGo?editors=1111 modified by me
// for the interval timer to work
function intTimer() {
  // makes sure timer shows the proper values
  if (seconds < 10) {
    document.getElementById("timer").innerHTML = minutes + ":" + "0" + seconds;
  } else if (seconds < 60) {
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
  }

  //
  if (seconds == 0 && minutes > 0) {
    minutes--;
    seconds = 60;
  }

  // checks if there is time left and moves to next round if there is none
  if (seconds > 0) {
    seconds--;
  } else if (rounds < maxround) {
    rounds++;
    time = timeData[rounds - 1];
    nTime = timeData[rounds];
    nMin = Math.floor(nTime / 60);
    nSec = nTime % 60;

    document.getElementById("round").innerHTML = rounds + "/" + maxround;
    if (seconds < 10) {
      seconds = "0" + time - minutes * 60;
    } else if (seconds < 60) {
      seconds = time - minutes * 60;
    }

    // shows current and next intervals
    document.getElementById("currentName").innerHTML = nameData[rounds - 1];
    if (seconds < 10) {
      // checks for single digits
      document.getElementById("currentTime").innerHTML =
        minutes + ":" + "0" + seconds;
    } else {
      document.getElementById("currentTime").innerHTML =
        minutes + ":" + seconds;
    }

    if (rounds < maxround) {
      document.getElementById("nextName").innerHTML = nameData[rounds];
      if (nSec < 10) {
        // checks for single digits
        document.getElementById("nextTime").innerHTML = nMin + ":" + "0" + nSec;
      } else {
        document.getElementById("nextTime").innerHTML = nMin + ":" + nSec;
      }
    } else {
      document.getElementById("nextName").innerHTML = " ";
      document.getElementById("nextTime").innerHTML = " ";
    }
  } else {
    // checks if user has reached the final round and ends timer
    clearInterval(timer);
    clearInterval(durTime);
    clearInterval(elaTime);

    // clears intervals
    document.getElementById("currentName").innerHTML = " ";
    document.getElementById("currentTime").innerHTML = " ";
    document.getElementById("nextName").innerHTML = " ";
    document.getElementById("nextTime").innerHTML = " ";
  }
}

// for the interval timer to work
function durTimer() {
  // makes sure timer shows the proper values
  durHr = Math.floor(duration / 3600);
  durMin = Math.floor((duration - durHr * 3600) / 60);
  durSec = duration % 60;

  // checks to see if int is single digit
  if (durSec < 10) {
    durSec = "0" + (duration % 60);
  }

  if (durMin < 10) {
    durMin = "0" + Math.floor((duration - durHr * 3600) / 60);
  }

  if (durHr < 10) {
    durHr = "0" + Math.floor(duration / 3600);
  }

  // updates duration time and number of integers
  document.getElementById("duration").innerHTML =
    "Duration: " + durHr + ":" + durMin + ":" + durSec;

  if (seconds > 0) {
    duration--;
  }
}

// for the interval timer to work
function elaTimer() {
  // makes sure timer shows the proper values
  elaHr = Math.floor(elapsed / 3600);
  elaMin = Math.floor((elapsed - elaHr * 3600) / 60);
  elaSec = elapsed % 60;

  // checks to see if int is single digit
  if (elaSec < 10) {
    elaSec = "0" + (elapsed % 60);
  }

  if (elaMin < 10) {
    elaMin = "0" + Math.floor((elapsed - elaHr * 3600) / 60);
  }

  if (elaHr < 10) {
    elaHr = "0" + Math.floor(elapsed / 3600);
  }

  // updates elapsed time and number of integers
  document.getElementById("elapsed").innerHTML =
    "Elapsed: " + elaHr + ":" + elaMin + ":" + elaSec;

  if (seconds > 0) {
    elapsed++;
  }
}

// creates interval and stores info
function intervalAdder() {
  if (
    document.getElementById("name").value == "" ||
    document.getElementById("time").value == ""
  ) {
    changeVisibility("warning");
    return;
  }

  // pushes user inputs into array
  nameData.push(document.getElementById("name").value);
  timeData.push(document.getElementById("time").value);

  // adds number of intervals
  maxround++;

  // adds and calculates total duration of all integers
  duration += parseInt(document.getElementById("time").value);
  durHr = Math.floor(duration / 3600);
  durMin = Math.floor((duration - durHr * 3600) / 60);
  durSec = duration % 60;

  // checks to see if int is single digit
  if (durSec < 10) {
    durSec = "0" + (duration % 60);
  }

  if (durMin < 10) {
    durMin = "0" + Math.floor((duration - durHr * 3600) / 60);
  }

  if (durHr < 10) {
    durHr = "0" + Math.floor(duration / 3600);
  }

  // updates duration time and number of integers
  document.getElementById("duration").innerHTML =
    "Duration: " + durHr + ":" + durMin + ":" + durSec;
  
  // hides warning if on
  if(document.getElementById("warning").className == "unhidden"){
    changeVisibility("warning");
  }

  document.getElementById("round").innerHTML = rounds + "/" + maxround;
}

// to start timer
function start() {
  if (maxround == 0) {
    // makes sure user has entered intervals
    return;
  }

  if (started == false) {
    started = true;

    // checks if user has entered a valid input
    if (
      document.getElementById("time").value < 0 ||
      document.getElementById("time").value == ""
    ) {
      document.getElementById("timer").innerHTML =
        "Please enter a valid number";
      return;
    } else {
      // hides start button and caches inputs
      //document.getElementById("start").className = "hidden";

      rounds++;
      document.getElementById("round").innerHTML = rounds + "/" + maxround;

      time = timeData[0];
      nTime = timeData[1];

      // math to convert seconds into minutes and seconds
      minutes = Math.floor(time / 60);
      seconds = time % 60;

      nMin = Math.floor(nTime / 60);
      nSec = nTime % 60;

      // shows current and next intervals
      document.getElementById("currentName").innerHTML = nameData[0];
      if (seconds < 10) {
        // checks for single digits
        document.getElementById("currentTime").innerHTML =
          minutes + ":" + "0" + seconds;
      } else {
        document.getElementById("currentTime").innerHTML =
          minutes + ":" + seconds;
      }

      if (rounds < maxround) {
        document.getElementById("nextName").innerHTML = nameData[rounds];
        if (nSec < 10) {
          // checks for single digits
          document.getElementById("nextTime").innerHTML =
            nMin + ":" + "0" + nSec;
        } else {
          document.getElementById("nextTime").innerHTML = nMin + ":" + nSec;
        }
      } else {
        document.getElementById("nextName").innerHTML = " ";
        document.getElementById("nextTime").innerHTML = " ";
      }
    }

    elaTime = window.setInterval(function() {
      elaTimer();
    }, 1000); // every second
    
    durTime = window.setInterval(function() {
      durTimer();
    }, 1000); // every second

    timer = window.setInterval(function() {
      intTimer();
    }, 1000); // every second
  }

  // code for unpausing the timers
  if (pause == true) {
    elaTime = window.setInterval(function() {
      elaTimer();
    }, 1000); // every second
    
    durTime = window.setInterval(function() {
      durTimer();
    }, 1000); // every second

    timer = window.setInterval(function() {
      intTimer();
    }, 1000); // every second
    
    pause = false;
  }
}

// pauses timers
function stop() {
  if(started == true){
  clearInterval(timer);
  clearInterval(durTime);
  clearInterval(elaTime);
  pause = true;
  }
}

// clears timer
function clearIntervals() {
  console.log("worked");
  // clears arrays
  timeData.splice(0, timeData.length);
  nameData.splice(0, nameData.length);

  // clears intervals, time, and rounds and restarts timer
  clearInterval(timer);
  clearInterval(durTime);
  clearInterval(elaTime);
  duration = 0;
  elapsed = 0;
  rounds = 0;
  maxround = 0;
  pause = false;
  started = false;

  document.getElementById("currentName").innerHTML = " ";
  document.getElementById("currentTime").innerHTML = " ";
  document.getElementById("nextName").innerHTML = " ";
  document.getElementById("nextTime").innerHTML = " ";
  document.getElementById("timer").innerHTML = "0" + ":" + "0" + "0";
  document.getElementById("duration").innerHTML =
    "Duration: " + "00" + ":" + "00" + ":" + "00";
  document.getElementById("elapsed").innerHTML =
    "Elapsed: " + "00" + ":" + "00" + ":" + "00";
  document.getElementById("round").innerHTML = rounds + "/" + maxround;
}

// change the visibility of divID
function changeVisibility(divID) {
  var element = document.getElementById(divID);

  // if element exists, switch it's class
  // between hidden and unhidden
  if (element) {
    element.className = element.className == "hidden" ? "unhidden" : "hidden";
  } // if
} // changeVisibility

// display light box with interval adder on click
function toggleCreator() {
  changeVisibility("lightbox");
  changeVisibility("intervalCreator");
  document.getElementById("warning").className = "hidden";
} // displayLightBox

// service worker code
if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("service-worker.js")
            .then(registration => {
              console.log("Service Worker is registered", registration);
            })
            .catch(err => {
              console.error("Registration failed:", err);
            });
        });
      }