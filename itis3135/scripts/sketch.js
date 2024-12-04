let movers = [];
let liquid;

class Mover {
    constructor(m, x, y, char) {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.char = char;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    display() {
      stroke(0);
      strokeWeight(2);
      fill(255);
      textSize(this.mass * 16);
      text(this.char, this.position.x, this.position.y);
    }
  
    checkEdges() {
      if (this.position.y > height - this.mass * 8) {
        this.velocity.y *= -0.9;
        this.position.y = height - this.mass * 8;
      }
    }
  }

function initializeMovers() {
    movers = [];
    let name = "Paul Alex";
    let xSpacing = width / name.length;
  
    for (let i = 0; i < name.length; i++) {
      let mass = random(0.5, 3);
      let xPosition = xSpacing * i + xSpacing / 2;
      movers[i] = new Mover(mass, xPosition, 0, name[i]);
    }
  }

class Liquid {
constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
}

contains(m) {
    let l = m.position;
    return l.x > this.x && l.x < this.x + this.w && l.y > this.y && l.y < this.h;
}

calculateDrag(m) {
    let speed = m.velocity.mag();
    let dragMagnitude = this.c * speed * speed;
    let dragForce = m.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    return dragForce;
}

display() {
    noStroke();
    fill(50);
    rect(this.x, this.y, this.w, this.h);
}
}

function setup() {
  createCanvas(720, 400);
  colorMode(HSB, 9, 100, 100);
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
  describe('Paul Alex letters drop from the top of the canvas and slow down as they reach the bottom half of the canvas.');

  document.getElementById('animate-button').addEventListener('click', initializeMovers);
}

function draw() {
  background(20);
  liquid.display();

  for (let mover of movers) {
    if (liquid.contains(mover)) {
      let dragForce = liquid.calculateDrag(mover);
      mover.applyForce(dragForce);
    }

    let gravity = createVector(0, 0.1 * mover.mass);
    mover.applyForce(gravity);
    mover.update();
    mover.display();
    mover.checkEdges();
  }
}