function setup() {
  createCanvas(450, 500); // 450, 500
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  console.log(mouseX,mouseY);
  background(220);
  //line(300,0, 300,600);
  strokeWeight(1);
  stroke(0);
  
  
  push()
  translate(0,-20);
  man();
  push();
  translate(-30,0);
  woman();
  pop();
  pop();
  push();
  scale(0.5);
  drawCursiveM(765, 940, 45); // x, y, size
  pop();
}

function man(){
  
  /* head */
  
  //neck
  line(150,50, 130, 120);
  
  //hair
  noFill();
  curve(145, 50, 145,50, 190,55, 145, 15);
  curve(145, 48, 145,48, 190,55, 145, 15);
  line(160,54, 205,54);
  line(160,53, 210,53);
   
  
  //face
  beginShape();
  vertex(180,56);
  bezierVertex(185,75,171,100,171,100);
  vertex(171,100);
  bezierVertex(159, 105,145,91,145,91)
  endShape();
  
  /* body */
  
  //neck of jacket
  line(130,105, 150,150);
  line(129,106, 150,151);
  
  //front of jacket (button line)
  line(145,141,145,205);
  line(145,205,130,220);
  line(130,220, 145, 278);
  
  
  //side of jacket by right inner arm
  line(119,210, 115,245);
  line(115,245, 120,245);
  //down past waist
  line(120,245,130, 290);
  //across bottom of trouser towards left arm
  line(130,290, 155, 270);
  //left lower shirt
  line(155,270, 150, 210);
  
  //right arm top
  line(105,165,115, 170);
  line(107,166,115,171);
  line(108,167,115,171);
  
  //right arm outer
  line(108, 167, 88, 245);
  line(88,245, 110, 260);
  
  //right arm inner
  line(120,205,110,230);
  line(105,226, 115,235);
  
  //left arm
  line(148,200,168,205);
  
  //cup
  
  line(165, 202,180, 202);
  line(165, 202, 163, 182);
  line(180,202,182,182);
  ellipse(171,182, 18,5);
  arc(160,190,8,10,0,360);
  
  /* lower torso */
  
  //right leg
  line(105,258,120,488);
  line(120, 488,130,478);
  line(130,478, 138,330);
  
  //right foot
  line(130,479,130,500);
  line(128,500, 144,491);
  
  //left leg
  line(150,273,180,350);
  line(180,350, 91,470);
  line(91,470, 81,455);
  line(81,455, 149, 350);
  line(149,350,138,332);
  
  //left shoe
  line(68,461, 81,461);
  line(81, 461, 78, 496);
  line(78,496, 76,471);
  line(76, 471, 71,471);
  line(71,471, 68, 461);
  
  
  /* colour in clothing */
  
  //remove leg overlap

  fill(220);
  noStroke();
  beginShape();
  vertex(113,407);
  vertex(137,371);
  vertex(136,409);
  vertex(113,439);
  endShape(CLOSE);
  
  //trousers otter brown #654321  
  
  fill('#654321EE');
  beginShape();
  vertex(108,266);
  vertex(119,253);
  vertex(130,294);
  vertex(148,281);
  vertex(177,347);
  vertex(92,461);
  vertex(85, 452);
  vertex(153,348);
  vertex(139, 323);
  vertex(132,330);
  vertex(132, 367);
  vertex(117, 391);
  endShape(CLOSE);
  
  fill('#654321EE');
  beginShape();
  vertex(120,435);
  vertex(132,420);
  vertex(128,473);
  vertex(122, 480);
  endShape(CLOSE);
  
  //shirt Mikado Yellow #ffc40c 
  
  fill('#ffc40cEE');
  beginShape();
  vertex(122,115);
  vertex(140, 140);
  vertex(140, 213);
  vertex(146,216);
  vertex(153, 262);
  vertex(131, 275);
  vertex(122,193);
  vertex(105,232);
  vertex(113,237);
  vertex(107,251);
  vertex(94,239);
  endShape(CLOSE);
  
  
  noFill();
  stroke(0);
  
  
  
}

function woman(){
  
  /* head */
  // hair
  
  curve(275,80,270,80, 320, 90, 293,30);
  
  //neck to base of left arm
  curve(295,89, 295, 89, 356,263, 280, 200);
  
  //head
  beginShape();
  vertex(270,80);
    bezierVertex(237,167, 306,113, 301,106);
  endShape();
  
  //lower left arm
  line(356,263, 290,245);
  //upper left arm
  line(312,176,319,219);
  
  line(319, 219, 324, 254);
  
  push();
  translate(10,0);
  //right arm
  line(291,225,274, 188);
  
  // right hand
  line(274,188, 264,188);
  
  //cup
  push();
  translate(35,-45);
  rotate(10);
  
  line(266, 178, 264,198);
  line(252,198,264,198);
  line(252,198, 250,178);
  ellipse(258,178,17,5);
  
  fill(0)
  beginShape();
  vertex(266, 178);
  vertex(264,198);
  vertex(252,198);
  vertex(264,198);
  vertex(252,198);
  vertex(250,178);
  endShape(CLOSE);
  noFill();
  pop();
  pop();
  /* upper dress */
  beginShape();
  vertex(304,137);
  bezierVertex(289,165,299,214,299, 206);
  bezierVertex(299,206,299,206,303,246)
  endShape();
  
  //bosom
  line(300,207, 318, 218);
  
  /* lower dress */
  
  beginShape();
  vertex(340,259);
  bezierVertex(340,286,333,339,380,436);
  bezierVertex(355, 448, 267, 431, 265,430)
  bezierVertex(271,377,287,264,300,247);
  endShape();
  
  //pleat to leg
  beginShape();
  vertex(304,352);
  bezierVertex(304,385, 310,480,323, 498);
  endShape();
  
  //foot
  line(323,502, 326,485);
  line(323, 485, 330,485);
  
  
  /* handbag */
  strokeWeight(3);
  line(294,247, 274,281);
  strokeWeight(1);
  line(296,247, 293,262);
  line(275,280, 285,300);
  
  
  /* colouring in */
  
  // dress burnt orange #CC5500EE
  
  fill('#CC5500EE');
  noStroke();
  //top
  beginShape();
  vertex(302,152);
  vertex(314,147);
  vertex(347,251);
  vertex(306,242);
  endShape(CLOSE);
  //bottom
  beginShape();
  vertex(299,256);
  vertex(335,267);
  vertex(349,435);
  vertex(271,419);
  endShape(CLOSE);
  
  stroke(0);
  noFill();
  
}




function drawCursiveM(x, y, size) {
  noFill();
  stroke(0);
  strokeWeight(size * 0.06);

  let h = size * 0.7; // hump height

  // Initial upstroke and first hump
  beginShape();
  vertex(x, y-20);
  bezierVertex(x, y - h * 0.5,         // rise up
                x + size * 0.05, y - h, // top of entry stroke
                x + size * 0.15, y - h); // top flat
  bezierVertex(x + size * 0.25, y - h,
                x + size * 0.3, y - h * 0.3,
                x + size * 0.3, y);     // back to baseline
  endShape();

  // Second hump
  beginShape();
  vertex(x + size * 0.3, y);
  bezierVertex(x + size * 0.3, y - h,
                x + size * 0.55, y - h,
                x + size * 0.6, y);
  endShape();

  // Third hump
  beginShape();
  vertex(x + size * 0.6, y);
  bezierVertex(x + size * 0.6, y - h,
                x + size * 0.85, y - h,
                x + size * 0.9, y);
  endShape();

  // Optional trailing exit stroke
  beginShape();
  vertex(x + size * 0.9, y);
  bezierVertex(x + size * 0.95, y + size * 0.15,
                x + size * 1.1, y + size * 0.1,
                x + size * 1.15, y);
  endShape();
}
