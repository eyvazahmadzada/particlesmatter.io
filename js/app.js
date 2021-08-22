let speed, angle;
let movers = [];
let circles = [];
class Circle {
  constructor(x, y, r) {
    this.p = createVector(x, y);
    this.pOriginal = createVector(x, y);
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
  for (let i = 1; i <= 3; i++) {
    circles.push(new Circle(windowWidth - 100, i * 100, random(5, 15)));
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
      speed = abs(winMouseX - pwinMouseX);
      
      angle = atan2(mouseY - pmouseY, mouseX - pmouseX);
    } else if (c == hover) fill(100);
    else {
      fill(0);
    }
    c.draw();
  }


	movers.map(mover => {
		// mover.applyForce(wind);
		mover.update();
		mover.edges();
		mover.show();
	})

	for (let i =0; i < movers.length; i++) {
		for (let j = 0; j < movers.length; j++){
      if (i == j)
        continue
			movers[i].attract(movers[j]);
		}
	}

  for (var i = 0; i < movers.length - 1; i++) {
    for (var j = i + 1; j < movers.length; j++) {
      movers[i].checkCollisions(movers[j]);
    }
  }
}

function mousePressed() {
  if (hover) {
    grabbed = hover;
  }
}

function mouseReleased() {
  console.log("Speed: " , speed)
  console.log("Angle :", angle)
  if (isGameBoard(mouseX, mouseY)){
    grabbed.p.set(grabbed.pOriginal);
    vel = createVector(constrain(speed * Math.cos(angle), -5, 5), constrain(speed * Math.sin(angle), -5, 5));
    console.log(vel)
    movers.push(new Mover(20, mouseX, mouseY, 'black', grabbed.r, vel));
  }

  grabbed = null;
}

function mouseDragged() {
  if (grabbed) {
    grabbed.p.add(createVector(movedX, movedY));
  }
}

function isGameBoard(x, y) {
  if(x > windowWidth - 400)
    return false;
  return true;
}