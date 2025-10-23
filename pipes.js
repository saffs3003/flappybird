export default class Pipe {
  constructor(gameWidth, gameHeight, speed = 2) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 80;
    this.gap = 240;
    this.speed = speed;

    this.position = {
      x: gameWidth,
    };

    const minGapTop = 70;
    const maxGapTop = gameHeight - this.gap - 70;
    //maintain gap
    this.gapTop = Math.floor(
      Math.random() * (maxGapTop - minGapTop) + minGapTop
    );

    this.topPipeImg = new Image();
    this.bottomPipeImg = new Image();
    this.topPipeImg.src = "assets/pillarrr.png";
    this.bottomPipeImg.src = "assets/pillarrr.png";

    this.scored = false;
  }

  draw(ctx) {
    if (!this.topPipeImg.complete || !this.bottomPipeImg.complete) {
      // ctx.fillStyle = "green";

      ctx.fillRect(this.position.x, 0, this.width, this.gapTop);

      ctx.fillRect(
        this.position.x,
        this.gapTop + this.gap,
        this.width,
        this.gameHeight - (this.gapTop + this.gap)
      );

      return;
    }

    ctx.save();
    ctx.translate(this.position.x + this.width / 2, this.gapTop);
    //rotates cause upside down
    ctx.rotate(Math.PI);
    ctx.drawImage(this.topPipeImg, -this.width / 2, 0, this.width, this.gapTop);
    ctx.restore();

    ctx.drawImage(
      this.bottomPipeImg,
      this.position.x,
      this.gapTop + this.gap,
      this.width,
      this.gameHeight - (this.gapTop + this.gap)
    );
  }

  update(deltaTime) {
    this.position.x -= this.speed;
  }

  isOffScreen() {
    return this.position.x + this.width < 0;
  }

  getTopRect() {
    return {
      left: this.position.x,
      top: 0,
      right: this.position.x + this.width,
      bottom: this.gapTop,
    };
  }

  getBottomRect() {
    return {
      left: this.position.x,
      top: this.gapTop + this.gap,
      right: this.position.x + this.width,
      bottom: this.gameHeight,
    };
  }
}
