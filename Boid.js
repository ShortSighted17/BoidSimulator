// some global variables
const MAX_SPEED = 2;
const MAX_FORCE = 1;
const MAX_STEER = 0.1;
const seperationFactor = 20;
const SEPERATION_WEIGHT = 1;
const ALIGNMENT_WEIGHT = 1;
const COHESION_WEIGHT = 1;

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-1, 1), random(-1, 1)); // initial velocity is random
        this.acceleration = createVector();
        this.force = createVector();
        this.neighbors = []; // an array of boids in sight. [[neighbor, distance]...]
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
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
        this.seperate();
        this.align();
        this.cohere();
        this.acceleration.add(this.force);
        this.velocity.add(this.acceleration);
        this.velocity.limit(MAX_SPEED); // scale back velocity if needed
        this.position.add(this.velocity);
        this.force.mult(0); // zero out the force for next iteration
    }

    // defining seperation behaviour
    seperate() {
        if (this.neighbors.length === 0) return;
    
        let steer = createVector();
        let total = 0;
    
        for (let [other, distance] of this.neighbors) {
            if (distance > 0 && distance < seperationFactor) {
                // Vector pointing away from the neighbor
                let diff = p5.Vector.sub(this.position, other.position);
                diff.normalize();
                diff.div(distance); // closer neighbors push harder
                steer.add(diff);
                total++;
            }
        }
    
        if (total > 0) {
            steer.div(total); // average the steer
            steer.setMag(MAX_SPEED);
            steer.sub(this.velocity);
            steer.limit(MAX_STEER); // tweak to control how hard it pushes
            this.force.add(steer.mult(SEPERATION_WEIGHT));
        }
    }

    // defining alginment behaviour
    align() {
        if (this.neighbors.length === 0) return;
    
        let averageVelocity = createVector();
        let total = 0;
    
        for (let [other, distance] of this.neighbors) {
            if (distance > 0) {
                averageVelocity.add(other.velocity);
                total++;
            }
        }
    
        if (total > 0) {
            averageVelocity.div(total); // get average velocity of neighbors
    
            // steering = desired - current velocity
            averageVelocity.setMag(MAX_SPEED); // boid will want to go full speed in the average direction
            let steer = p5.Vector.sub(averageVelocity, this.velocity); // the boid steers to crrect current velocity
            steer.limit(MAX_STEER); // prevent wild steering
            this.force.add(steer.mult(ALIGNMENT_WEIGHT));
        }
    }

    // defining cohesion behaviour
    cohere() {
        if (this.neighbors.length === 0) return;
    
        let averagePosition = createVector();
        let total = 0;
    
        for (let [other, distance] of this.neighbors) {
            if (distance > 0) {
                averagePosition.add(other.position);
                total++;
            }
        }
    
        if (total > 0) {
            averagePosition.div(total); // get average position of neighbors (center of mass)
            let steer = p5.Vector.sub(averagePosition, this.position); // boid will want to steer towards center of mass
            steer.limit(MAX_STEER); // prevent wild steering
            this.force.add(steer.mult(COHESION_WEIGHT));
        }
    }
}