let speed, angle;
let movers = [];
let circles = [];
class Circle {
  constructor(m, x, y, text, color='black', r=null) {
    this.p = createVector(x, y);
    this.pOriginal = createVector(x, y);
    this.m = m;
    this.r = (r === null) ? Math.cbrt(m) : r;
    this.text = text
    this.color = color
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.p.x, this.p.y, this.r);
    fill("black");
    textSize(this.r);
    text(this.text, this.p.x - this.r/4, this.p.y + this.r/4)
    // circle(this.p.x, this.p.y, this.r);
  }
}

function setup() {
  // Create particles
  hover = null;
  grabbed = null;
  createCanvas(windowWidth, windowHeight);
  background('#eaeaea');
  ellipseMode(RADIUS);
  // for (let i = 1; i <= 3; i++) {
  //   circles.push(new Circle(windowWidth - 100, i * 100, random(20, 10000)));
  // }
  i = 100
  j = 75
  circles.push(new Circle(2.2, windowWidth - 100, i + 0*j, 'u', 'red', 20));
  circles.push(new Circle (4.7, windowWidth - 100, i + 1*j, 'u', 'blue', 20));
  circles.push(new Circle (4.7, windowWidth - 100, i + 2*j, 'u', 'green', 20));
  circles.push(new Circle (4.7, windowWidth - 100, i + 3*j, 'd', 'red', 20));
  circles.push(new Circle (4.7, windowWidth - 100, i + 4*j, 'd', 'blue', 20));
  circles.push(new Circle (4.7, windowWidth - 100, i + 5*j, 'd', 'green', 20));
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
		// mover.edges();
		mover.show();
	})

  // Gravity
	// for (let i =0; i < movers.length; i++) {
	// 	for (let j = 0; j < movers.length; j++){
  //     if (i == j)
  //       continue
	// 		movers[i].attract(movers[j]);
	// 	}
	// }

	for (let i =0; i < movers.length; i++) {
		for (let j = 0; j < movers.length; j++){
      if (i == j)
        continue
			movers[i].attract(movers[j]);
		}
	}

  // for (var i = 0; i < movers.length - 1; i++) {
  //   for (var j = i + 1; j < movers.length; j++) {
  //     movers[i].checkCollisions(movers[j]);
  //   }
  // }
  //ball collisoin
  for (let i =0; i < movers.length -1; i++) {
    for(let j = i + 1; j < movers.length; j++) {
      movers[i].ballCollision(movers[j]) 
    }

    movers[i].edges()
    // wallCollision(objArray[i]);
  }
  
  if (movers.length > 0) movers[movers.length - 1].edges();

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
    let quark;
    if (grabbed.text === 'u') { // UpQuark
      quark = new upQuark(mouseX, mouseY, grabbed.color, vel);
    } else if (grabbed.text === 'd') {
      quark = new downQuark(mouseX, mouseY, grabbed.color, vel);
    }
    movers.push(quark);
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