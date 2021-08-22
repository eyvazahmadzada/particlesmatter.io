class Mover {
  // vel is a Vector (x, y)
  constructor(m, x, y, text, color = "black", r = null, vel = null) {
    this.pos = createVector(x, y);
    this.vel = vel === null ? p5.Vector.random2D() : vel;
    this.acc = createVector(0, 0);
    this.m = m;
    this.r = r === null ? Math.cbrt(this.m) : r;
    this.color = color;
    this.text = text;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    if (this.acc.x >= 30)
      this.acc.x = 30
    if (this.acc.x >= 30)
      this.acc.y = 30
    if (this.vel.x >= 30)
      this.vel.x = 30
    if (this.vel.y >= 30)
      this.vel.y = 30
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
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r + windowWidth * 0.1) {
      this.pos.x = this.r + windowWidth * 0.1;
      this.vel.x *= -1;
    }
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
    fill("black");
    textSize(this.r);
    text(this.text, this.pos.x - this.r/4, this.pos.y + this.r/4)
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 20, 250);

    let G = 0;
    let strength = (G * (this.m * mover.m)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  distance(mover) {
    return p5.Vector.sub(this.pos, mover.pos).mag();
  }

  checkCollisions(mover) {
    console.log(
      p5.Vector.sub(this.pos, mover.pos).mag(),
      " : ",
      this.r + mover.r
    );
    if (p5.Vector.sub(this.pos, mover.pos).mag() < this.r + mover.r) {
      console.log("Collide");
      let distance = p5.Vector.sub(this.pos, mover.pos).mag();
      if (distance < 1) distance = 1;
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
      // this.vel.x *= -1
      // this.vel.y *= -1
      // mover.vel.x *= -1
      // mover.vel.y *= -1

      let velX = this.vel.x;
      let velY = this.vel.y;
      if (this.vel.x * mover.vel.x >= 0)
        this.vel.x = mover.vel.x =
          (this.vel.x + mover.vel.x) / (this.m + mover.m);
      else {
        this.vel.x *= (-1 * mover.vel.x * mover.m) / this.m;
        mover.vel.x *= (-1 * velX * this.m) / mover.m;
      }

      if (this.vel.y * mover.vel.y >= 0)
        this.vel.y = mover.vel.y =
          (this.vel.y + mover.vel.y) / (this.m + mover.m);
      else {
        this.vel.y *= (-1 * mover.vel.y * mover.m) / this.m;
        mover.vel.y *= (-1 * velY * this.m) / mover.m;
      }

      // this.vel.x *= - 1*mover.vel.x * mover.m / this.m;
      // this.vel.y *= - 1*mover.vel.y * mover.m / this.m;
      // mover.vel.x *=  -1*velX * this.m / mover.m;
      // mover.vel.y *=  -1*velY * this.m / mover.m;

      // this.vel.x = mover.vel.x = (this.vel.x + mover.vel.x)/(this.m + mover.m)
      // this.vel.y = mover.vel.y = (this.vel.y + mover.vel.y) / (this.m + mover.m)
    }
  }
  angle() {
    return Math.atan2(this.vel.y, this.vel.x);
  }
  speed() {
    return this.vel.mag();
  }

  ballCollision(mover) {
    let dist = this.distance(mover);
    if (dist < this.r + mover.r) {
      // console.log("Collsion : ", dist)
      let theta1 = this.angle();
      let theta2 = mover.angle();
      let phi = Math.atan2(mover.pos.y - this.pos.y, mover.pos.x - this.pos.x);
      let m1 = this.m;
      let m2 = mover.m;
      let v1 = this.speed();
      let v2 = mover.speed();

      let dx1F =
        ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
          2 * m2 * v2 * Math.cos(theta2 - phi)) /
          (m1 + m2)) *
          Math.cos(phi) +
        v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
      let dy1F =
        ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
          2 * m2 * v2 * Math.cos(theta2 - phi)) /
          (m1 + m2)) *
          Math.sin(phi) +
        v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
      let dx2F =
        ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
          2 * m1 * v1 * Math.cos(theta1 - phi)) /
          (m1 + m2)) *
          Math.cos(phi) +
        v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
      let dy2F =
        ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
          2 * m1 * v1 * Math.cos(theta1 - phi)) /
          (m1 + m2)) *
          Math.sin(phi) +
        v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

      this.vel.x = dx1F;
      this.vel.y = dy1F;
      mover.vel.x = dx2F;
      mover.vel.y = dy2F;

      this.staticCollision(mover);
    }
  }

  staticCollision(mover, emergency = false) {
    // ob1 = this
    // ob2 = mover
    let overlap = this.r + mover.r - this.distance(mover);
    let smallerObject = this.r < mover.r ? this : mover;
    let biggerObject = this.r > mover.r ? this : mover;

    if (emergency)
      [smallerObject, biggerObject] = [biggerObject, smallerObject];

    let theta = Math.atan2(
      biggerObject.pos.y - smallerObject.pos.y,
      biggerObject.pos.x - smallerObject.pos.x
    );
    smallerObject.pos.x -= overlap * Math.cos(theta);
    smallerObject.pos.y -= overlap * Math.sin(theta);

    if (this.distance(mover) < this.r + mover.r) {
      if (!emergency) this.staticCollision(mover, true);
    }
  }
}
