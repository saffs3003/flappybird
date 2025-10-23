export default class InputHandler {
  constructor(flappy) {
    this.handleKeyDown = (event) => {
      if (event.keyCode === 32) {
        flappy.moveUp();
      }
    };

    this.handleClick = (event) => {
      flappy.moveUp();
    };

    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("click", this.handleClick);

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("click", this.handleClick);
  }
}
