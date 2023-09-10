$(document).ready(function () {
  var buttonColours = ["red", "blue", "green", "yellow"];

  var gamePattern = [];
  var userClickedPattern = [];

  var started = false;
  var level = 0;

  function startGame() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
      $("#start-button").hide(); // Hide the start button
    }
  }

  // Detect both keypress and touchstart events to start the game
  $(document).on("keypress touchstart", function (event) {
    startGame();
  });

  // Add a click event for the start button
  $("#start-button").click(function () {
    startGame();
  });

  $(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  });

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key or Touch Anywhere to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }

  function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#start-button").show(); // Show the start button when the game is over
  }

  // Prevent default touch events
  document.addEventListener("touchstart", function (event) {
    event.preventDefault();
  });
});
