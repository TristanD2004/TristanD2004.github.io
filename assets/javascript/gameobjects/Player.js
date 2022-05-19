class Player extends GameObject {
    #feet = null;
    #jumpsLeft = 1;
    #jumped = false;

    constructor(x, y, size) {
        super(x, y, size, size, true);

        loadJSON("assets/images/characters/character_malePerson_sheet.json",
            (allFrames) => {
                let frames = [];
                let spritesheet = null;
                let animation = null;

                frames = [
                    allFrames[37],
                    allFrames[38],
                    allFrames[39],
                    allFrames[40],
                    allFrames[41],
                    allFrames[42],
                    allFrames[43]
                ];
                spritesheet = loadSpriteSheet("assets/images/characters/character_malePerson_sheet.png", frames);
                animation = loadAnimation(spritesheet);
                animation.frameDelay = 90;
                this.addAnimation("walk", animation);

                frames = [
                    allFrames[1]
                ];
                spritesheet = loadSpriteSheet("assets/images/characters/character_malePerson_sheet.png", frames);
                animation = loadAnimation(spritesheet);
                this.addAnimation("jump", animation);

                frames = [
                    allFrames[0]
                ];
                spritesheet = loadSpriteSheet("assets/images/characters/character_malePerson_sheet.png", frames);
                animation = loadAnimation(spritesheet);
                this.addAnimation("idle", animation);

                this.changeAnimation("idle");
            } 
        );
    }

    Update() {
        if (this.#jumpsLeft < 1) {
            this.changeAnimation("jump");
        }
        else if (this.velocity.x < 0.1 && this.velocity.x > -0.1) {
            this.changeAnimation("idle");
        }
        else if (this.velocity.x != 0) {
            this.changeAnimation("walk");
        }
        if (this.animation) {
            this.animation.draw(0, 0);
        }

        this.setSpeed(this.velocity.y + GRAVITY, 90);
        this.#jumped = false;

        
        if (keyIsDown(LEFT_ARROW) === true) {
            this.addSpeed(5, 180);
        }
        if (keyIsDown(RIGHT_ARROW) === true) {
            this.addSpeed(5, 0);
        }
            
        if (keyWentDown(UP_ARROW) === true && this.#jumpsLeft > 0) {
            this.setSpeed(12, -90);
            this.#jumpsLeft--;
            this.#jumped = true;
        }
    }

    Collide(other) {
        if (other instanceof TileFloor) {
            if (this.#jumped === false) {
                this.#jumpsLeft = 1;
            }

            if (this.velocity.y > 0) {
                this.velocity.y = 0;
            }
        }
    }
}