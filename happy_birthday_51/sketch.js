
        let sparkles = [];
        let butterflies = [];
        let textParticles = [];
        let phase = 0; // 0: sparkle text, 1: burst, 2: butterflies
        let phaseTimer = 0;
        let burstTriggered = false;
        let pg;
        let bgStars = [];

        function setup() {
            createCanvas(windowWidth, windowHeight);
            textFont('Georgia');

            // Create offscreen buffer to sample text pixels
            pg = createGraphics(width, height);
            pg.background(0);
            pg.fill(255);
            pg.noStroke();
            pg.textAlign(CENTER, CENTER);
            pg.textSize(min(width / 8, 80));
            pg.textFont('Georgia');
            pg.text("Happy Birthday!", width / 2, height / 2);

            // Sample text pixels
            pg.loadPixels();
            let step = 6;
            for (let x = 0; x < width; x += step) {
                for (let y = 0; y < height; y += step) {
                    let idx = 4 * (y * width + x);
                    if (pg.pixels[idx] > 128) {
                        textParticles.push({
                            x: x,
                            y: y,
                            origX: x,
                            origY: y
                        });
                    }
                }
            }

            // Background stars
            for (let i = 0; i < 150; i++) {
                bgStars.push({
                    x: random(width),
                    y: random(height),
                    size: random(1, 3),
                    twinkle: random(TWO_PI)
                });
            }

            phaseTimer = millis();
        }

        function draw() {
            background(10, 5, 30);

            // Draw background stars
            noStroke();
            for (let s of bgStars) {
                s.twinkle += 0.03;
                let alpha = map(sin(s.twinkle), -1, 1, 50, 200);
                fill(255, 255, 220, alpha);
                ellipse(s.x, s.y, s.size);
            }

            let elapsed = millis() - phaseTimer;

            if (phase === 0) {
                // PHASE 0: Sparkling text
                drawSparklingText(elapsed);

                // Generate sparkles along text
                if (frameCount % 2 === 0) {
                    let p = random(textParticles);
                    sparkles.push(new Sparkle(p.x + random(-3, 3), p.y + random(-3, 3)));
                }

                // Transition after 4 seconds
                if (elapsed > 4000) {
                    phase = 1;
                    phaseTimer = millis();
                    burstTriggered = true;

                    // Create butterflies from text positions
                    let numButterflies = 51;
                    for (let i = 0; i < numButterflies; i++) {
                        let p = random(textParticles);
                        butterflies.push(new Butterfly(p.x, p.y));
                    }

                    // Create burst particles
                    for (let p of textParticles) {
                        if (random() < 0.3) {
                            sparkles.push(new BurstParticle(p.x, p.y));
                        }
                    }
                }
            }

            if (phase === 1) {
                // PHASE 1: Burst transition
                let burstElapsed = millis() - phaseTimer;

                // Fading text
                let textAlpha = map(burstElapsed, 0, 800, 255, 0);
                if (textAlpha > 0) {
                    drawSparklingText(elapsed, textAlpha);
                }

                if (burstElapsed > 1000) {
                    phase = 2;
                    phaseTimer = millis();
                }
            }

            // Update and draw sparkles
            for (let i = sparkles.length - 1; i >= 0; i--) {
                sparkles[i].update();
                sparkles[i].display();
                if (sparkles[i].isDead()) {
                    sparkles.splice(i, 1);
                }
            }

            // Update and draw butterflies
            if (phase >= 1) {
                for (let b of butterflies) {
                    b.update();
                    b.display();
                }
            }

            // In phase 2, show subtle text again after butterflies spread
            if (phase === 2) {
                let p2elapsed = millis() - phaseTimer;
                if (p2elapsed > 3000) {
                    let fadeIn = map(p2elapsed, 3000, 5000, 0, 180);
                    fadeIn = constrain(fadeIn, 0, 180);
                    textAlign(CENTER, CENTER);
                    textSize(min(width / 10, 60));
                    fill(255, 220, 255, fadeIn);
                    noStroke();
                    text("🎂 Happy Birthday, Boopty! 🎂", width / 2, height - 80);
                }

                // Add occasional new sparkles trailing butterflies
                if (frameCount % 4 === 0 && butterflies.length > 0) {
                    let b = random(butterflies);
                    sparkles.push(new Sparkle(b.x, b.y, true));
                }
            }
        }

        function drawSparklingText(elapsed, alphaOverride) {
            textAlign(CENTER, CENTER);
            let sz = min(width / 8, 80);
            textSize(sz);

            // Glowing layers
            let baseAlpha = alphaOverride !== undefined ? alphaOverride : 255;
            let glowPulse = map(sin(elapsed * 0.003), -1, 1, 0.6, 1.0);

            // Outer glow
            drawingContext.shadowBlur = 30 * glowPulse;
            drawingContext.shadowColor = `rgba(255, 180, 255, ${(baseAlpha / 255) * 0.8})`;

            // Rainbow shimmer
            let hueShift = (elapsed * 0.05) % 360;
            colorMode(HSB, 360, 100, 100, 255);
            fill(hueShift, 40, 100, baseAlpha);
            noStroke();
            text("Happy Birthday!", width / 2, height / 2);

            // Second layer with different hue
            fill((hueShift + 60) % 360, 30, 100, baseAlpha * 0.3);
            text("Happy Birthday!", width / 2, height / 2);

            colorMode(RGB, 255);
            drawingContext.shadowBlur = 0;
        }

        class Sparkle {
            constructor(x, y, isTrail) {
                this.x = x;
                this.y = y;
                this.vx = random(-1, 1);
                this.vy = random(-2, 0.5);
                this.life = isTrail ? random(20, 40) : random(30, 60);
                this.maxLife = this.life;
                this.size = random(2, 6);
                this.hue = random(360);
                this.isTrail = isTrail;
                this.rotAngle = random(TWO_PI);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy -= 0.01;
                this.life--;
                this.rotAngle += 0.1;
            }

            display() {
                let alpha = map(this.life, 0, this.maxLife, 0, 255);
                push();
                translate(this.x, this.y);
                rotate(this.rotAngle);
                colorMode(HSB, 360, 100, 100, 255);
                noStroke();

                // Star shape
                fill(this.hue, 50, 100, alpha);
                this.drawStar(0, 0, this.size * 0.4, this.size, 4);

                // Center glow
                fill(this.hue, 20, 100, alpha * 0.5);
                ellipse(0, 0, this.size * 0.8);

                colorMode(RGB, 255);
                pop();
            }

            drawStar(x, y, r1, r2, n) {
                let angle = TWO_PI / n;
                beginShape();
                for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
                    vertex(x + cos(a) * r2, y + sin(a) * r2);
                    vertex(x + cos(a + angle / 2) * r1, y + sin(a + angle / 2) * r1);
                }
                endShape(CLOSE);
            }

            isDead() {
                return this.life <= 0;
            }
        }

        class BurstParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                let angle = random(TWO_PI);
                let speed = random(2, 8);
                this.vx = cos(angle) * speed;
                this.vy = sin(angle) * speed;
                this.life = random(40, 80);
                this.maxLife = this.life;
                this.size = random(2, 5);
                this.hue = random(360);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.97;
                this.vy *= 0.97;
                this.vy += 0.02;
                this.life--;
            }

            display() {
                let alpha = map(this.life, 0, this.maxLife, 0, 255);
                colorMode(HSB, 360, 100, 100, 255);
                noStroke();
                fill(this.hue, 70, 100, alpha);
                ellipse(this.x, this.y, this.size);
                colorMode(RGB, 255);
            }

            isDead() {
                return this.life <= 0;
            }
        }

        class Butterfly {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.startX = x;
                this.startY = y;
                this.targetX = random(width);
                this.targetY = random(height);
                this.wingAngle = random(TWO_PI);
                this.wingSpeed = random(0.08, 0.15);
                this.size = random(12, 25);
                this.hue1 = random(360);
                this.hue2 = (this.hue1 + random(30, 90)) % 360;
                this.angle = 0;
                this.wanderAngle = random(TWO_PI);
                this.speed = random(1, 2.5);
                this.born = millis();
                this.noiseOff = random(1000);
                this.bodyColor = [random(50, 100), random(30, 60), random(20, 50)];
            }

            update() {
                let age = millis() - this.born;

                // Flap wings
                this.wingAngle += this.wingSpeed;

                // Wandering motion using noise
                this.noiseOff += 0.01;
                this.wanderAngle += map(noise(this.noiseOff), 0, 1, -0.1, 0.1);

                // Gentle upward and outward drift
                let drift = min(age / 2000, 1);
                this.x += cos(this.wanderAngle) * this.speed * drift;
                this.y += sin(this.wanderAngle) * this.speed * drift - 0.3 * drift;

                // Slight sinusoidal path
                this.x += sin(age * 0.002 + this.noiseOff) * 0.5;
                this.y += cos(age * 0.003 + this.noiseOff) * 0.3;

                // Keep somewhat on screen with soft wrapping
                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;

                // Calculate heading angle
                this.angle = this.wanderAngle;
            }

            display() {
                let age = millis() - this.born;
                let fadeIn = constrain(map(age, 0, 500, 0, 1), 0, 1);
                let wingFlap = sin(this.wingAngle);

                push();
                translate(this.x, this.y);
                rotate(this.angle + HALF_PI);

                let s = this.size * fadeIn;
                colorMode(HSB, 360, 100, 100, 255);

                // Wing shadow
                noStroke();
                fill(0, 0, 0, 30 * fadeIn);
                this.drawWing(1, wingFlap, s, 2, 2);
                this.drawWing(-1, wingFlap, s, 2, 2);

                // Upper wings
                let alpha = 220 * fadeIn;
                fill(this.hue1, 70, 90, alpha);
                stroke(this.hue1, 80, 40, alpha);
                strokeWeight(0.5);
                this.drawUpperWing(1, wingFlap, s);
                this.drawUpperWing(-1, wingFlap, s);

                // Lower wings
                fill(this.hue2, 60, 95, alpha);
                stroke(this.hue2, 70, 50, alpha);
                this.drawLowerWing(1, wingFlap, s);
                this.drawLowerWing(-1, wingFlap, s);

                // Wing patterns - spots
                noStroke();
                fill((this.hue1 + 180) % 360, 50, 100, alpha * 0.7);
                let spotScale = abs(wingFlap) * 0.5 + 0.3;
                ellipse(s * 0.25 * (wingFlap > 0 ? 1 : 0.5), -s * 0.3, s * 0.2 * spotScale, s * 0.15);
                ellipse(-s * 0.25 * (wingFlap > 0 ? 1 : 0.5), -s * 0.3, s * 0.2 * spotScale, s * 0.15);

                // Body
                noStroke();
                fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2], 255 * fadeIn);
                ellipse(0, 0, s * 0.1, s * 0.6);

                // Head
                fill(this.bodyColor[0] * 0.7, this.bodyColor[1] * 0.7, this.bodyColor[2] * 0.7, 255 * fadeIn);
                ellipse(0, -s * 0.35, s * 0.09, s * 0.09);

                // Antennae
                stroke(this.bodyColor[0] * 0.5, this.bodyColor[1] * 0.5, this.bodyColor[2] * 0.5, 200 * fadeIn);
                strokeWeight(0.8);
                noFill();
                let antWave = sin(this.wingAngle * 0.5) * 0.1;
                line(0, -s * 0.38, s * 0.12, -s * 0.55 + antWave * s);
                line(0, -s * 0.38, -s * 0.12, -s * 0.55 - antWave * s);
                // Antenna tips
                fill(this.bodyColor[0], this.bodyColor[1], this.bodyColor[2], 180 * fadeIn);
                noStroke();
                ellipse(s * 0.12, -s * 0.55 + antWave * s, 2, 2);
                ellipse(-s * 0.12, -s * 0.55 - antWave * s, 2, 2);

                colorMode(RGB, 255);
                pop();

                // Sparkle trail
                if (fadeIn > 0.5 && random() < 0.15) {
                    sparkles.push(new Sparkle(this.x + random(-5, 5), this.y + random(-5, 5), true));
                }
            }

            drawUpperWing(side, flap, s) {
                let wx = s * 0.5 * side * (abs(flap) * 0.5 + 0.5);
                push();
                beginShape();
                vertex(0, -s * 0.05);
                bezierVertex(
                    wx * 0.8, -s * 0.5,
                    wx * 1.2, -s * 0.4,
                    wx, -s * 0.1
                );
                bezierVertex(
                    wx * 0.6, s * 0.05,
                    0, s * 0.05,
                    0, s * 0.1
                );
                endShape(CLOSE);
                pop();
            }

            drawLowerWing(side, flap, s) {
                let wx = s * 0.4 * side * (abs(flap) * 0.5 + 0.5);
                push();
                beginShape();
                vertex(0, s * 0.05);
                bezierVertex(
                    wx * 1.0, s * 0.0,
                    wx * 1.1, s * 0.3,
                    wx * 0.5, s * 0.35
                );
                bezierVertex(
                    wx * 0.2, s * 0.3,
                    0, s * 0.2,
                    0, s * 0.15
                );
                endShape(CLOSE);
                pop();
            }

            drawWing(side, flap, s, ox, oy) {
                let wx = s * 0.5 * side * (abs(flap) * 0.5 + 0.5);
                beginShape();
                vertex(ox, -s * 0.05 + oy);
                bezierVertex(
                    wx * 0.8 + ox, -s * 0.5 + oy,
                    wx * 1.2 + ox, -s * 0.4 + oy,
                    wx + ox, -s * 0.1 + oy
                );
                bezierVertex(
                    wx * 0.6 + ox, s * 0.05 + oy,
                    ox, s * 0.05 + oy,
                    ox, s * 0.1 + oy
                );
                endShape(CLOSE);
            }
        }

        function windowResized() {
            resizeCanvas(windowWidth, windowHeight);
        }
 
