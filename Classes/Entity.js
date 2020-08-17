class Entity {
  constructor(x, y, width, height, 
              drawWidth, drawHeight, 
              speed = null, orientation = null) {
    this.pos = createVector(x, y);
    this.size = createVector(width, height);
    this.center = createVector(x + width / 2, y + height / 2);
    this.drawSize = createVector(drawWidth, drawHeight);
    this.speed = speed;
    this.velocity = createVector(0, 0);
    this.orientation = orientation;
    this.onTopOfBombId = null;
  }
  
  checkBlockCollision(tiles, bombs, collisionQueue = []) {
    
    let flag = false;
    let grid = createVector(Math.floor(this.center.x / 50),
                            Math.floor(this.center.y / 50));
    let contactPoint, normalVector, contactTime;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let tile = tiles[grid.x + i][grid.y + j];
        if (tile != null) {
          if (this.rectangleRayCollision(this.velocity, tile,
                                         contactPoint, normalVector,
                                         contactTime))
            flag = true;
          collisionQueue.push({contactTime: contactTime,
                               contactPoint: contactPoint,
                               normalVector: normalVector});
        }
      }
    }
    
    bombs.forEach(bomb => {
      if (bomb.id == this.onTopOfBombId) return;
      if (this.rectangleRayCollision(this.velocity, bomb,
                                     contactPoint, normalVector,
                                     contactTime))
          flag = true;
      collisionQueue.push({contactTime: contactTime,
                           contactPoint: contactPoint,
                           normalVector: normalVector});
    });
    
    return flag;
    
  }
  
  checkGeneralCollision(entity) {
    
    let _1, _2, _3;
    return this.rectangleRayCollision(this.velocity, entity, _1, _2, _3);
    
  }
  
  cycle() {}
  
  draw() {}
  
  /* This is a transcript of code developed by Javidx9 in his video 
     "Arbitrary Rectangle Collision Detection & Resolution - Complete!"
     which can be found at https://www.youtube.com/watch?v=8JJ-4JgR7Dg.
     The source code and license can be found at https://github.com/OneLoneCoder/olcPixelGameEngine/blob/master/
     Videos/OneLoneCoder_PGE_Rectangles.cpp
  */
  rayCollision(directionVector, entity, contactPoint, normalVector, tHitNear) {
    
    normalVector = createVector(0, 0);
    let tNear = createVector(0, 0);
    let tFar = createVector(0, 0);
    
    // cache division
    let inverseDirectionVector = createVector(1 / directionVector.x, 1 / directionVector.y);
    
    // calculating intersection with rectangle bounding axes
    if  (directionVector.x == 0) {
      tNear.x = Infinity * Math.sign(entity.pos.x - this.center.x);
      tFar.x = Infinity * Math.sign(entity.pos.x + entity.size.x - this.center.x);
    }
    else {
      tNear.x = (entity.pos.x - this.center.x) * inverseDirectionVector.x;
      tFar.x = (entity.pos.x + entity.size.x - this.center.x) * inverseDirectionVector.x;
    }
    if  (directionVector.y == 0) {
      tNear.y = Infinity * Math.sign(entity.pos.y - this.center.y);
      tFar.y = Infinity * Math.sign(entity.pos.y + entity.size.y - this.center.y);
    }
    else {
      tNear.y = (entity.pos.y - this.center.y) * inverseDirectionVector.y;
      tFar.y = (entity.pos.y + entity.size.y - this.center.y) * inverseDirectionVector.y;
    }
 
    if (isNaN(tNear.x) || isNaN(tNear.y)) return false;
    if (isNaN(tFar.x) || isNaN(tFar.y)) return false;
    
    // sort distances
    if (tNear.x > tFar.x) [tNear.x, tFar.x] = [tFar.x, tNear.x];
    if (tNear.y > tFar.y) [tNear.y, tFar.y] = [tFar.y, tNear.y];
    
    // early rejection
    if (tNear.x > tFar.y || tNear.y > tFar.y) return false;
    
    // closest 'time' will be the first contact
    tHitNear = Math.max(tNear.x, tNear.y);
    
    // furthest 'time' is contact on opposite side of the target
    let tHitFar = Math.min(tFar.x, tFar.y);
    
    // reject if ray direction is pointing away from object
    if (tHitFar < 0) return false;
    
    // contact point of collision from parametric line equation
    if (isFinite(tHitNear))
      contactPoint = p5.Vector.add(this.center, p5.Vector.mult(directionVector, tHitNear));
    
    if (tNear.x > tNear.y) {
      if (inverseDirectionVector.x < 0) {
        normalVector = createVector(1, 0);
      }
      else {
        normalVector = createVector(-1, 0);
      }
    }
    else if (tNear.x < tNear.y) {
      if (inverseDirectionVector.y < 0) {
        normalVector = createVector(0, 1);
      }
      else {
        normalVector = createVector(0, -1);
      }
    }
    
    return true;
    
  }
  
  rectangleRayCollision(directionVector, entity, contactPoint, normalVector, contactTime) {
    
    // expand target rectangle by this' dimensions
    let expandedTarget = new Entity(entity.pos.x - this.size.x / 2,
                                    entity.pos.y - this.size.y / 2,
                                    entity.size.x + this.size.x,
                                    entity.size.y + this.size.y,
                                    entity.drawSize.x, entity.drawSize.y);
    
    if (this.rayCollision(directionVector, expandedTarget, contactPoint, normalVector, contactTime)) {
      push();
      fill(0, 255, 0, 150);
      rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
      pop();
      return contactTime >= 0 && contactTime < 1;
    }
    
    return false;
    
  }
  
  setup() {}
    
  solveBlockCollision(tiles, bombs) {
    
    let collisionQueue = [];
    if (this.checkBlockCollision(tiles, bombs, collisionQueue)) {
      collisionQueue.sort((a, b) => a.contactTime - b.contactTime);
      collisionQueue.forEach(tile => {
        this.velocity.add(
          p5.Vector.mult(
            p5.Vector.mult(
              tile.normalVector,
              createVector(Math.abs(this.velocity.x), Math.abs(this.velocity.y))),
            1 - tile.contactTime));
      });
      return true;
    }
    return false;
    
  }
  
  update(tiles, bombs, orientation) {
    
    this.orientation = orientation;
    this.cycle();
    switch(orientation) {
      case 0:
        this.velocity = createVector(0, -this.speed);
        break;
      case 1:
        this.velocity = createVector(this.speed, 0);
        break;
      case 2:
        this.velocity = createVector(0, +this.speed);
        break;
      case 3:
        this.velocity = createVector(-this.speed, 0);        
    }
    let flag = this.solveBlockCollision(tiles, bombs);
    this.pos.add(this.velocity);
    return flag;
  }
  
  
}