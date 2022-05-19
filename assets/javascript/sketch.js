let saveGame = null;

function setup() {
    createCanvas(800, 400);

    saveGame = new SaveGame();
}

function draw() {
    saveGame.Update();
}