// some global variables
numberOfBoids = 300;


function setup() {
    createCanvas(960, 540);
    flock = new Flock(numberOfBoids);
}

function draw() {
    background(40);
    
    for (let boid of flock){
        boid.update();
        boid.show();
    }
}