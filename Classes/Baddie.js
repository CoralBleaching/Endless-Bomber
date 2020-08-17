class Baddie extends Bomber {
  constructor(x, y, width, height, drawWidth, drawHeight, id) {
    super(x, y, width, height, drawWidth, drawHeight, 4);
    this.speed = 0.5;
    this.id = id;
    this.totalFrames = 5;
    this.pickOrientation();    
  }
  
  draw() {
    this.time++;
    let img = this.sprites[this.orientation][this.frame];
    // DRAWING BADDIE
    if (this.live) {
      // MIRRORING RIGHT FACING SIDE SPRITES FOR LEFT
      if (this.orientation == 3) { 
        push();
        scale(-1, 1);
        image(img, - this.pos.x - this.drawSize.x, this.pos.y, this.drawSize.x, this.drawSize.y);
        pop();
      // OTHER ORIENTATIONS ARE DRAWN REGULARLY
      } else {
        image(img, this.pos.x, this.pos.y, this.drawSize.x, this.drawSize.y);
      }
    // TINTING BADDIE RED IF KILLED (SAME AS EXPLODING BLOCKS)
    } else { 
      push();
      tint(250, this.tintLevel, this.tintLevel / 2, this.alphaLevel);
      this.time++;
      if (this.time % 4) {
        this.tintLevel += 4;
        this.alphaLevel -= 3;
      }
      if (this.orientation == 3) {
        push();
        scale(-1, 1);
        image(img, - this.pos.x - this.drawSize.x, this.pos.y, this.drawSize.x, this.drawSize.y);
        pop();
      } else {
        image(img, this.pos.x, this.pos.y, this.drawSize.x, this.drawSize.y);
      }
      pop();
    }
    
    push();
    fill(255, 0, 0, 100);
    rect(this.pos.x, this.pos.y , this.size.x, this.size.y);
    pop();    

  }
  
  pickOrientation() {
    this.orientation = Math.floor(Math.random() * 4);
  }
  
  setup() {
    this.sprites[0] = [];
    this.sprites[1] = [];
    this.sprites[2] = [];
    this.sprites[3] = [];
    for (let i = 0; i <= 5; i++) {
      this.sprites[0].push(loadImage('Sprites/Creep/Creep_B_f0' + i + '.png'));
      this.sprites[1].push(loadImage('Sprites/Creep/Creep_S_f0' + i + '.png'));
      this.sprites[2].push(loadImage('Sprites/Creep/Creep_F_f0' + i + '.png'));
      this.sprites[3].push(loadImage('Sprites/Creep/Creep_S_f0' + i + '.png'));
    }
    this.sprites[1].push(loadImage('Sprites/Creep/Creep_S_f06.png'));
    this.sprites[3].push(loadImage('Sprites/Creep/Creep_S_f06.png'));
  }
  
  /*
  update(orientation) {
    this.cycle();
    this.orientation = orientation;
    let speed = this.speed;
    while (speed > 0) {
      if (orientation == 0) {
        this.y -= speed;
        if (this.checkAllBlockCollisions()) {
          this.y += speed;
          speed -= 1;
        } else {
          this.y -= speed;
          return true;
        }
      } else if (orientation == 1) {
        this.x += speed;
        if (this.checkAllBlockCollisions()) {
          this.x -= speed;
          speed -= 1;
        } else {
          this.x += speed;
          return true;
        }
      } else if (orientation == 2) {
        this.y += speed;
        if (this.checkAllBlockCollisions()) {
          this.y -= speed;
          speed -= 1;
        } else {
          this.y += speed;
          return true;
        }
      } else if (orientation == 3) {
        this.x -= speed;
        if (this.checkAllBlockCollisions()) {
          this.x += speed;
          speed -= 1;
        } else {
          this.x -= speed;
          return true;
        }
      }
    }
    return false;
  }
  */
  
  walkCycle(tiles, bombs) {
    if (!this.update(tiles, bombs, this.orientation)) {
      this.pickOrientation();
    }
  }
  
}