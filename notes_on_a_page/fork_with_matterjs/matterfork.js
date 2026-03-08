// Matter.js physics added for interactive note pile
// I used Claude 4.6 thinking on this simply because I haven't got anywhere near the skills at the moment to attempt matter.js (I have played with it)

// fork by Neill Bogie - https://openprocessing.org/sketch/2883476
// Original by megamitts - https://openprocessing.org/sketch/2883392

//tone js sampler
let pianoInstrument;
let transposeAmount;
let pianoInstrumentLoaded = false;

let allNotes;
let sheetImage;
let startTimeMillis;
let ui;

// ── Matter.js globals ──
let mEngine, mWorld;

let config = {
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
	setupMatterJS();
	setupToneJS();
	setupUI();
	resetEverything();
}

function setupMatterJS() {
	mEngine = Matter.Engine.create();
	mWorld = mEngine.world;
	mEngine.world.gravity.y = 1;

	const opts = { isStatic: true, friction: 1, restitution: 0.1 };
	const thick = 200; // much thicker walls
	Matter.Composite.add(mWorld, [
		Matter.Bodies.rectangle(200, 400 + thick / 2, 400 + thick * 2, thick, opts), // ground
		Matter.Bodies.rectangle(-thick / 2, 200, thick, 800, opts),                  // left wall
		Matter.Bodies.rectangle(400 + thick / 2, 200, thick, 800, opts),              // right wall
		Matter.Bodies.rectangle(200, -thick / 2, 400 + thick * 2, thick, opts)        // ceiling
	]);

	// more solver iterations = fewer bodies slip through
	mEngine.positionIterations = 10;
	mEngine.velocityIterations = 8;
}

function draw() {
	// Step the physics engine each frame
	Matter.Engine.update(mEngine);

	image(sheetImage, 0, 0, 400, 400);
	for (let n of allNotes) {
		n.update();
		n.draw();
	}

	showUI();

	if (calcNumberOfNotesRemaining() === 0) {
		showResetSuggestion();
	}
}

function resetEverything() {
	// Remove old Matter.js bodies from the world
	if (allNotes) {
	for (let note of allNotes) {
			if (note.matterBody) {
				Matter.Composite.remove(mWorld, note.matterBody);
			}
		}
	}

	transposeAmount = round(random(-6, 6));
	progression = random(getAllProgressions());
	config.noteDivision = (millis() < 500) ? 1 : random([1, 4, 8, 16]);
	startTimeMillis = millis();
	allNotes = createAllNotes();
}

function setupToneJS() {
	pianoInstrument = new Tone.Sampler({
		urls: {
			A1: "A1.mp3",
			A2: "A2.mp3",
			A3: "A3.mp3",
			A4: "A4.mp3",
			A5: "A5.mp3",
			A6: "A6.mp3",
		},
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

function createInitiallyFixedNotes() {
	const notesArr = [];
	/* beautify ignore:start */
	const notePositions = [{x:70,y:34},{x:97,y:38},{x:138,y:31},{x:174,y:38},{x:205,y:38},{x:240,y:45},{x:273,y:27},{x:301,y:36},{x:324,y:27},{x:353,y:50},{x:65,y:78},{x:80,y:78}];
	/* beautify ignore:end */

	for (let pos of notePositions) {
		notesArr.push(new Note(pos, {
			velocity: randomFallSpeed(),
			delayMillis: 3000,
		}));
	}
	return notesArr;
}

function createMessyNotes() {
	const arr = [];

	// Staff 2
	for (let i = 0; i < 8; i++) {
		arr.push(new Note({
			x: random(105, 370),
			y: random(82, 100)
		}, {
			rotation: random(0, 54),
			velocity: random(0.5, 2),
		}));
	}
	// Staff 3
	for (let i = 0; i < 25; i++) {
		arr.push(new Note({
			x: random(60, 370),
			y: random(125, 200)
		}, {
			rotation: random(0, 180),
			velocity: random(0.5, 2),
		}));
	}
	// Staff 4
	for (let i = 0; i < 45; i++) {
		arr.push(new Note({
			x: random(60, 370),
			y: random(210, 270)
		}, {
			rotation: random(270),
			velocity: random(0.5, 2),
		}));
	}

	// Bottom heap — these get STATIC Matter.js bodies immediately.
	// They stay frozen until the mouse activates them.
	for (let i = 0; i < 500; i++) {
		arr.push(new Note({
			x: random(10, 390),
			y: random(300, 390)
		}, {
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
	constructor(pos, {
		rotation = 0,
		velocity = 0,
		delayMillis = 2000,
		isStatic = false
	}) {
		this.x = pos.x;
		this.y = pos.y;
		this.radius = 4;
		this.rotation = rotation;
		this.velocity = velocity;
		this.delayMillis = delayMillis;
		this.hasPlayedLandingSound = false;
		this.stopY = random(300, 390);
		this.shade = random(10, 50);
		this.isStatic = isStatic;

		// ── Matter.js body (created when note is at rest) ──
		this.matterBody = null;

		// Bottom-heap notes start with a static physics body.
		// They keep their position until the mouse wakes them.
		if (isStatic) {
			this.createMatterBody(true);
		}
	}

	/** Create a Matter.js circle body for this note.
	 *  @param {boolean} asStatic  true → immovable until activated */
	createMatterBody(asStatic) {
		this.matterBody = Matter.Bodies.circle(this.x, this.y, this.radius, {
			isStatic: asStatic,
			restitution: 0.2,
			friction: 0.6,
			density: 0.001,
			angle: this.rotation * (PI / 180),
			frictionAir: 0.03
		});
		Matter.Composite.add(mWorld, this.matterBody);
	}

	/** Convert a static Matter.js body to dynamic so it participates in physics */
	activatePhysics() {
		if (this.matterBody && this.matterBody.isStatic) {
			Matter.Body.setStatic(this.matterBody, false);
		}
	}

	update() {
		// If this note has a physics body, let Matter.js drive position & angle
		if (this.matterBody) {
			this.x = this.matterBody.position.x;
			this.y = this.matterBody.position.y;
			this.rotation = this.matterBody.angle * (180 / PI);
			return;
		}

		// Otherwise use the original simple-velocity fall logic
		if (this.isStatic) return;
		if (millis() < this.delayMillis + startTimeMillis) return;

		this.y += this.velocity;
		if (this.y > this.stopY) {
			this.velocity = 0;
			if (!this.hasPlayedLandingSound) {
				playNote(this);
				this.hasPlayedLandingSound = true;
			}
			this.isStatic = true;
			// Newly-landed notes become DYNAMIC physics bodies
			// so they settle into the pile naturally
			this.createMatterBody(false);
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
		stroke(this.shade);
		fill(this.shade);
		circle(0, 0, this.radius * 2);
		line(this.radius, 0, this.radius, -20);
		pop();
	}
}

// ── Mouse / physics interaction ──

function mouseMoved() {
	handleMouseInteraction();
}

function mouseDragged() {
	handleMouseInteraction();
}

function handleMouseInteraction() {
	if (!allNotes) return;
	applyMouseForceToNearbyBodies();
	dropNearbyFallingNotes();
}

/**
 * Push physics notes away from the mouse.
 * Force scales with mouse speed — faster sweeps scatter further.
 * Static bodies are converted to dynamic on contact.
 */
function applyMouseForceToNearbyBodies() {
	const mouseSpeed = mouseDelta();
	if (mouseSpeed < 0.5) return;

	const influenceRadius = constrain(mouseSpeed * 3, 20, 80);

	for (let note of allNotes) {
		if (!note.matterBody) continue;

		const body = note.matterBody;
		const dx = body.position.x - mouseX;
		const dy = body.position.y - mouseY;

		// Cheap bounding-box reject
		if (abs(dx) > influenceRadius || abs(dy) > influenceRadius) continue;

		const d = sqrt(dx * dx + dy * dy);
		if (d < influenceRadius && d > 0.5) {
			// Wake up static bodies the mouse touches
			if (body.isStatic) {
				note.activatePhysics();
			}

			const falloff = 1 - d / influenceRadius;
			const forceMag = min(0.002 * mouseSpeed * falloff * falloff, 0.005);
			Matter.Body.applyForce(body, body.position, {
				x: (dx / d) * forceMag,
				y: (dy / d) * forceMag
			});
		}
	}
}

/** Original behaviour: mouse movement near falling notes makes them drop early */
function dropNearbyFallingNotes() {
	const nearbyNotes = allNotes.filter(n => !n.matterBody && noteIsNearMouse(n));
	for (let note of nearbyNotes) {
		note.delayMillis = 0;
	}
}

function noteIsNearMouse(note) {
	const thresholdDistance = mouseDelta() * 2;
	return dist(note.x, note.y, mouseX, mouseY) < thresholdDistance;
}

function mouseDelta() {
	return dist(mouseX, mouseY, pmouseX, pmouseY);
}

// ── Keyboard / other input ──

function keyPressed() {
	if (key === "p") togglePause();
	if (key === "c") toggleChaosNotChords();
	if (key === "g") toggleGravity();
	if (key === "d") cycleNoteDivision();
}

function toggleGravity() {
	config.useGravity = !config.useGravity;
}

function togglePause() {
	if (isLooping()) noLoop();
	else loop();
}

function toggleChaosNotChords() {
	config.useChaosNotChords = !config.useChaosNotChords;
}

function cycleNoteDivision() {
	config.noteDivision *= 2;
	if (config.noteDivision > 16) config.noteDivision = 1;
}

function mousePressed() {
	allowUIToHandleMouseClick();
}

function doubleClicked() {
	resetEverything();
}

function deviceShaken() {
	if (!allNotes) return;
	for (let note of allNotes) {
		if (random() < 0.9) {
			note.delayMillis = 0;
		}
	}
}

// ── Music ──

function randomPianoKeyFromChord(chordName) {
	const chords = {
		IRoot: ["C"],
		i: ["C", "Eb", "G"],
		I: ["C", "E", "G"],
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
	return freq;
}

function chooseChord() {
	if (config.useChaosNotChords) return "anything";
	const numNotesRemaining = calcNumberOfNotesRemaining();
	if (numNotesRemaining > 40) return progression[0];
	if (numNotesRemaining > 10) return progression[1];
	if (numNotesRemaining > 1) return progression[2];
	return "IRoot";
}

function playNote(noteObj) {
	if (!pianoInstrumentLoaded) return;
	const chord = chooseChord();
	pianoInstrument.triggerAttackRelease(
		randomPianoKeyFromChord(chord),
		config.noteDivision + "n",
		Tone.now(),
		random(0.5, 1)
	);
}

function calcNumberOfNotesRemaining() {
	return allNotes.filter(n => !n.isStatic && n.hasPlayedLandingSound === false).length;
}

// ── UI ──

function showResetSuggestion() {
	push();
	textAlign(CENTER, CENTER);
	textSize(20);
	const opacity = 50;
	fill(30, opacity);
	text(`double-click`, width / 2, height * 0.02);
	pop();
}

function setupUI() {
	ui = {
		elements: [{
			text: () => config.useChaosNotChords ? "Qualsiasi nota" : progression.join("  "),
			click: toggleChaosNotChords,
			pos: { x: 80, y: 5 },
		}, {
			text: () => config.noteDivision + "n",
			click: cycleNoteDivision,
			pos: { x: 270, y: 5 },
		}, {
			text: () => config.useGravity ? "Con gravità" : "Sospeso",
			click: toggleGravity,
			pos: { x: 330, y: 5 },
		}]
	};
}

function showUI() {
	push();
	fill(30, 50);
	for (let el of ui.elements) {
		textAlign(CENTER, CENTER);
		text(el.text(), el.pos.x, el.pos.y);
	}
	pop();
}

function allowUIToHandleMouseClick() {
	const nearbyUIElements = ui.elements.filter(
		el => dist(el.pos.x, el.pos.y, mouseX, mouseY) < 30
	);
	for (const el of nearbyUIElements) {
		el.click();
	}
}

function getAllProgressions() {
	return [
		["ii7", "V7", "I"],
		["bII", "V7", "I"],
		["I", "IV", "I"],
		["i", "I", "I"],
		["iv7", "bVII7", "I"]
	];
}
