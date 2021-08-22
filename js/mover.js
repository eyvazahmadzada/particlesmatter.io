class Mover {
  // vel is a Vector (x, y)
  constructor(m, x, y, color='black', r=null, vel=null) {
    this.pos = createVector(x, y);
    this.vel = (vel === null) ? p5.Vector.random2D() : vel;
    this.acc = createVector(0, 0);
    this.m = m;
    this.r = (r === null) ? sqrt(this.m) : r;
    this.color = color
  }

  applyForce(force){
    this.acc.add(force);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    var height = windowHeight;
    var width = windowWidth * 0.8 - 5;
    if (this.pos.y >= height-this.r) {
      this.pos.y = height-this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= this.r + 70) {
      this.pos.y = this.r + 70;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width-this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r + windowWidth * 0.1) {
      this.pos.x = this.r + windowWidth * 0.1;
      this.vel.x *= -1;
    }
  }

  show() {
    fill(this.color);
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos)
    let distanceSq = constrain(force.magSq(), 25, 200);

    let G = 0.001;
    let strength = G * (this.m * mover.m) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  checkCollisions(mover) {
    console.log(p5.Vector.sub(this.pos, mover.pos).mag(), " : ", this.r + mover.r)
    if(p5.Vector.sub(this.pos, mover.pos).mag() < this.r + mover.r) {
      console.log("Collide")
      let distance = p5.Vector.sub(this.pos, mover.pos).mag();
      if (distance < 1)
        distance = 1
      let unit_x = (this.pos.x - mover.pos.x) / distance;
      let unit_y = (this.pos.y - mover.pos.y) / distance;

      this.pos.x = mover.pos.x + (mover.r + this.r + 1) * unit_x;
      this.pos.y = mover.pos.y + (mover.r + this.r + 1) * unit_y;
      // console.log("THis ", this.pos.x, " ", this.pos.y)
      // console.log("Mover ", mover.pos.x, " ", mover.pos.y)
      // if (this.pos.x <= mover.pos.x)
      //   this.pos.x = mover.pos.x - (this.r + mover.r)
      // else 
      //   this.pos.x = mover.pos.x + (this.r + mover.r)
      
      // if (this.pos.y <= mover.pos.y)
      //   this.pos.y = mover.pos.y - (this.r + mover.r)
      // else
      //   this.pos.y = mover.pos.y + (this.r + mover.r)
      this.vel.x *= -1
      this.vel.y *= -1
      mover.vel.x *= -1
      mover.vel.y *= -1 
      
      // let velX = this.vel.x
      // let velY = this.vel.y
      // this.vel.x *= - mover.vel.x * mover.m / this.m;
      // this.vel.y *= - mover.vel.y * mover.m / this.m;
      // console.log(velX, velY ," VS ", this.vel.x, this.vel.y)
      // mover.vel.x *=  velX * this.m / mover.m;
      // mover.vel.y *=  velY * this.m / mover.m;
    }
  }
}