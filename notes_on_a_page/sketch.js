//copy of the fork done by Neil Bogie
// https://openprocessing.org/sketch/2883476
//Original by megamitts - https://openprocessing.org/sketch/2883392

//This is just a simplification of the code

let allNotes = [];
let sheetImage;

function preload() {
	sheetImage = loadImage('sheet.jpg');
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);

	const positionsOfFixedNotes = [{
		x: 70,
		y: 34,
	}, {
		x: 97,
		y: 38,
	}, {
		x: 138,
		y: 31,
	}, {
		x: 174,
		y: 38,
	}, {
		x: 205,
		y: 38,
	}, {
		x: 240,
		y: 45,
	}, {
		x: 273,
		y: 27,
	}, {
		x: 301,
		y: 36,
	}, {
		x: 324,
		y: 27,
	}, {
		x: 353,
		y: 50,
	}, {
		x: 65,
		y: 78,
	}, {
		x: 80,
		y: 78,
	}, ];

	for (let pos of positionsOfFixedNotes) {
		allNotes.push(new Note(pos, 0, randomFallSpeed(), 2000));
	}

	for (let i = 0; i < 8; i++) {
		allNotes.push(new Note({
				x: random(105, 370),
				y: random(82, 100)
			},
			random(54), // rotation
			random(0.5, 2) //velocity
		));
	}

	for (let i = 0; i < 25; i++) {
		allNotes.push(new Note({
				x: random(60, 370),
				y: random(125, 200)
			},
			random(180), // rotation
			random(0.5, 2) //velocity
		));
	}

	for (let i = 0; i < 45; i++) {
		allNotes.push(new Note({
				x: random(60, 370),
				y: random(210, 270)
			},
			random(270), // rotation
			random(0.5, 2) //velocity
		));
	}

	//bunch of allNotes at bottom of screen
	for (let i = 0; i < 500; i++) {
		allNotes.push(new Note({
				x: random(10, 390),
				y: random(300, 390)
			},
			random(360) // rotation
		));
	}
}

function draw() {
	background("linen")
	image(sheetImage, 0, 0, 400, 400);
	for (let n of allNotes) {
		n.draw("black");
		n.update();
	}
}

function randomFallSpeed() {
	return random(0.5, 2);
}

class Note {
	constructor(pos, rot, velocity = 0, delayMs = 0) {
		this.x = pos.x;
		this.y = pos.y;
		this.r = 8;
		this.rot = rot;
		this.velocity = velocity;
		this.delay = delayMs;
	}
	update() {
		if (millis() < this.delay) {
			return
		}
		this.y += this.velocity;
		if (this.y > random(300, 390)) {
			this.velocity = 0;
		}
	}
	draw(colour) {
		push();
		translate(this.x, this.y);
		rotate(this.rot);
		fill(colour);
		circle(0, 0, this.r);
		line(this.r / 2, 0, this.r / 2, -20);
		pop();
	}

}
