/* added a seaside palette, some sand, the sea, a boat and a gull */

const PALETTE = ['#CFECF7','#A0D9EF','#62C1E5','#20A7DB','#1C96C5'];
let noiseGra;
let waveX = 0;
let waveY = 400;

function setup() {
	createCanvas(600, 600);
	noiseGra = createGraphics(width, height);

	noiseGra.loadPixels()
	for( let  x=0; x<=width; x++)
	{
		for(let y=0; y<=height; y++)
		{
			noiseGra.set(x, y, color(255, noise(x/10,y/10,x*y/50)*random([0,40,80])))
		}
	}
	noiseGra.updatePixels();
}

function draw(){
	randomSeed(0);
	noStroke();

	//console.log(mouseX,mouseY);
	
	background(200);
	fill(194,174,128);
	rectMode(CORNER);
	
	//sand
	rect(0,height/2,width,height/2);
	
	//sea
	fill(0,105,148);
	
	rect(0,height/2+100, width, height/2-100);
	
	for(let i = 0; i<600; i++){
	circle(waveX,waveY,30);
	waveX += 20;
		
	}
	drawHorizontal();
	boat();
	image(noiseGra, 0, 0);
	waveX = 0;
}



function house(px,py,w,h)
{
	let houseH = h;
	let houseW = w;
	
	let doorU = w*random(0.3,0.4);
	let doorH = h*random(0,0.2);
	
	let roofH = h*random(0.8,0.9);
	let roofW = w*random(0.6,0.9);
	let roofU = h/2;
	
	let windowX = w/4;
	let windowY = h/4;
	let windowH = h*random(0.2,0.5);
	let windowW = w*random(0.2,0.4);
	let windowR = windowH*0.05;
	
	let cols = shuffle(PALETTE);
	noStroke();
	
  rectMode(CENTER);
	
	push();
	translate(px,py);
	fill(cols[0]);
	rect(0,0,houseW,houseH);
	fill(cols[1]);
	triangle(0,-roofH,- roofW,-roofU, roofW,-roofU);
	fill(cols[2]);
	rect(-windowX,-windowY,windowW,windowH,windowR);
	rectMode(CORNERS);
	fill(cols[3]);
	rect(0,doorH,doorU,roofU);
	pop();
}

function drawHorizontal()
{
	for(let y = -0.4 * height;  y < height/2; y += 0.18* height)
	{
		let x = random(-0.2, 0) * width;
		fill(255);
		while(x < width)
		{
			let w = random(0.1,0.2) * width;
			let h = random(0.05, 0.25) * height;
			house(x + w/2,  y+100 - h/2, w , h);
			x += w * random(1, 1.2);
		}
	}		
}

function boat(){
	push();
	translate(0,-20);
	rectMode(CORNER);
	//sail
	fill('#CFECF7');
	triangle(395,445, 365,445,395,385)

	//mast
	fill(0);
	
	rect(395,450,10,-70,0,0,50,50);
	//hull
	fill('#62C1E5');
	quad(350, 450, // Top-left
    450, 450, // Top-right
    430, 480, // Bottom-right
    380, 480);  // Bottom-left

	//gull
	stroke('#CFECF7');
	strokeWeight(2);
	line(10,370,15,365);
	line(15,365,18,368);
	line(18,368,23,365);
	line(23,365,28,368);
	pop();
}
