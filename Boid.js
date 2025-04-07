// this class represents a single boid
class Boid {
    constructor() {
        this.position = createVector(width / 2, height/ 2);
        this.velocity = createVector(random(-1, 1), random(-1, 1)); // initial velocity is random
        this.acceleration = createVector();
    }

    // draws the boid on the screen.
    // how is the boid represented?
    show() {
        strokeWeight(16);
        stroke(220);
        point(this.position.x, this.position.y);
    }

    // updates the boid's parameters
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }
}