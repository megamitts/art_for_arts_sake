//p5js2

let noiseOffset = 5; 
let points = 200;    // Number of points around the circle
let baseRadius = 100; // Base radius of the circle

let font;
let stars = [];
let numStars = 30;

async function setup() {
	font = await loadFont('RobotoMono-Regular.ttf');
  createCanvas(510, 600);
  randomSeed(6);
  //stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),         // Small variation in size
      brightness: random(150, 255) // Slight variation in brightness
    });
  }
  noiseSeed(55);
  pixelDensity(1);
  //noprotect
}

function draw() {
  background(255);
  //console.log(mouseX,mouseY);
  stroke(0);
  strokeWeight(1);
  
  
  for (let s of stars) {
    stroke(0);
    fill(0);
    circle(s.x, s.y, s.size);
  }
  stroke(255);
  push();
  angleMode(RADIANS);
  translate(250, 380); // Move origin to center
  fill(255);
  strokeWeight(3);
  stroke(0);
  
  
  
  //meteor
  beginShape();
  
  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    
    // Use Perlin noise to vary the radius
    let noiseVal = noise(cos(angle) + 1, sin(angle) + 1, noiseOffset);
    let r = baseRadius + map(noiseVal, 0, 1, -20, 20);
    
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  
  endShape();
  }
  
  
  //crater
  
  crater(50, -60, 10);
  crater(-50, -10, 20);
  crater(0, 50, 15);
  crater(65, 2, 20);
  
  
  pop();
  
  
  
  
  
  
  //head
  push();
  angleMode(DEGREES);
  rotate(-5);
  translate(-20,20)
  
  rectMode(CENTER);
  stroke(0);
  strokeWeight(3);
  fill(255);
  rect(250,120,100,70,50,50,10,10);
  rect(250,80,40,10,50,50,0,0);
  rect(250,70,20,10,50,50,0,0);
  
  //right eye
  ellipse(225,115,20,30);
  
  noFill();
  arc(218,114,10,20,270,90);
  arc(250,114,10,20,270,90)
  
  //left eye
  ellipse(255,115,20,30);
  
  //mouth
  line(222,145,262,135);
  
  fill(255);
  //left antenna 
  rectMode(CORNER);
  rect(300,116,10,20)
  line(310,116,310,86);
  circle(310,86,10);
  //right antenna
  rect(200,116,-10,20);
  line(190,116,190,106);
  circle(190,106,10);
  
  pop();
  
  //neck
  stroke(0);
  strokeWeight(3);
  noFill();
  rectMode(CENTER);
  rect(250,160,30,10,50,50,50,50);
  rect(250,170,30,10,50,50,50,50);
  
  //body
  fill(255);
  rect(250,238,70,120,20,20,20,20);
  
  rectMode(CORNER);
  rect(215,194,50,80,0,20,20,0);
  circle(228,210,15);
  circle(228,230,15);
  
  //left leg
  circle(260,290, 20);
	fill(255);
  circle(255,300,20);
	
  circle(250,310,20);
  circle(250,320,20);
  circle(250,330,20)
  angleMode(DEGREES);
  arc(250,350,30,30,180,0, CHORD);
  
  //right leg
  noFill()
  arc(215,290,20,20,30,270);
  arc(205,294,20,20,52,280);
  arc(195,298,20,20,52,280);
  arc(185,304,20,20,52,278);
  fill(255);
  arc(157,318,30,30,250,90,CHORD);
  
  arc(175,312,20,20,50,260);
  
  //left arm
  circle(273,198,25);
  circle(273,205,20);
  circle(273,215,20);
  circle(270,225,20);
  circle(267,235,20);
  circle(257,230,20);
  circle(250,220,5);
  circle(250,230,7);
  circle(250,240,5);
  
  //right arm
  noFill();
  arc(216,195,25,25,95,295);
  noFill();
	
	arc(202,198,20,20,45,290);
  arc(193,201,20,20,45,265);
  arc(184,203,20,20,45,270);
  arc(175,203,20,20,60,290);
  arc(166,203,20,20,60,290);
  arc(160,190,8,10,40,10);
	noStroke();
	fill(0);
	textFont(font);
	textSize(30);
	
		 text('“The first ten million years',0,510);
		text(' were the worst.”',10,540);
  
drawCursiveM_p5js2(460, 550, 30)
}


function sv(x,y){
  
  splineVertex(x,y);
  
}


function crater(x, y, rad){
  
  let xAmp = x;
let yAmp = y;
  let radius = rad;

beginShape();
  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    
    // Use Perlin noise to vary the radius
    let noiseVal = noise(cos(angle) + 1, sin(angle) + 1, noiseOffset);
    let r = radius + map(noiseVal, 0, 1, -1, 5);
    
    let x = r * cos(angle) + xAmp;
    let y = r * sin(angle) + yAmp;
    vertex(x, y);
  }
  
  endShape(CLOSE);
  
}

function drawCursiveM_p5js2(x, y, size) {
  noFill();
  stroke(0);
  strokeWeight(size * 0.06);
  let h = size * 0.7;

  // Initial upstroke and first hump
  beginShape();
  splineVertex(x, y - 20);
  splineVertex(x + size * 0.05, y - h);
  splineVertex(x + size * 0.15, y - h);
  splineVertex(x + size * 0.25, y - h);
  splineVertex(x + size * 0.3, y);
  endShape();

  // Second hump
  beginShape();
  splineVertex(x + size * 0.3, y);
  splineVertex(x + size * 0.425, y - h);
  splineVertex(x + size * 0.575, y - h);
  splineVertex(x + size * 0.6, y);
  endShape();

  // Third hump
  beginShape();
  splineVertex(x + size * 0.6, y);
  splineVertex(x + size * 0.725, y - h);
  splineVertex(x + size * 0.875, y - h);
  splineVertex(x + size * 0.9, y);
  endShape();

  // Trailing exit stroke
  beginShape();
  splineVertex(x + size * 0.9, y);
  splineVertex(x + size * 0.95, y + size * 0.15);
  splineVertex(x + size * 1.1, y + size * 0.1);
  splineVertex(x + size * 1.15, y);
  endShape();
}
