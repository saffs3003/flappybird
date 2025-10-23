import { flappy, game, ctx, GAME_WIDTH, GAME_HEIGHT } from "./script.js";
import { animate } from "./parallax.js";

let lastTime = 0;
const gameInst = document.querySelector(".game-instructions");
let bgMusic = new Audio("assets/consoleSound.mp3");
// let monitorOn = document.querySelector(".power-button");
let wasGameOver = false;
export function gameloop(timeStamp = 0) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (deltaTime > 100) deltaTime = 16;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  animate();

  if (game.gameStarted && !game.gameOver) {
    // monitorOn.classList.add("power-monitor--on");

    bgMusic.play();
    gameInst.style.display = "none";
    flappy.update(deltaTime);
  }

  if (game.gameOver) {
    bgMusic.pause();
    // monitorOn.classList.remove("power-monitor--on");
  }

  if (game.gameOver && !wasGameOver) {
    window.parent.postMessage(
      { type: "GAME_OVER", currentscore: game.score },
      "*"
    );
  }
  wasGameOver = game.gameOver;
  // Update game state
  game.update();

  // Draw pipes
  game.pipes.forEach((pipe) => pipe.draw(ctx));

  // Draw bird
  flappy.draw(ctx);

  // Draw UI elements
  game.drawScore(ctx);
  game.drawGameOver(ctx);

  game.drawStartScreen(ctx);
  // console.log(game.score);

  //looping the gameloop animation
  requestAnimationFrame(gameloop);
}
