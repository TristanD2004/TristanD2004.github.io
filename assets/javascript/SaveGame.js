const GRAVITY = 0.4;

class SaveGame extends Game {
    #imgPath = "/assets/javascript/images/objects/";
    #player = null;
    constructor() {
        super();

        this.#player = new Player(100, 100, 40);

        let floors = [];
        for (let i = 0; i < 20; ++i) {
            if (i % 5 == 0)
                floors.push(new Water(i * 70, 382, 70));
            else
                floors.push(new TileFloor(i * 70, 382, 70));
        }

        loadJSON(this.#imgPath + "tiles.json", allFrames => {
            let frames = [];
            let spritesheet = null;
            let animation = null;

            floors.forEach(tile => {
                if (tile instanceof Water)
                    frames = [allFrames[93]];
                else
                    frames = [allFrames[73]];

                spritesheet = loadSpriteSheet(this.#imgPath + 'tiles.png', frames);
                animation = loadAnimation(spritesheet);

                tile.addAnimation("floor", animation);
                tile.changeAnimation("floor");
            });
        });
    }

    get Player() {
        return this.#player;
    }


    Update() {
        super.Update();
        translate(-this.#player.position.x + 100, 0);
        super.Update();
    }
}