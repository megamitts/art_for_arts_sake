// uses p5js2

let font;

async function setup() {
  createCanvas(400, 400);
  font = await loadFont('manbow.ttf');
  //noLoop();

}

function draw() {
	
  //console.log(mouseX,mouseY);
  background(220);
  noFill();
  
  textFont(font);
  textSize(80);
  text('COFFEE',15,75);
  fill(220);
  noStroke();
  rect(195,80, 50,50);
  
  strokeWeight(3);
  stroke(0);
  
  //hair
  beginShape();
  sv(160,140); //right cheek
  sv(148,133);
  sv(143,120); // top of right bob
  sv(151,118);
  sv(161,112);
  sv(160, 106);
  sv(161, 92);
  sv(192,67);
  sv(216,67);
    sv(237,78);
  sv(246,99);
  sv(246,121);
  sv(254,134);
  sv(242,143);
  sv(220,147);
  endShape();
  
  
  //face
  beginShape();
  sv(168,163); //chin
  sv(160,140); // to right cheek
  sv(163,120);
  sv(168,110);
  sv(172,92);
  sv(187,80);
  sv(202,91);
  sv(217,95);
  sv(225,105);
  sv(224,117);
  sv(221,122);
  sv(225,120); // ear
  sv(230,123);
  sv(232,128);
  sv(231,133);
  sv(228,137);
  sv(221,140);
  sv(221,142);
  sv(220,147);
  sv(211,156);
  sv(197,164);
  sv(187,167);
  sv(174,168); 
  sv(168,163);
  endShape();

  //neck right
  beginShape();
  sv(181,168);
  sv(182, 190);
  sv(184,195);
  sv(190,206);
  sv(188,216);
  
  
  
  
  
  endShape();
  
  // neck left
  beginShape();
  sv(216,154);
  sv(223,186);
  sv(235,191);
  
  
  endShape();
  
  //right shoulder
  beginShape();
   sv(185,197);
   sv(142,240);
  endShape();
  
  //right arm inner
  beginShape();
  sv(135,192);
  sv(139, 200);
  sv(140,224);
  sv(142, 300);
  sv(133,316);
  sv(120,314);
  
  sv(115,303);
   
  endShape();
  
  //right arm outer
  beginShape();
  
  sv(115,303);
  sv(127,208);
  
  endShape();
  
  //right arm inner
  beginShape();
  sv(143, 298);
  sv(167,261);
  endShape();
  
  
  //right hand
  beginShape();
  sv(127,208);
  sv(116, 194);
  sv(101, 188);
  sv(98, 180);
  sv(106, 170);
  sv(118, 165);
  sv(125, 165);
  sv(130,168);
  sv(130, 170);
  sv(128, 171);
  sv(118,173);
  sv(110,178);
  sv(115,180);
  sv(117,180);
  
  
  endShape();
  
  // finger under cig
  beginShape();
  sv(97,180);
  sv(99,162);
  sv(104,146);
  sv(106, 145);
  sv(108,145);
  sv(103,162);
  sv(105,170);
  endShape();
  
  //ring finger
  beginShape();
  sv(101,155);
  sv(98,154);
  sv(97,154);
  sv(97,167);
  endShape();
  
  
  //open dress
  beginShape();
  sv(188,216);
  sv(185,239);
  sv(191,269);
  sv(223,237);
  sv(236,191);
  endShape();
  
  //left arm outer
  beginShape();
  sv(238, 191);
  sv(252,197);
  sv(255,200);
  sv(266,212);
  sv(273,229);
  sv(289,280);
  sv(289,299);
  sv(287,307);
  sv(281,318);
  
  endShape();
  
  // left arm inner
  beginShape();
  sv(257,262);
  sv(261,287);
  sv(241,295);
  endShape();
  
  //left wrist and hand
  beginShape();
  sv(212,299);
  sv(164,302);
  sv(150, 296);
  
  sv(144,300);
  
  endShape();
  
  //right waist
  
  beginShape();
  sv(168,301);
  sv(165,290);
  sv(163,275);
  sv(164,268);
  
  endShape();
  
  
  
  
  
  
  // cigarette and holder
  
  line(138,184, 126,172);
  line(117,165, 75, 125);
  line(51,104, 63,115);
  
  
  //table
  line(120,319, 140,319);
  line(170,319, 280, 319);
  line(40, 336, 60,336);
  line(80, 336, 90, 336);
  line(100,336, 285, 336);
  line(305,336, 315, 336);
  line(335, 336, 355, 336);
  
  //cup
  beginShape();
  sv(215,319);
  sv(218,314);
  sv(211,295);
  
  endShape();

  ellipse(225,290,27,5);
  line(238,301, 243,301);
  line(243,301, 235,308);
  beginShape();
  sv(235,319);
  sv(232,314);
  sv(239,295);
  endShape();
  
  
  //signature

  drawCursiveM_p5js2(360, 380, 20)

}




function sv(x,y){
  splineVertex(x,y);
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
