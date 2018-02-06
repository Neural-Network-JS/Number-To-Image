/*

    inputs : 3 (X,O,EMPTY)
    layers : 1 (9)
    outputs : 3 (WIN,LOSE,DRAW)

*/

let predictCounter = 0;
let number = 0;

let p;

let training_data;

let nn = new NeuralNetwork(1,15,15);

function setup() {
    createCanvas(300, 500);
    training_data = loadJSON("data.json");

    p = createP();
}

function draw() {
    predictCounter++;

    if(training_data.data){
        for(let i=0;i<10;i++){
            let data = random(training_data.data);
            nn.train(data.inputs,data.targets);   
        }
    }

    if(predictCounter > 100){
        p.html("Predicting " + number);
        let output = nn.predict([number]);
        output.forEach((value,index) => {
            let row = index / 3 | 0;
            let col = index % 3;
            let x = col * 100;
            let y = row * 100;
            fill(255 - value * 255);
            noStroke();
            rect(x,y,100,100);
        });
        predictCounter = 0;
        number++;
        if(number > 9) number = 0;
    }
}
