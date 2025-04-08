// some global variables
let numberOfBoids = 500;
let flock;

// sliders
let maxSpeedSlider, maxForceSlider;
let sepRadiusSlider, alignRadiusSlider, cohRadiusSlider;
let sepWeightSlider, alignWeightSlider, cohWeightSlider;

let debugCheckbox;


function setup() {

    createCanvas(600, 400);
    // <sliders>
    // Row 1: max speed & force
    let row1 = createDiv().style('display', 'flex').style('gap', '12px');
    row1.child(createDiv("Max Speed"));
    row1.child(maxSpeedSlider = createSlider(0, 10, 5, 0.1));
    row1.child(createDiv("Max Force"));
    row1.child(maxForceSlider = createSlider(0, 2, 0.5, 0.05));

    // Row 2: radii
    let row2 = createDiv().style('display', 'flex').style('gap', '12px');
    row2.child(createDiv("Separation Radius"));
    row2.child(sepRadiusSlider = createSlider(0, 100, 25, 1));
    row2.child(createDiv("Cohesion Radius"));
    row2.child(cohRadiusSlider = createSlider(0, 100, 50, 1));
    row2.child(createDiv("Alignment Radius"));
    row2.child(alignRadiusSlider = createSlider(0, 100, 25, 1));

    // Row 3: weights
    let row3 = createDiv().style('display', 'flex').style('gap', '12px');
    row3.child(createDiv("Separation Weight"));
    row3.child(sepWeightSlider = createSlider(0, 5, 2.0, 0.1));
    row3.child(createDiv("Cohesion Weight"));
    row3.child(cohWeightSlider = createSlider(0, 5, 1.3, 0.1));
    row3.child(createDiv("Alignment Weight"));
    row3.child(alignWeightSlider = createSlider(0, 5, 1.0, 0.1));
    // </sliders>

    // Row 4: debug toggle
    let row4 = createDiv().style('display', 'flex').style('align-items', 'center').style('gap', '12px');
    debugCheckbox = createCheckbox('Debug', false);
    row4.child(debugCheckbox);

    flock = new Flock(numberOfBoids);
}

function draw() {
    background(0);

    // Update behavior constants from sliders
    Boid.updateGlobals({
        maxSpeed: maxSpeedSlider.value(),
        maxForce: maxForceSlider.value(),
        sepRadius: sepRadiusSlider.value(),
        alignRadius: alignRadiusSlider.value(),
        cohRadius: cohRadiusSlider.value(),
        sepWeight: sepWeightSlider.value(),
        alignWeight: alignWeightSlider.value(),
        cohWeight: cohWeightSlider.value()
    });

    debug = debugCheckbox.checked();

    flock.updateNeighbors();

    for (let boid of flock) {
        boid.edges();
        boid.update();
        boid.show();
    }
}