let bg;
let mouseInfoShown = false;
let speed, angle;
let movers = [];
let circles = [];
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.p = createVector(x, y);
    this.pOriginal = createVector(x, y);
  }

  draw() {
    circle(this.p.x, this.p.y, this.r);
  }
}

function setup() {
  // Create particles
  hover = null;
  grabbed = null;
  bg = loadImage('img/bg.png');
  createCanvas(windowWidth, windowHeight);
  background(bg);
  ellipseMode(RADIUS);

  const particles = [
    { name: 'Proton', mass: 938, color: '#FF0000', isUnlocked: true },
  ];

  particles.forEach(function (particle, i) {
    circles.push({
      name: particle.name,
      color: particle.color,
      unlocked: particle.isUnlocked,
      circle: new Circle(windowWidth - 200, (i+1) * 100, particle.mass * 0.01),
    });
  });

  // Create buttons
  const btns = ['Restart', 'Settings', 'Hint', 'Learn'];

  btns.forEach(function (btn, i) {
    background(0);
    button = createImg('img/' + btn.toLowerCase() + '.png');
    button.position(50, (i + 1) * 100);
    button.style('cursor', 'pointer');
    button.mousePressed(window[btn.toLowerCase()]);
  });
}

function restart() {
  console.log('test');
}

function draw() {
  textSize(20);
  fill('#fff');
  text('Challenge 1: Particle Interactions', windowWidth * 0.1, 50);

  m = createVector(mouseX, mouseY);
  hover = null;
  for (let c of circles) {
    if (m.dist(c.circle.p) < c.circle.r && c.unlocked) {
      hover = c;
    }
  }
  background(bg);
  noStroke();

  // Create game area
  noFill();
  rect(windowWidth * 0.1, 0, windowWidth * 0.7, windowHeight);

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
    
    pColor = color(c.color);
    white = color('#fff');
    
    if (!c.unlocked) {
      pColor.setAlpha(100);
      white.setAlpha(100);
    }

    fill(pColor);
    c.circle.draw();
      
    fill(white);
    text(c.name, c.circle.x + c.circle.r + 10, c.circle.y + (c.circle.r / 2));
  }



	movers.map(mover => {
		// mover.applyForce(wind);
		mover.update();
		// mover.edges();
		mover.show();
	})

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
    if (!mouseInfoShown) {
      toastr.success('Particle speed and direction is detected by your mouse movements.', 'Info');
      mouseInfoShown = true;
    }
  }
}

function mouseReleased() {
  console.log("Speed: " , speed)
  console.log("Angle :", angle)
  if (isGameBoard(mouseX, mouseY)){
    grabbed.circle.p.set(grabbed.circle.pOriginal);
    vel = createVector(constrain(speed * Math.cos(angle), -5, 5), constrain(speed * Math.sin(angle), -5, 5));
    console.log(vel)
    movers.push(new Mover(20, mouseX, mouseY, 'black', grabbed.circle.r, vel));
    toastr.clear();
  }

  grabbed = null;
}

function mouseDragged() {
  if (grabbed) {
    grabbed.circle.p.add(createVector(movedX, movedY));
  }
}

function isGameBoard(x, y) {
  if(x < windowWidth * 0.1 && x > windowWidth * 0.8)
    return false;
  return true;
}

toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';
toastr.options.closeMethod = 'slideUp';

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 5000;