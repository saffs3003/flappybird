let gamespeed = 1.5;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = 700;
canvas.height = 500;

const width = 700;
const height = 500;
// const width = canvas.width;
// const height = canvas.height;

const background1 = new Image();
background1.src = "../assets/background.png";

const background3 = new Image();
background3.src = "../assets/3.png";

const background4 = new Image();
background4.src = "../assets/4.png";

const background5 = new Image();
background5.src = "../assets/5.png";

const background6 = new Image();
background6.src = "../assets/6.png";

class Layer {
  constructor(
    image,
    speedModifier,
    customHeight = null,
    customY = 0,
    opacity = 1.0
  ) {
    this.image = image;
    this.speedModifier = speedModifier;
    this.opacity = opacity;
    this.customHeight = customHeight;
    this.customY = customY;

    this.speed = gamespeed;
    this.scrollX = 0;

    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.customHeight || this.image.height;
      this.y = this.customY;

      this.tiles = Math.ceil(width / this.width) + 2;
    };
  }

  update() {
    this.speed = gamespeed * this.speedModifier;
    this.scrollX -= this.speed;

    if (this.scrollX <= -this.width) {
      this.scrollX += this.width;
    }
  }

  draw() {
    if (!this.width) return;

    ctx.globalAlpha = this.opacity;
    for (let i = 0; i < this.tiles; i++) {
      ctx.drawImage(
        this.image,
        this.scrollX + i * this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }
}

//background,purple building,violet building,blue builing,front detail builing
const layer1 = new Layer(background1, 0.02, height, 0, 0.8);
const layer3 = new Layer(background3, 0.13, 550, height - 550, 0.55);
const layer4 = new Layer(background4, 0.19, 450, height - 450, 0.7);
const layer5 = new Layer(background5, 0.4, 400, height - 400, 0.8);
const layer6 = new Layer(background6, 0.6, 300, height - 300, 0.9);

const backgroundObjects = [layer1, layer3, layer4, layer5, layer6];

export function animate() {
  ctx.clearRect(0, 0, width, height);
  backgroundObjects.forEach((layer) => {
    layer.update();
    layer.draw();
  });
}
