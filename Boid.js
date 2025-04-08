// this class represents a single boid
class Boid {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(random(-1, 1), random(-1, 1)); // initial velocity is random
        this.acceleration = createVector();
        this.force = createVector();
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
        this.align();
        this.acceleration.add(this.force);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.force.mult(0); // zero out the force for next iteration
    }

    // defining seperation behaviour
    seperate() {

    }

    // defining alginment behaviour
    align() {
        let sight = 80;
        let average = createVector(); // (0, 0)
        for (let flockMember of boids) {
            let inSight = 0;
            let d = dist(this.position.x, this.position.y, flockMember.position.x, flockMember.position.y)
            if (d <= sight) {
                average.add(d);
                inSight++;
            }
            average.div(inSight) // could be dividing by 0 though not likely. should change that
        }
        // average currently has the average distance from boids in sight
        // we want to change the force applied to it accordingly
        this.force.sub(average);
    }

    // defining cohesion behaviour
    cohere() {

    }
}