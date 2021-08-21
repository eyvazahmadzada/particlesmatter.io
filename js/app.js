class Circle {
  constructor(x, y, r) {
    this.p = createVector(x, y);
    this.r = r;
  }

  draw() {
    circle(this.p.x, this.p.y, this.r);
  }
}

function setup() {
  // Create particles
  hover = null;
  grabbed = null;
  createCanvas(windowWidth, windowHeight);
  background('#eaeaea');
  ellipseMode(RADIUS);
  circles = [];
  for (let i = 1; i <= 3; i++) {
    circles.push(new Circle(windowWidth - 100, i * 100, random(10, 30)));
  }
}

function draw() {
  m = createVector(mouseX, mouseY);
  hover = null;
  for (let c of circles) {
    if (m.dist(c.p) < c.r) {
      hover = c;
    }
  }
  background('#eaeaea');
  noStroke();

  // Create game area
  fill('#fff');
  noStroke();
  rect(0, 0, windowWidth - 400, windowHeight);

  if (hover) cursor('grab');
  else cursor(ARROW);
  for (let c of circles) {
    if (c == grabbed) {
      fill(50);

      // Get speed
      var speed = abs(winMouseX - pwinMouseX);
      console.log('speed: ' + speed);

      var angle = atan2(mouseY - pmouseY, mouseX - pmouseX);
      console.log('direction:' + degrees(angle));
    } else if (c == hover) fill(100);
    else {
      fill(0);
    }
    c.draw();
  }
}

function mousePressed() {
  if (hover) {
    grabbed = hover;
  }
}

function mouseReleased() {
  grabbed = null;
}

function mouseDragged() {
  if (grabbed) {
    grabbed.p.add(createVector(movedX, movedY));
  }
}
