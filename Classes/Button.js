class Button {
  constructor(x, y, width, height, text, fontSize) {
    this.pos = createVector(x, y);
    this.size = createVector(width, height);
    this.text = text;
    this.fontSize = fontSize;
  }
  
  mouseHovering() {
    if (mouseX >= this.pos.x && mouseX <= this.pos.x + this.size.x) {
      if (mouseY >= this.pos.y && mouseY <= this.pos.y + this.size.y)
        return true;
    }
  }
  
  draw() {
    push();
    noFill();
    if (this.mouseHovering()) {
      stroke('blue');
      rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    } else {
      stroke('white');
      rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
      noStroke();
    }
    textAlign(CENTER, CENTER);
    fill('white');
    textSize(this.fontSize);
    text(this.text, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
    pop();
  }
  
}