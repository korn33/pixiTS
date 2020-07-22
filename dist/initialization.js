import { app } from "./app.js";
export const init = {
    counterFPS: {},
    textFPS: 0,
    buttonImages: ['images/start_red.jpg', 'images/start_green.png'],
    buttonStartTexture: [],
    btnStart: {},
    initBtnStart() {
        for (let i = 0; i < this.buttonImages.length; i++) {
            let texture = (PIXI.Texture.from(this.buttonImages[i]));
            this.buttonStartTexture.push(texture);
        }
        this.btnStart = new PIXI.AnimatedSprite(this.buttonStartTexture);
        this.btnStart.width = 100;
        this.btnStart.height = 50;
        this.btnStart.anchor.set(0.5, 0);
        this.btnStart.animationSpeed = 0.05;
        this.btnStart.play();
        app.stage.addChild(this.btnStart);
        this.btnStart.interactive = true;
        this.btnStart.buttonMode = true;
        this.btnStart.on('pointertap', this.clickOnStart);
    },
    clickOnStart() {
        console.log('click');
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