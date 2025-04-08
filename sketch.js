// some global variables
let numberOfBoids = 100;
let flock;


function setup() {
    createCanvas(960, 540);
    flock = new Flock(numberOfBoids);
}

function draw() {
    background(40);

    console.log("DRAWING...")

    flock.updateNeighbors();
    
    for (let boid of flock){
        boid.edges();
        boid.update();
        boid.show();
    }
}