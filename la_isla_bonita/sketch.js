function setup() {
  createCanvas(400, 600);
  angleMode(DEGREES);
}

function draw() {
  //console.log(mouseX, mouseY);
  background(255);
  stroke(0);
  strokeWeight(3);
  
  push();
  translate(-30,0); // centre whole image
  
  /* hat */
  
  
  push();
  noFill();
  //brim
  strokeWeight(6);
  translate(200,100);
  rotate(30);
  ellipse(0,0,60,80);
  //top
  strokeWeight(5);
  arc(-10,-10,40,40,20,320);
  arc(-10,-5,40,40,10,180);
  
  
  pop();
  
  strokeWeight(3)
  //crease
  line(180,85, 190,90)
  line(190,90, 195, 85)
  
  // top of hat shadow
  fill(0);
  beginShape();
  vertex(209,70);
  vertex(214,64);
  vertex(204,65);
  endShape(CLOSE);
  beginShape();
  vertex(215,75);
  vertex(216,66);
  vertex(209,66);
  endShape(CLOSE);
  
  /* face */
  noFill();
  strokeWeight(4);
  beginShape();
  vertex(182,136);
  bezierVertex(182,155,202,155,217,129);
  endShape();
  
  /* Guitar */
  
  //body
  
  push();
  
  fill('#8B0000');
  arc(190,260, 90, 80, -30, 270);
  //noFill();
  arc(186, 260, 90, 80, -30,40);
  arc(185, 260, 90, 80, -30,40);
  
  beginShape();
  vertex(191,219);
  bezierVertex(190,178,209,162,242,165);
  vertex(242,165);
  vertex(254,172);
  endShape();
  strokeWeight(7);
  beginShape();
  vertex(254,172);
  bezierVertex(270,195,260,223,228,238);
  endShape();
  noStroke();
  
  //fill gaps
  beginShape();
  vertex(190,260);
  vertex(175,235);
  vertex(197,214);
  vertex(229,234);
  vertex(215,266);
  endShape(CLOSE);
  
  beginShape();
  vertex(195,215);
  vertex(245, 173);
  vertex(255,175);
  vertex(230, 237);
  endShape();
  
  stroke(0);
  
  //fret board
  strokeWeight(5);
  line(180,280,307,80);
  fill(0);
  
  //head
  beginShape();
  vertex(288,111);
  bezierVertex(279,100,295,84,310,77);
  vertex(309,81);
  bezierVertex(308,88,296,105,289,112);
  endShape();
  
  //left arm
  noFill();
  beginShape();
  vertex(220,124);
  bezierVertex(348,108,304,191,304,260);
  bezierVertex(264,274, 192,227, 204,223)
  endShape();
  
  //right arm
  
  noFill();
  beginShape();
  vertex(181,138);
  bezierVertex(135,158, 130, 243, 141,246);
  bezierVertex(141,246,161,281,215,261);
  endShape();
  
  //left collar
  noFill();
  beginShape();
  vertex(171, 148);
  bezierVertex(179,148, 185,156,190,162);
  endShape();
  
  //right collar
  noFill();
  beginShape();
  vertex(218,131);
  bezierVertex(223,138,208,150,199,158);
  endShape();
  //left leg
  
  noFill();
  beginShape();
  vertex(267,278);
  bezierVertex(250, 360, 209, 408,230,560);
  endShape();
  
  //right leg
  noFill();
  beginShape();
  vertex(274,398);
  bezierVertex(274, 398, 288, 483, 320, 501);
  endShape();
  pop();
  
  //signature
  drawCursiveM(357, 551, 30);
  
  pop();
  
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
