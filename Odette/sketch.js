// after Anastasia Kravchenko

function setup() {
  createCanvas(300, 450);
}

function draw() {
  background(255);
  push();
  translate(-20,0);
  noFill();
  let sv = sV;
  strokeWeight(6);
  //console.log(mouseX,mouseY);
  scale(0.5);
  beginShape();
  //hand
  sV(280,95); // bottom of wrist
  sV(310,65);
  sV(309,57);
  sV(300,62);
  sV(289,64);
  sV(292,42);
  sV(300,30);// tip of index finger
  sV(295,27);
  sV(284,38);
  sV(273,66);
  sV(268,80);
  sV(266,95);
  
  //arm
  sV(262,186);
  sv(270,216);
  sV(273,241);
  sv(266,269);
  
  //neck
  sv(260,273);
  sv(243,267);
  sv(215,266);
  
  //face
  sv(200,256); //point of chin
  sv(185,266);
  sv(178,266);
  sv(170,264);
  sv(168,280); //end of nose to hairline
  
  //hair top
  sv(160,284);
  sv(151,295);
  sv(150,322);
  sv(164,335);
  sv(184,336); // to bun
  
  //bun
  sv(180,343);
  sv(179,348);
  sv(182,351);
  sv(190,355);
  sv(205,355);
  sv(213,344);
  sv(204,332);
  sv(207,326);
  sv(220,318);
  sv(227,295); //nape of neck
  sv(229,287);
  sv(235,295);
  sv(240,311); //shoulder to back
  
  //back
  sv(277,344);
  sv(321,364);
  sv(336,371);
  sv(340,388); //crossover point
  
  //back of skirt
  sv(335,394);
  sv(312,413);
  sv(248,442);
  sv(209,440);
  sv(178,434);
  sv(163,409);
  sv(171,389);
  sv(190,380);
  sv(211,377);
  sv(274,380);
  sv(340,388);
  
  //front of skirt
  sv(375,392);
  sv(451,432);
  sv(525,486);
  sv(536,515);
  sv(503,535);
  sv(402,515); //crossover point
  
  //top of leg
  sv(361,494);
  sv(351, 461);
  sv(375, 440);
  sv(389,438);
  sv(406,452);
  sv(413,468);
  sv(413,488);
  
  sv(402, 515);
  
  //leg
  sv(361,648);
  sv(341,763);
  sv(344,783);
  sv(347,790);
  
  //shoe
  sv(347,803);
  sv(344,817);
  sv(339,832);
  sv(326,850);
  sv(317,847);
  sv(313,838);
  
  
  // // sv(304,841);
  // sv(301,827);
  sv(320,813);
  sv(316,796);
  sv(327,783);
  
  
  
  endShape();
  
  drawCursiveM_p5js2(504, 839, 30)
  
  pop();
}

function sV(x,y){
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
