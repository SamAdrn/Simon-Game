// Global variables
let colors = ["green", "red", "yellow", "blue"];
let game = [];
let user = [];
let level = -1;
let count = 0;
let active = true;

// Register click Event Listeners
$(".btn").on("click", function () {
  if (active) {
    pressButton(this.id);
    if (level === -1) {
      startGame();
    } else {
      user.push(this.id);
      check(count);
    }
  }
});

function startGame() {
  $("#cover").css("background", "#f1faee");
  $("#cover").fadeIn(200).fadeOut(200);
  $("h1").text(level);
  $("h3").html("&nbsp;");
  setTimeout(next(), 1000);
}

function check(count) {
  if (game[count] === user[count]) {
    console.log(user);
    console.log("success");
    if (game.length === user.length) {
      count = 0;
      setTimeout(function () {
        next();
      }, 1000);
      console.log("pattern complete");
    }
    count++;
  } else {
    gameOver();
  }
}

function gameOver() {
  $("#cover").css("background", "red");
  $("#cover").fadeIn(150).fadeOut(150);
  $("h1").text("Game Over");
  $("h3").text("Your Score: " + level);
  level = -1;
  count = 0;
  game = [];
  user = [];
}

// Simulate what will happen when a button is pressed.
function pressButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function playSequence(i) {
  setTimeout(function () {
    pressButton(game[i]);
    if (i++ < game.length) play(i);
  }, 700);
}

async function next() {
  active = false;

  let color = colors[Math.floor(Math.random() * 4)];
  game.push(color);
  console.log(game);

  playSequence();

  level++;
  $("h1").text(level);

  user = [];
  active = true;
}
