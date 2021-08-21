function setup() {
  createCanvas(400, 420);
  noStroke();
}

function draw() {
  // red
  fill(255, 0, 0);
  rect(0, 0, 400, 60);

  // orange
  fill(255, 165, 0);
  rect(0, 60, 400, 60);

  // yellow
  fill(255, 255, 0);
  rect(0, 120, 400, 60);

  // green
  fill(0, 255, 0);
  rect(0, 180, 400, 60);

  // blue
  fill(0, 0, 255);
  rect(0, 240, 400, 60);

  // indigo
  fill(75, 0, 130);
  rect(0, 300, 400, 60);

  // violet
  fill(148, 0, 211);
  rect(0, 360, 400, 60);
}
