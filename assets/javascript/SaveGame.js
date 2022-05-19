const GRAVITY = 0.4;

class SaveGame extends Game {
    #player = null;
    #tiles = [];
    #water = [];
    #backgroundImages = [];
    constructor() {
        super();

        this.#player = new Player(100, 100, 40);

        let floors = [];
        for (let i = 0; i < 20; ++i) {
            floors.push(new TileFloor(i * 70, 382, 70));
        }

        loadJSON("/assets/javascript/images/objects/tiles.json", allFrames => {
        let frames = [];
        let spritesheet = null;
        let animation = null;

        frames = [
            allFrames[73],
        ];
        spritesheet = loadSpriteSheet('/assets/javascript/images/objects/tiles.png', frames);
        animation = loadAnimation(spritesheet);

        floors.forEach(tile => { 
            tile.addAnimation("floor", animation);
            tile.changeAnimation("floor");
        });

        // frames = [
        //     allFrames[93]
        // ];
        // spritesheet = loadSpriteSheet('assets/javascript/images/objects/tiles.png', frames);
        // animation = loadAnimation(spritesheet);

        // floors.forEach(tile => { 
        //    tile.addAnimation("liquidWater", animation);
        //    tile.changeAnimation("Water");
        // });

        frames = [
            allFrames[65]
        ];
        spritesheet = loadSpriteSheet('/assets/javascript/images/objects/tiles.png', frames);
        animation = loadAnimation(spritesheet);
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