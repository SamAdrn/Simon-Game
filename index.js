// Global variables
let colors = ["green", "red", "yellow", "blue"];
let gameSeq = [];
let level = -1;
let count = 0;
let active = false;

$("#start").click(startGame);

$(".btn").click(function () {
  pressButton(this.id);

  if (active) {
    if (gameSeq[count] === this.id) {
      if (count === gameSeq.length - 1) {
        next();
      }
      count++;
    } else {
      gameOver();
    }
  }
});

function pressButton(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function startGame() {
  $(".btn").addClass("disable");
  $("#cover").css("background", "#f1faee");
  $("#cover").fadeIn(200).fadeOut(200);
  $("h3").html("&nbsp;");
  $("#start").hide();
  next();
}

function next() {
  active = false;
  $(".btn").addClass("disable");
  level++;
  $("h1").text(level);

  let color = colors[Math.floor(Math.random() * 4)];
  gameSeq.push(color);

  setTimeout(function () {
    gameSeq.forEach((c, i) => {
      setTimeout(() => {
        pressButton(c);
      }, i * 600);
    });
  }, 1000);

  setTimeout(function () {
    $(".btn").removeClass("disable");
    user = [];
    count = 0;
    active = true;
  }, level * 600 + 1000);
}

function gameOver() {
  active = false;
  $("#cover").css("background", "red");
  $("#cover").fadeIn(150).fadeOut(150);
  $("h1").text("Game Over");
  $("h3").text("Your Score: " + level);
  level = -1;
  gameSeq = [];
  $("#start").text("Restart");
  $("#start").show();
}
