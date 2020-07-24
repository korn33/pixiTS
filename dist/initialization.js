import { app } from "./app.js";
import { prop } from "./property.js";
import { drum } from "./drum.js";
import { GlobalVars } from "./run.js";
export const init = {
    counterFPS: {},
    // textFPS: 0,
    buttonImages: ['images/start_red.jpg', 'images/start_green.png'],
    buttonStartTexture: [],
    btnStart: {},
    initBtnStart() {
        for (let i = 0; i < this.buttonImages.length; i++) {
            let texture = (PIXI.Texture.from(this.buttonImages[i]));
            this.buttonStartTexture.push(texture);
        }
        this.btnStart = new PIXI.AnimatedSprite(this.buttonStartTexture);
        this.btnStart.width = prop.btnStart.width;
        this.btnStart.height = prop.btnStart.height;
        this.btnStart.anchor.set(0.5, 0);
        this.btnStart.animationSpeed = 0.05;
        this.btnStart.play();
        app.stage.addChild(this.btnStart);
        this.btnStart.interactive = true;
        this.btnStart.buttonMode = true;
        this.btnStart.on('pointertap', this.clickOnStart);
    },
    clickOnStart() {
        drum.arrAllSprites.forEach(function (sprite) {
            app.stage.removeChild(sprite);
        });
        drum.printIconsInStartPosition(prop.listSimbols);
        GlobalVars.state = drum.run.bind(drum);
    },
    initFPS() {
        const styleCounterFPS = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 12,
            fill: "white",
        });
        this.counterFPS = new PIXI.Text('', styleCounterFPS);
        app.stage.addChild(this.counterFPS);
        this.counterFPS.anchor.set(1);
    },
    autoResizeApp() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        this.btnStart.x = window.innerWidth / 2;
        this.counterFPS.x = window.innerWidth;
        this.counterFPS.y = window.innerHeight;
    },
};
//# sourceMappingURL=initialization.js.map