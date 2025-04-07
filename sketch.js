const flock = []

function setup() {
    createCanvas(960, 540);
    flock.push(new Boid());
}

function draw() {
    background(40);

    for (let boid of flock){
        boid.update();
        boid.show();
    }
}