export default class Bird {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 60;
    this.height = 50;

    this.spriteWidth = 600;
    this.spriteHeight = 400;
    this.maxFrame = 4;
    this.frame = 0;
    this.staggeredFrames = 10;
    this.gameFrame = 0;

    this.position = {
      x: gameWidth / 4,
      y: gameHeight / 2,
    };
    this.velocity = 0;
    this.gravity = 0.3;
    this.lift = -6;

    this.image = new Image();

    this.image.src = "assets/bluebird.png";
    this.wingsFlap = new Audio("Everything/sfx_wing.wav");
  }

  draw(ctx) {
    const frameX =
      (Math.floor(this.gameFrame / this.staggeredFrames) % this.maxFrame) *
      this.spriteWidth;

    ctx.drawImage(
      this.image,
      frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.gameFrame++;
  }

  update(deltaTime) {
    this.velocity += this.gravity;
    this.position.y += this.velocity;

    if (this.position.y + this.height >= this.gameHeight) {
      this.position.y = this.gameHeight - this.height;
      this.velocity = 0;
    }

    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity = 0;
    }
  }

  moveUp() {
    this.velocity = this.lift;
    this.wingsFlap.play();
  }

  getRect() {
    return {
      left: this.position.x,
      top: this.position.y,
      right: this.position.x + this.width,
      bottom: this.position.y + this.height,
    };
  }
}
