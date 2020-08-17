class Flame extends Entity {
  constructor(x, y, width, height, drawWidth, drawHeight) {
    super(x, y, width, height, drawWidth, drawHeight);
    this.sprites = [];
    this.time = 0;
    this.frame = 0;
    this.scale = 0.8;
    this.increments = [0.1, 0.1, 0.1, 0.1, -0.1, -0.1, -0.1, -0.1];
  }
  
  draw() {
    this.time++;
    if (this.time % 4 == 0) {
      this.frame++;
    }
    if (this.frame >= 4)
      this.frame = 0;
    image(this.sprites[this.frame], this.pos.x, this.pos.y, this.drawSize.x, this.drawSize.y);
  }
  
  setup() {
    for (let i = 0; i < 5; i++) {
      this.sprites.push(loadImage('Sprites/Flame/Flame_F0' + i + '.png'));
    }
  }
  
}