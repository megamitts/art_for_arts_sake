//p5js2

// Hockey mask JSON data
let maskData = {
  "canvas": { "width": 300, "height": 400, "background": "white" },
  "mask": {
    "outline_color": "black",
    "fill_color": "#f5f5dc",
    "outline_width": 3,
    "shape": [
    [50, 150], [50, 300], [150, 350],  [250,300], [250, 150], [200, 50],[100, 50]

      
    ],
    
  },
  
  "brows":{
    "outline_color": "black",
    "fill_color": "#f5f5dc",
    "outline_width": 10,
    "shape":
  [
    [110,290], [150,275],[190,290]
  ]
           },
  "holes": [
    { "x": 120, "y": 120, "radius": 8 },
    { "x": 180, "y": 120, "radius": 8 },
    { "x": 120, "y": 100, "radius": 8 },
    { "x": 180, "y": 100, "radius": 8 },
    
    { "x": 100, "y": 160, "radius": 8 },
    { "x": 120, "y": 160, "radius": 8 },
    { "x": 180, "y": 160, "radius": 8 },
    { "x": 200, "y": 160, "radius": 8 },
    { "x": 150, "y": 200, "radius": 8 },
    
     
    
    { "x": 100, "y": 240, "radius": 30 },
    { "x": 200, "y": 240, "radius": 30 },
    
     { "x": 110, "y": 310, "radius": 8 },
    { "x": 135, "y": 310, "radius": 8 },
    { "x": 165, "y": 310, "radius": 8 },
    { "x": 190, "y": 310, "radius": 8 },
    { "x": 110, "y": 330, "radius": 8 },
    { "x": 190, "y": 330, "radius": 8 },
    
    
  ]
};

function setup() {
  createCanvas(maskData.canvas.width, maskData.canvas.height);
  noLoop(); 
}

function draw() {
  // Background
  
  
  background(maskData.canvas.background);
  push();
  textSize(20);
  text('JSON Vorhees', 15,380);
  drawCursiveM_p5js2(250,380,20);
  pop();
  scale(1,-1);
  translate(0,-height);
  // Draw mask polygon
  stroke(maskData.mask.outline_color);
  strokeWeight(maskData.mask.outline_width);
  fill(maskData.mask.fill_color);

  beginShape();
  for (let pt of maskData.mask.shape) {
    splineVertex(pt[0], pt[1]);
  }
  endShape(CLOSE);
  
  stroke(maskData.brows.outline_color);
  strokeWeight(maskData.brows.outline_width);
  fill(maskData.brows.fill_color);

  beginShape();
  for (let pt of maskData.brows.shape) {
    splineVertex(pt[0], pt[1]);
  }
  endShape();

  // Draw holes
  noStroke();
  fill(0);
  for (let hole of maskData.holes) {
    ellipse(hole.x, hole.y, hole.radius * 2, hole.radius * 2);
  }
  
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
