/* 

#WCCChallenge. "Things fall apart" (but nothing breaks like a heart.) 5/4/26


Something I've been working on and off for a while now and thought it fit with this week's challenge so finally
finished it.


*/

let raindrops = [];
const numDrops = 100; // Number of raindrops



let timePassed = 0;
let LasFont; // by Måns Grebäck
let TarpFont; // by Barry Stock Fonts
const SC = 4.5; // heart scale factor

function preload(){
  LasFont = loadFont('LasEnter.ttf')
  TarpFont = loadFont('TarponMotel.ttf')
}


function setup() {
  createCanvas(500, 560);
  angleMode(DEGREES);

	for (let i = 0; i < numDrops; i++) {
    raindrops.push(new Raindrop());
  }
  
}

function draw() {
  //console.log(floor(mouseX), floor(mouseY));
  background(20);
  
  //Elvis, the KING!
  push();
  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor ="#FF13FfFF";
  scale(0.9)
  translate(140,0); 
  noFill();
  strokeWeight(5);
  stroke('#FF13F0');
  
  //chin to end of quiff
  beginShape();
  sv(238,130);
  sv(236,128);
  sv(231,131);
  sv(220,127);
  sv(222,120);
  sv(224,111);
  sv(220,103);
  //nose to hair
  sv(227,90);
  //quiff
  sv(224,88);
  sv(215,84);
  sv(208,78);
  sv(206,67);
  sv(218,56);
  sv(240,60);
  
  endShape();
  
  beginShape();
  //end of quiff
  sv(240,60);
  sv(245,65);
  sv(250,65)
  sv(255,60);
  
  //back of head
  
  sv(267,57);
  sv(283,74);
  sv(284,97);
  sv(280,107);
  
  //neck to left shoulder
  sv(305,127);
  //left shoulder
  sv(328,125);
  sv(330,127);
  sv(340,127);
  sv(346,124);
  //left arm outer
  sv(375,159);
  sv(394,193);
  sv(391,218);
  sv(370,262);
  endShape();
  
  //inner arm;
  beginShape();
  sv(347,182);
  sv(358,202);
  sv(350,257);
  endShape();
  
  //collar
  beginShape();
  sv(272,136);
  sv(268,131);
  sv(276,115);
  sv(289,129);
  sv(290,145);
  sv(292,150); 
  endShape();
  
  //open neck
  strokeWeight(3);
  beginShape();
  sv(237,134);
  sv(252,186);
  sv(269,139);
  endShape();
  
  //open chest1
  beginShape();
  sv(237,134);
  sv(238,180);
  sv(243,212);
  sv(255,229);
  endShape();
  
  //open chest 2;
  beginShape();
  sv(253,236);
  sv(262,213);
  sv(273,179);
  sv(280,140);
  
  endShape();
  
  strokeWeight(5);
  
  //right shoulder, rightarm
  beginShape();
  sv(224,142);
  sv(205,148);
  sv(190,198);
  sv(197,209);
  sv(199,211);
  sv(199,214);
  sv(189,219);
  sv(185,222);
  sv(164,230);
  endShape();
  
  //inner right arm
  beginShape();
  sv(177,248);
  sv(199,245);
  sv(211,243);
  endShape();
  
  //right hip
  beginShape();
  sv(223,242);
  sv(218,254);
  sv(223,275);
  sv(213,295);
  sv(217,316);
  
  endShape();
  
  //left body
  beginShape();
  sv(347,184);
  sv(342,208);
  sv(345,241);
  sv(344,252);
  sv(345,258);
  sv(350,283);
  sv(347,329)
  endShape();
  
  //right leg outer
  beginShape();
  sv(217,316);
  sv(195,382);
  sv(197,394);
  sv(185,434);
  sv(183,463);
  endShape();
  
  //right leg inner
  
  beginShape();
  sv(273,337);
  sv(242,391);
  sv(242,481);
  
  endShape();
  
  //left leg inner
  
  beginShape();
  sv(288,331);
  sv(297,384);
  sv(306,414);
  sv(309,453);
  sv(321,488);
  
  endShape();
  
  //left leg outer
  beginShape();
  sv(347,331);
  sv(351,362);
  sv(349,395);
  sv(348,405);
  sv(348,430);
  sv(371,474);
  endShape();
  
   drawingContext.shadowColor = 0;
  
  pop();
  
  //heartbreak hotel sign
  
  push();
  
  translate(200,200);
  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor ="#FFFf8FFF";
  scale(0.5);
  rotate(350);
  translate(-340,-300);
  textSize(80);
  
  textFont(LasFont);
  fill('#FFF01F');
  stroke(255);

	let signTime = floor(millis() / 700) % 2 === 1;
if(signTime){  
text('Heartbreak', 60, 130);
	text('H', 150, 210);
		
	} else{
		text('Heartbrea', 60, 130);
	}
  
  rect(20, 20, 490, 10, 20);

	let signTime2 = floor(millis() / 450) % 2 === 1;
	let signTime3 = floor(millis() / 800) % 2 === 1;
	if(signTime3){
	text('    otel', 150, 210);}
  rect(20, 250, 490, 10, 20);
	if(signTime2){
  rect(20, 35, 10, 150, 20,20,0,0);}
  rect(500, 35, 10, 210, 20);
  drawingContext.shadowColor = 0;
  pop();
  
  //vacancies
  push();
  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor ="#D734ffFF";
  textSize(80);
  textFont(TarpFont);
  fill('#C724B1');
  stroke(255);
  
  let time = floor(millis() / 150) % 2 === 1;
  let time2 = floor(millis() / 700) % 2 === 1;
  if (time){
  text('V', 20, 510);}
  text('A', 60, 510);
  text('C', 125, 510);
  text('A', 180, 510);
  text('N', 245, 510);
  if(time2){
  text('C', 305, 510);
  text('I', 360, 510);}
  text('E', 385, 510);
  text('S', 435, 510);
  
  drawingContext.shadowBlur = 0;
  pop();
  
  
  
  //broken heart - I did use AI for this bit as my maths skill is not so great and hearts are actually some funky maths!
  
  // Toggle state every 500ms → full 1-second cycle
  let broken = floor(millis() / 1500) % 2 === 1;

  push();
  angleMode(RADIANS);
  translate(150, 300);
  noFill();

  // Canvas shadow for outer neon bloom
  drawingContext.shadowBlur = 35;
  drawingContext.shadowColor = "rgba(255, 20, 50, 0.5)";

  // Layered strokes: wide+dim → narrow+bright (neon tube look)
  let layers = [
    [24, 255,   0,  35,  15],  // outermost soft glow
    [16, 255,   0,  40,  30],
    [10, 255,  15,  50,  65],
    [ 6, 255,  55,  75, 150],
    [ 3, 255, 170, 170, 255],  // bright hot core
  ];

  for (let [w, r, g, b, a] of layers) {
    strokeWeight(w);
    stroke(r, g, b, a);
    if (broken) drawBrokenHeart();
    else drawFullHeart();
  }

  drawingContext.shadowBlur = 0;
  angleMode(DEGREES);
  pop();

	push();
	// Draw and update each raindrop
  for (let drop of raindrops) {
    drop.update();
    drop.show();
  }
	pop();
}


// Raindrop class
class Raindrop {
  constructor() {
    this.reset();
  }

  reset() {
    // Random horizontal position
    this.x = random(-20,width);
    // Start above the visible area
    this.y = random(-height, 0);
    // Random length and speed for depth effect
    this.length = 2;
    this.speed = random(4, 8);
    // Slightly vary thickness
    this.thickness = map(this.speed, 4, 8, 1, 2.5);
  }

  update() {
    this.y += this.speed;
    this.x += this.speed/8;
    // Reset drop when it goes off screen
    if (this.y > height-50) {
      this.reset();
      this.y = random(-20, -5);
    }
  }

  show() {
    strokeWeight(this.thickness);
    stroke(180, 200, 255); // Light blue rain color
    line(this.x, this.y, this.x, this.y + this.length);
  }
}



//
function sv(x,y){
  splineVertex(x,y);
}

/* ---- parametric heart equations ---- */
function hx(t) {
  return 16 * pow(sin(t), 3) * SC;
}
function hy(t) {
  return -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) * SC;
}

/* ---- FULL HEART (closed spline loop) ---- */
function drawFullHeart() {
  let n  = 50;
  let dt = TWO_PI / n;

  beginShape();
  // guide point before start (wraps around for seamless closure)
  splineVertex(hx(-dt), hy(-dt));

  for (let i = 0; i <= n; i++) {
    splineVertex(hx(i * dt), hy(i * dt));
  }

  // guide point after end
  splineVertex(hx(TWO_PI + dt), hy(TWO_PI + dt));
  endShape();
}

/* ---- BROKEN HEART ---- */
function drawBrokenHeart() {
  let sep  = 14;   // horizontal gap
  let drop = 4;    // slight sag
  let tilt = 0.06; // rotation (radians)

  // ---- right half ----
  push();
  translate(sep, drop);
  rotate(tilt);
  drawHalfCurve(0, PI);     // smooth outer edge
  drawJaggedCrack();         // jagged break edge
  pop();

  // ---- left half ----
  push();
  translate(-sep, drop);
  rotate(-tilt);
  drawHalfCurve(PI, TWO_PI); // smooth outer edge
  drawJaggedCrack();          // same crack line, shifted with the half
  pop();
}

/* half of the heart outline drawn with splineVertex */
function drawHalfCurve(t0, t1) {
  let n = 25;

  beginShape();
  // duplicate first point as guide so curve starts exactly there
  splineVertex(hx(t0), hy(t0));

  for (let i = 0; i <= n; i++) {
    let t = t0 + (i / n) * (t1 - t0);
    splineVertex(hx(t), hy(t));
  }

  // duplicate last point as guide
  splineVertex(hx(t1), hy(t1));
  endShape();
}

/* jagged zigzag crack from centre-dip down to bottom tip */
function drawJaggedCrack() {
  let yTop = hy(0);   // centre dip
  let yBot = hy(PI);  // bottom tip

  beginShape();
  vertex( 0,  yTop);
  vertex( 8,  lerp(yTop, yBot, 0.09));
  vertex(-6,  lerp(yTop, yBot, 0.20));
  vertex(10,  lerp(yTop, yBot, 0.33));
  vertex(-8,  lerp(yTop, yBot, 0.46));
  vertex( 9,  lerp(yTop, yBot, 0.58));
  vertex(-6,  lerp(yTop, yBot, 0.70));
  vertex( 8,  lerp(yTop, yBot, 0.82));
  vertex(-4,  lerp(yTop, yBot, 0.92));
  vertex( 0,  yBot);
  endShape();
}


/* Optimising? I leave that to professionals! */
