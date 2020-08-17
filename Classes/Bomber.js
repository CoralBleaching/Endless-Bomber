class Bomber extends Entity {
  constructor(x, y, width, height, drawWidth, drawHeight, totalFrames = 7) {
    super(x, y, width, height, drawWidth, drawHeight);
    this.live = true;
    this.orientation = 1;
    this.time = 0;
    this.frame = 0;
    this.totalFrames = totalFrames;
    this.sprites = [];
    this.speed = 1;
    this.power = 3;
    this.bombs = 2;
    this.bombCounter = 0;
    this.tintLevel = 0;
    this.alphaLevel = 250;
  }
  
  /*
  checkAllBlockCollisions() {
    let coord = checkBlockCollision(this);
    if (coord != null) {
      push();
      fill(0, 255, 0, 100);
      rect(coord[0] * 50, coord[1] * 50, 50, 50);
      pop();    
    }
    return checkBlockCollision(this) != null || checkBombCollisionBomber(this);
  }
  */
  
  cycle() {
    // UPDATING FRAME
    if (this.time % 4 == 0) {
      this.frame++;
    }
    if (this.time > 999) {
      this.time = 0;
    }
    if (this.frame >= this.totalFrames) {
      this.frame = 0;
    }
  }
  
  draw() {
    this.time++;
    let img = this.sprites[this.orientation][this.frame];
    // DRAWING BOMBER
    if (this.live) {
      // MIRRORING RIGHT FACING SIDE SPRITES FOR LEFT
      if (this.orientation == 3) { 
        push();
        scale(-1, 1);
        image(img, - this.pos.x - this.drawSize.x, this.pos.y - this.drawSize.y / 2, this.drawSize.x, this.drawSize.y);
        pop();
      // OTHER ORIENTATIONS ARE DRAWN REGULARLY
      } else {
        image(img, this.pos.x, this.pos.y - this.drawSize.y / 2, this.drawSize.x, this.drawSize.y);
      }
    // TINTING BOMBER RED IF KILLED (SAME AS EXPLODING BLOCKS)
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
        image(img, - this.pos.x - this.drawSize.x, this.pos.y - this.drawSize.y / 2, this.drawSize.x, this.drawSize.y);
        pop();
      } else {
        image(img, this.pos.x, this.pos.y - this.drawSize.y / 2, this.drawSize.x, this.drawSize.y);
      }
      pop();
    }
    
    push();
    fill(255, 0, 0, 100);
    rect(this.pos.x, this.pos.y , this.size.x, this.size.y);
    pop();    

  }

  setup() {
    this.sprites[0] = [];
    this.sprites[1] = [];
    this.sprites[2] = [];
    this.sprites[3] = [];
    for (let i = 1; i <= 7; i++) {
      this.sprites[0].push(loadImage('Sprites/Bomber/Bman_B_f0' + i + '.png'));
      this.sprites[1].push(loadImage('Sprites/Bomber/Bman_F_f0' + i + '-1.png'));
      this.sprites[2].push(loadImage('Sprites/Bomber/Bman_F_f0' + i + '.png'));
      this.sprites[3].push(loadImage('Sprites/Bomber/Bman_F_f0' + i + '-1.png'));
    }
  }
  
  /*
  // returns true if bomber was able to walk, otherwise false.
  // this will be useful when extending class for baddies.
  update(orientation) {
    this.cycle();
    this.orientation = orientation;
    let speed = this.speed;
    while (speed > 0) {
      if (orientation == 0) {
        this.pos.y -= speed;
        if (this.checkAllBlockCollisions()) {
          this.pos.y += speed;
          speed -= 1;
        } else {
          this.pos.y -= speed;
          return true;
        }
      } else if (orientation == 1) {
        this.pos.x += speed;
        if (this.checkAllBlockCollisions()) {
          this.pos.x -= speed;
          speed -= 1;
        } else {
          this.pos.x += speed;
          return true;
        }
      } else if (orientation == 2) {
        this.pos.y += speed;
        if (this.checkAllBlockCollisions()) {
          this.pos.y -= speed;
          speed -= 1;
        } else {
          this.pos.y += speed;
          return true;
        }
      } else if (orientation == 3) {
        this.pos.x -= speed;
        if (this.checkAllBlockCollisions()) {
          this.pos.x += speed;
          speed -= 1;
        } else {
          this.pos.x -= speed;
          return true;
        }
      }
    }
    return false;
  }
  */
  
}
