import InputHandler from "./inputHandle.js";
import Pipe from "./pipes.js";
import { gameloop } from "./gameloop.js";
import Bird from "./bird.js";

let canvas = document.getElementById("canvas");
// let windowHeight = window.innerHeight;
// let windowWidth = window.innerWidth;
// canvas.setAttribute("width", windowWidth);
// canvas.setAttribute("height", windowHeight);

// const GAME_WIDTH = windowWidth;
// const GAME_HEIGHT = windowHeight;
const GAME_WIDTH = 700;
const GAME_HEIGHT = 500;
let ctx = canvas.getContext("2d");
canvas.setAttribute("width", GAME_WIDTH);
canvas.setAttribute("height", GAME_HEIGHT);
let flappy = new Bird(GAME_WIDTH, GAME_HEIGHT);
let inputHandler = new InputHandler(flappy);

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const gameInstructions = document.querySelector(".game-instructions");

// Game state
const game = {
  pipes: [],
  frameCount: 0,
  pipeInterval: 180,
  score: 0,
  gameOver: false,
  gameStarted: false,
  pipeSpeed: 2,
  crashSound: new Audio("Everything/sfx_hit.wav"),

  update() {
    if (this.gameOver || !this.gameStarted) return;

    if (this.frameCount % this.pipeInterval === 0) {
      // Create new pipes with the current speed setting
      this.pipes.push(new Pipe(GAME_WIDTH, GAME_HEIGHT, this.pipeSpeed));
    }

    for (let i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].update();

      if (
        !this.pipes[i].scored &&
        this.pipes[i].position.x + this.pipes[i].width < flappy.position.x
      ) {
        this.score++;
        this.pipes[i].scored = true;

        // Speed increase every 5 points
        if (this.score % 5 === 0) {
          this.pipeSpeed += 0.3;
          console.log("New pipe speed: " + this.pipeSpeed);
        }
      }

      if (this.checkCollision(flappy, this.pipes[i])) {
        this.gameOver = true;
        restartButton.style.display = "block";
        this.crashSound.play();
      }

      if (this.pipes[i].isOffScreen()) {
        this.pipes.splice(i, 1);
      }
    }

    this.frameCount++;
  },

  checkCollision(bird, pipe) {
    const birdRect = bird.getRect();
    const topPipeRect = pipe.getTopRect();
    const bottomPipeRect = pipe.getBottomRect();

    // Check collision with top pipe
    if (
      birdRect.right > topPipeRect.left &&
      birdRect.left < topPipeRect.right &&
      birdRect.top < topPipeRect.bottom
    ) {
      return true;
    }

    // Check collision with bottom pipe
    if (
      birdRect.right > bottomPipeRect.left &&
      birdRect.left < bottomPipeRect.right &&
      birdRect.bottom > bottomPipeRect.top
    ) {
      return true;
    }

    //check with floor collision
    if (birdRect.bottom >= GAME_HEIGHT || birdRect.top <= 0) {
      return true;
    }

    return false;
  },

  start() {
    this.gameStarted = true;
    gameInstructions.style.display = "block";
    startButton.style.display = "none";
  },

  restart() {
    flappy = new Bird(GAME_WIDTH, GAME_HEIGHT);
    inputHandler = new InputHandler(flappy);
    this.pipes = [];
    this.frameCount = 0;
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = true;
    this.pipeSpeed = 2;
    restartButton.style.display = "none";
    gameInstructions.style.display = "block";
  },

  drawScore(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + this.score, 80, 40);
  },

  drawGameOver(ctx) {
    let finalscore = this.score;
    if (this.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.fillStyle = "#FFF";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 3 - 40);
      ctx.font = "30px Arial";
      ctx.fillText(
        `Your Score: ${this.score}`,
        GAME_WIDTH / 2,
        GAME_HEIGHT / 3
      );
      // ctx.textAlign = "left";
    }
  },

  drawStartScreen(ctx) {
    if (!this.gameStarted && !this.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = "#FFF";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.fillText("FLAPPY BIRD", GAME_WIDTH / 2, GAME_HEIGHT / 3);
    }
  },
};

startButton.addEventListener("click", () => {
  game.start();
});

restartButton.addEventListener("click", () => {
  game.restart();
});

export { flappy, game, ctx, GAME_WIDTH, GAME_HEIGHT };

// Start the game loop
gameloop();
