// fork by Neill Bogie - https://openprocessing.org/sketch/2883476

//Not my work!
//Original by megamitts - https://openprocessing.org/sketch/2883392

//This is just a simplification / code-tidy of the code.  Adds minimal new functionality:

//Later added a (crappy) sampled piano to play notes when they land, with tone.js: https://tonejs.github.io/

//This is now crying out to use matter.js (physics engine) and have the mouse disturb the notes.

//tone js sampler
let pianoInstrument;
let transposeAmount;

let pianoInstrumentLoaded = false;

//all the objects for the (visual) notes
let allNotes;
//image of the empty staffs
let sheetImage;
//Time the last reset started.
let startTimeMillis;

//some small user interface (toggle) elements we might use
let ui;

let config = {
	//chord progression or random (random is nicer)
	useChaosNotChords: true,
	useGravity: false,
	noteDivision: 2
}

function preload() {
	sheetImage = loadImage('sheet.jpg');
}

function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
	setupToneJS();
	setupUI()
	resetEverything();
}

function draw() {
	image(sheetImage, 0, 0, 400, 400);
	for (let n of allNotes) {
		n.draw();
		n.update();
	}

	showUI();

	if (calcNumberOfNotesRemaining() === 0) {
		showResetSuggestion()
	}
	//debug text.  not really bpm!
	// text("bpm " + calcNumberOfNotesRemaining(), 350, 20)
}

function resetEverything() {
	transposeAmount = round(random(-6, 6));
	//currently these need to be three long
	progression = random(getAllProgressions())
	config.noteDivision = (millis() < 500) ? 1 : random([1, 4, 8, 16])
	startTimeMillis = millis();
	allNotes = createAllNotes();
}

function setupToneJS() {
	//use a tone js "sampler" - it can play back sampled sounds (piano keys, in this case) 
	//interpolated to match our requested pitch
	//more samples takes more memory and longer to download
	pianoInstrument = new Tone.Sampler({
		urls: {
			A1: "A1.mp3",
			A2: "A2.mp3",
			A3: "A3.mp3",
			A4: "A4.mp3",
			A5: "A5.mp3",
			A6: "A6.mp3",
		},
		//a repo from which we'll (hopefully) get these samples
		baseUrl: "https://tonejs.github.io/audio/salamander/",
		onload: () => pianoInstrumentLoaded = true,
		volume: -12
	}).toDestination();
}

function createAllNotes() {
	return [
		...createInitiallyFixedNotes(),
		...createMessyNotes()
	];
}
/** 
 * Create and return an array of Note objects for those notes on 
 * the top Grand Staff.  These don't start to fall immediately.
 */
function createInitiallyFixedNotes() {
	const notesArr = [];
	/* beautify ignore:start */
	const notePositions = [{ x:70, y:34 }, { x:97, y:38 }, { x:138, y:31 }, { x:174, y:38 }, { x:205, y:38 }, { x:240, y:45 }, { x:273, y:27 }, { x:301, y:36 }, { x:324, y:27 }, { x:353, y:50 }, { x:65, y:78 }, { x:80, y:78 } ];
	/* beautify ignore:end */

	for (let pos of notePositions) {
		notesArr.push(new Note(pos, {
			velocity: randomFallSpeed(),
			delayMillis: 3000,
		}));
	}
	return notesArr;
}
/**
 * Create and return an array of ALL the other notes
 */
function createMessyNotes() {
	const arr = [];

	// I haven't really changed this code
	//I'm guessing these are sets of notes from various staffs
	// Those on the first staff have only just begun to rotate.  
	// Notes lower down have more rotation.

	// Staff 2 - just starting to fall - not much rotation yet.  
	// Must leave space on left for a couple of fixed notes on this staff.
	for (let i = 0; i < 8; i++) {
		arr.push(new Note({
			x: random(105, 370),
			y: random(82, 100)
		}, {
			rotation: random(0, 54),
			velocity: random(0.5, 2),
		}));
	}
	// Staff 3 - lower down, more rotation
	for (let i = 0; i < 25; i++) {
		arr.push(new Note({
			x: random(60, 370),
			y: random(125, 200)
		}, {
			rotation: random(0, 180),
			velocity: random(0.5, 2),
		}));
	}
	// Staff 4 - lower again
	for (let i = 0; i < 45; i++) {
		arr.push(new Note({
			x: random(60, 370),
			y: random(210, 270)
		}, {
			rotation: random(270),
			velocity: random(0.5, 2),
		}));
	}

	// A BIG heap of notes already static at the bottom of the screen

	for (let i = 0; i < 500; i++) {
		const pos = {
			x: random(10, 390),
			y: random(300, 390)
		};
		arr.push(new Note(pos, {
			rotation: random(360),
			isStatic: true
		}));
	}
	return arr;
}

function randomFallSpeed() {
	return random(0.5, 2);
}

class Note {
	//velocity will default to zero, as will delayMillis
	//I've changed it to take the numbers in an object so that they're named in the calling expression
	//rather than needing to be annotated in comments there.
	constructor(pos, {
		rotation = 0,
		velocity = 0,
		delayMillis = 2000,
		isStatic = false
	}) {
		//(consider using vector objects for position)
		this.x = pos.x;
		this.y = pos.y;
		this.radius = 4;
		this.rotation = rotation;
		this.velocity = velocity;
		//delayMillis, in milliseconds, before note is allowed to move
		this.delayMillis = delayMillis;
		this.hasPlayedLandingSound = false;
		this.stopY = random(300, 390);
		this.shade = random(10, 50)
		this.isStatic = isStatic
	}
	update() {
		if (this.isStatic) {
			return;
		}
		//not time for the note to be allowed to fall, yet
		if (millis() < this.delayMillis + startTimeMillis) {
			return
		}

		this.y += this.velocity;
		if (this.y > this.stopY) {
			this.velocity = 0;
			if (!this.isStatic && !this.hasPlayedLandingSound) {
				playNote(this)
				this.hasPlayedLandingSound = true;
			}
			this.isStatic = true;
		} else {
			if (config.useGravity) {
				this.velocity += 0.09;
			}
		}
	}
	draw() {
		push();
		translate(this.x, this.y);
		rotate(this.rotation);
		stroke(this.shade)
		fill(this.shade)
		circle(0, 0, this.radius * 2);
		line(this.radius, 0, this.radius, -20);
		pop();

	}

}

function keyPressed() {
	if (key === "p") {
		togglePause()
	}
	if (key === "c") {
		toggleChaosNotChords();
	}
	if (key === "g") {
		toggleGravity();
	}
	if (key === "d") {
		cycleNoteDivision();
	}
}

function toggleGravity() {
	config.useGravity = !config.useGravity;
}

function togglePause() {
	if (isLooping()) {
		noLoop();
	} else {
		loop();
	}
}

function toggleChaosNotChords() {
	config.useChaosNotChords = !config.useChaosNotChords;
}

function cycleNoteDivision() {
	config.noteDivision *= 2;
	if (config.noteDivision > 16) {
		config.noteDivision = 1;
	}
}

function mousePressed() {
	allowUIToHandleMouseClick()
}

function mouseMoved(){
	mouseDragged()
}
//added for a little fun - move mouse will cause nearby notes to fall
function mouseDragged() {
	if (!allNotes) {
		return;
	}
	const nearbyNotes = allNotes.filter(noteIsNearMouse)
	for (let note of nearbyNotes) {
		note.delayMillis = 0;
	}
}

function noteIsNearMouse(note) {
	//the larger the mouse movement, the larger the range it affects
	const thresholdDistance = mouseDelta() * 2;
	return dist(note.x, note.y, mouseX, mouseY) < thresholdDistance
}

function doubleClicked() {
	resetEverything();
}

function deviceShaken() {
	if (!allNotes) {
		return;
	}
	for (let note of allNotes) {
		if (random() < 0.9) {
			note.delayMillis = 0;
		}
	}
}
//how much has the mouse moved this frame?
function mouseDelta() {
	return dist(mouseX, mouseY, pmouseX, pmouseY)
}

function randomPianoKeyFromChord(chordName) {

	const chords = {
		IRoot: ["C"],
		i: ["C", "Eb", "G"],
		I: ["C", "E", "G"],
		//todo add extensions, but not in bass
		IV: ["F", "A", "C"],
		V7: ["G", "B", "D", "F"],
		anything: "C Db D Eb E F Gb G Ab A Bb B".split(" "),
		bII: ["C#", "E#", "G#", "Cb"],
		iv7: ["F", "Ab", "C", "Eb"],
		bVII7: ["Bb", "D", "F", "Ab"],
		ii7: ["D", "F", "A", "C"]
	};
	const pitchPool = chords[chordName];

	const octavePool = "1 2 3 4 5 6 7 8".split(" ");
	const chosenOctave = chordName.endsWith("Root") ? "1" : random(octavePool);
	const chosenNoteName = random(pitchPool);
	const fullNoteName = chosenNoteName + chosenOctave;

	const midiNumber = Tone.Frequency(fullNoteName).toMidi() + transposeAmount;
	const freq = Tone.Frequency(midiNumber, "midi");
	// console.log({fullNoteName, midiNumber, freq})
	return freq;
}

function chooseChord() {
	if (config.useChaosNotChords) {
		return "anything";
	}

	const numNotesRemaining = calcNumberOfNotesRemaining();
	if (numNotesRemaining > 40) {
		return progression[0]
	}
	if (numNotesRemaining > 10) {
		return progression[1]
	}
	if (numNotesRemaining > 1) {
		return progression[2]
	}
	return "IRoot";
}

function playNote(noteObj) {
	if (!pianoInstrumentLoaded) {
		return;
	}
	const chord = chooseChord();

	pianoInstrument.triggerAttackRelease(randomPianoKeyFromChord(chord), config.noteDivision + "n", Tone.now(), random(0.5, 1));

}
//used to advance chord progression, or to know when we're done (to show restart suggestion)
function calcNumberOfNotesRemaining() {
	return allNotes.filter(n => !n.isStatic && n.hasPlayedLandingSound === false).length
}

function showResetSuggestion() {
	push()
	textAlign(CENTER, CENTER);
	textSize(20)
	// const opacity = map(sin(millis() * 0.1), -1, 1, 0, 0.5) * 255;
	const opacity = 50;
	fill(30, opacity)
	text(`double-click`, width / 2, height * 0.02)
	pop()
}

function setupUI() {
	ui = {
		elements: [{
				text: () => config.useChaosNotChords ? "Qualsiasi nota" : progression.join("  "),
				click: toggleChaosNotChords,
				pos: {
					x: 80,
					y: 5
				},
			},
			{
				text: () => config.noteDivision + "n",
				click: cycleNoteDivision,
				pos: {
					x: 270,
					y: 5
				},
			},
			{
				//text to show on screen	
				text: () => config.useGravity ? "Con gravità" : "Sospeso",
				//what to do if this element gets clicked.  This value is a function to be called.
				click: toggleGravity,
				//position to show text (also used to detect nearby clicks)
				pos: {
					x: 330,
					y: 5
				},
			},

		]
	}
}

function showUI() {
	push()
	fill(30, 50)
	for (let el of ui.elements) {
		textAlign(CENTER, CENTER)
		text(el.text(), el.pos.x, el.pos.y);
	}
	pop()
}

function allowUIToHandleMouseClick() {
	const nearbyUIElements = ui.elements.filter(el => dist(el.pos.x, el.pos.y, mouseX, mouseY) < 30);
	for (const el of nearbyUIElements) {
		//let the individual element handle the "click"
		el.click();
	}
}

function getAllProgressions() {
	return [
		//2 5 1
		["ii7", "V7", "I"],
		//neapolitan
		["bII", "V7", "I"],
		//plagal
		["I", "IV", "I"],
		//picardy
		["i", "I", "I"],
		//back door
		["iv7", "bVII7", "I"]
	]
}
