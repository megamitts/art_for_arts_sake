// use p5js 2

let font;

async function setup() {
  createCanvas(400, 600);
  font = await loadFont('decondol.ttf');
  angleMode(DEGREES);
}

function draw() {
  //console.log(mouseX,mouseY);
  background(220);
  
  push();
  drawCursiveM_p5js2(340, 550,25);
  pop();
  
  fill(0,20);
  
  textFont(font);
  textSize(100);
  text('DANCE',100,100);
  
  push();
  fill(0);
  // stick figure version
  //line(200, 60, 200, 560); //body length
  //line(170,130,230,130); //head
  //line(180, 150, 220,150); //neck
  //line(200,410, 320, 410); // left leg
  //line(260,150,350,320); //left arm
  //line(140,150,160,320); // right arm
  
  strokeWeight(2);
  
  //hat
  
  arc(200,70,60,5,180,0,CHORD);
  noFill();
  arc(200,70,60,50,180,0);
  arc(200,70,60,53,180,300);
  triangle(217,39,218,56,227,39);
  line(226,43,234,47);
  line(234,46,221,52);
  
  
  //face
  beginShape();
  sv(180,75);
  sv(178,80);
  sv(180,95);
 
  sv(192,115);
  sv(199,118);
  sv(209,110);
  sv(213,105);
  endShape();
  
  //hair
  beginShape();
  sv(170,70);
  sv(173,80);
  sv(169,89);
  endShape();
  
  beginShape();
  sv(174,81);
  sv(174,94);
  sv(167,104);
  sv(178,97);
  endShape();
  
  beginShape();
  sv(179,78);
  sv(191,80);
  sv(198,73);
  sv(197,80);
  sv(213,78);
  sv(220,72);
  sv(220,86);
  sv(212,94);
  sv(220,92);
  sv(225,85);
  sv(231,71);
  endShape();
  
  //neck right
  beginShape();
  sv(188,114);
  sv(185,129);
  sv(177,135);
  endShape();
  
  //neck left
  beginShape();
  sv(215,97);
  sv(218,117);
  sv(229,126);
  endShape();
  
  //right shoulder
  beginShape();
  sv(177,135);
  sv(152,133);
  sv(144,136);
  sv(140,150);
  endShape();
  
  //left shoulder
  beginShape();
  sv(229,126);
  sv(248,128);
  sv(260,150);
  endShape();
  
  //left arm
  beginShape();
  sv(260,150);
  sv(274,186);
  sv(295,216);
  sv(322,275);
     sv(326,293);
  endShape();
  
  //left arm inner
  beginShape();
  sv(240,175);
  sv(244,172);
  sv(254,194);
  sv(289,255);
  sv(315,293);
  
  endShape();
  
  //left hand
  beginShape();
  sv(315,293);
  sv(328, 317);
  sv(332,319);
  sv(331,310);
   sv(348,310);
  sv(350,307);
  sv(338,305);
  sv(337,304);
  sv(338,302);
  sv(352,301); //middle finger
  sv(354,298);
  sv(352,297);
  sv(338,296);
  sv(350,295);
  sv(351,293);
  sv(350,291);
  sv(338,291);
  sv(344,285);
  sv(345,283);
  sv(344,281);
  sv(327,293);
  
  endShape();
  
  
  // dress neck
  beginShape();
  sv(178,135);
  sv(198,140);
  sv(205,140);
  sv(228,126);
  endShape();
  
  //dress left
  beginShape();
  sv(228,127);
  sv(232,155);
  sv(241,184);
  endShape();
  beginShape();
  sv(241,184);
  sv(240,193);
  endShape();
  beginShape();
  sv(240,193);
  sv(232,277);
  sv(229,359);
  endShape();
  
  //dress right
  beginShape();
  sv(147,235);
  sv(140,265);
  sv(140,302);
  endShape();
  beginShape();
  sv(140,310);
  sv(142,336);
  sv(138,360);
  endShape();
  
  //dress hem
  beginShape();
  sv(138,360);
  sv(165,354);
  sv(200,374);
  sv(229,359);
  endShape();
  
  beginShape();
  sv(140,350);
  sv(165,344);
  sv(200,364);
  sv(229,349);
  endShape();
  
  arc(140,354,5,5,270,130);
  circle(149,351,5);
  circle(160,348,5);
  circle(171,351,5);
  circle(182,359,5);
  circle(193,366,5);
  circle(204,368,5);
  circle(214,364,5);
  circle(225,357,5);
  
  
  //inner right arm
  line(178,135, 169, 173); // dress
  beginShape();
  sv(169,173);
  sv(169,305);
  endShape();
  
  //outer right arm
  beginShape();
  sv(140,150);
  sv(147,223);
  sv(161,302);
  endShape();
  
  // right hand
  
  beginShape();
  sv(161,302);
  sv(146,304);
  sv(136,307);
  sv(141,311);
  sv(150,309);
  
  sv(152,320);
  sv(154,322);
  sv(156,319);
  sv(157,311);
  sv(164,313);
  sv(160,318);
  sv(162,319);
  sv(169,313);
  
sv(169,305);
  endShape();
  
  //right leg outer
  beginShape();
  sv(151,356);
  sv(145,423);
  sv(164,507);
  
  endShape();  
  
  //right leg inner
  beginShape();
  sv(189,370);
  sv(185,390);
  sv(187,415);
  
  sv(176,502);
  
  endShape();
  
  //right shoe
  beginShape();
  sv(164,507);
  sv(166,530);
  
  sv(176,556);
  sv(188,530);
  sv(176,502);
  endShape();
  
  //left leg outer
  beginShape();
  sv(191,371);
  sv(200,410);
  sv(236,400);
  endShape();
  line(236,400,320,360);
  
  //left leg inner
  line(226,362,220,383);
  beginShape();
  sv(220,383);
  sv(240,365);
  sv(280,368);
  endShape();
  
  //left shoe
  beginShape();
  sv(280,368);
  sv(278,360);
  sv(282,355);
  sv(282,349);
  sv(287,351);
  sv(288,359);
  sv(295,351);
  sv(320,360);
  endShape();
  
  //choker
  circle(200,128,10)
  beginShape();
  sv(188,123);
  sv(200,123);
  sv(217,113);
  endShape();
  beginShape();
  sv(186,130);
  sv(200,133);
  sv(222,122);
  endShape();
  endShape();
  pop();
  
  
  
  
  
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
