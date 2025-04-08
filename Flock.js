class Flock {
    constructor(n) {
        this.boids = [];
        for (let i = 0; i < n; i++) {
            this.boids.push(new Boid());
        }
    }

    // defining an iterator
    [Symbol.iterator]() {
        return this.boids.values();
    }


}