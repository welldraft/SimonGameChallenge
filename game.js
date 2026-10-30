// ---------------------------------------------------------------
// Simon Game - game.js
// ---------------------------------------------------------------

// Step 1: test that this file is linked to index.html
// (confirmed it works, so the alert is commented out)
// alert("hello");

// Step 2: the four colours and the computer-generated pattern
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// Step 4: the pattern the user builds by clicking the buttons
var userClickedPattern = [];

// Step 7: keep track of whether the game has started, and the level
var started = false;
var level = 0;


// ---------------------------------------------------------------
// Step 7: Start the game on the first key press
// ---------------------------------------------------------------
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// ---------------------------------------------------------------
// Step 4: Detect which button was clicked
// ---------------------------------------------------------------
$(".btn").click(function () {
  // The id of the clicked button ("green", "red", "yellow" or "blue")
  var userChosenColour = $(this).attr("id");

  // Step 5: play the sound of the clicked button
  playSound(userChosenColour);

  // Step 6: animate the clicked button
  animatePress(userChosenColour);

  // Only record and check answers while a game is running
  if (started) {
    userClickedPattern.push(userChosenColour);

    // Step 8: check the most recent answer (index of the last answer)
    checkAnswer(userClickedPattern.length - 1);
  }
});


// ---------------------------------------------------------------
// Step 8: Check the user's answer against the game sequence
// ---------------------------------------------------------------
function checkAnswer(currentLevel) {
  // Is the most recent user answer the same as the game pattern?
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Has the user finished their whole sequence for this level?
    if (userClickedPattern.length === gamePattern.length) {
      // Show the next sequence after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Step 9: Game Over

    // 1. Play the "wrong" sound
    playSound("wrong");

    // 2. Flash the "game-over" class on the body for 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // 3. Change the title
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Step 10: Restart the game
    startOver();
  }
}


// ---------------------------------------------------------------
// Step 2 & 3: Create and show the next step in the pattern
// ---------------------------------------------------------------
function nextSequence() {
  // Step 8: reset the user's pattern, ready for the next level
  userClickedPattern = [];

  // Step 7: increase the level and update the h1
  level++;
  $("#level-title").text("Level " + level);

  // Step 2: pick a random colour and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);   // 0, 1, 2 or 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Step 3: flash the chosen button...
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // ...and play its sound
  playSound(randomChosenColour);
}


// ---------------------------------------------------------------
// Step 5: Play the sound for a given name (a colour or "wrong")
// ---------------------------------------------------------------
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// ---------------------------------------------------------------
// Step 6: Animate a button press
// ---------------------------------------------------------------
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // Remove the "pressed" class after 100 milliseconds
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// ---------------------------------------------------------------
// Step 10: Restart the game
// ---------------------------------------------------------------
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
