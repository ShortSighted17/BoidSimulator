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

    updateNeighbors() {
        const sight = 25;
    
        for (let boid of this.boids) {
            boid.neighbors = []; // clear previous neighbors
    
            for (let other of this.boids) {
                if (boid !== other) {
                    let d = dist(
                        boid.position.x, boid.position.y,
                        other.position.x, other.position.y
                    );
                    if (d <= sight) {
                        boid.neighbors.push([other, d]); // tuple: [boid, distance]
                    }
                }
            }
        }
    }
}