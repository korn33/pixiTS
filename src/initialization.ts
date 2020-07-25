import {app, drums} from "./app.js";
import {prop} from "./property.js";
// import {drum} from "./drum.js";
import {GlobalVars, rotation} from "./run.js";
import {Drum} from "./DrumClass.js";

interface iInit {
    counterFPS: any;
    buttonImages: string[];
    buttonStartTexture: any;
    initBtnStart: () => void;
    btnStart: any;
    initFPS: () => void;
    autoResizeApp: () => void;
    clickOnStart: () => void;
    initBlackZones: () => void;
    retreatIcons: number
    heightIcons: number
    timeOfRotate: number
    startingMoment: number
    begineGreenZone: number
    centerGreenZone: number
}

export const init: iInit = {
    counterFPS: {},
    buttonImages: ['images/start_red.jpg', 'images/start_green.png'],
    buttonStartTexture: [],
    btnStart: {},
    heightIcons: prop.simbols.size,
    retreatIcons: prop.simbols.size / 2,
    timeOfRotate: 0,
    startingMoment: 0,
    begineGreenZone: prop.btnStart.height + 3 * prop.simbols.size + 2 * (prop.simbols.size / 2),
    centerGreenZone: (prop.btnStart.height + 3 * prop.simbols.size + 2 * (prop.simbols.size / 2) +  + 0.5 * prop.simbols.size),

    initBtnStart(): void {
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
        // console.log(this.centerGreenZone);
    },

    clickOnStart() {


        this.startingMoment = Date.now();
        // console.log('that.startingMoment: ', this.startingMoment);
        this.timeOfRotate = prop.drum.minTimeOfRotate + Math.random() * (prop.drum.maxTimeOfRotate - prop.drum.minTimeOfRotate);
        drums.forEach(function (drum, index) {
            drum.arrAllSprites.forEach(function (sprite: any, indexOfSprite: number) {
                // drum.drumContainer.removeChild(sprite);
                sprite.y = prop.btnStart.height + 1.5 * prop.simbols.size + 1.5 * prop.simbols.size * (indexOfSprite + 1);
            });
            // drum.printIconsInStartPosition(prop.listSimbols[index]);
            drum.move = 'acceleration';



            // GlobalVars.state = drum.run.bind(drum, this.timeOfRotate);
        });

        GlobalVars.state = rotation.run.bind(rotation, this.timeOfRotate, this.startingMoment);

    },

    initFPS(): void {
        const styleCounterFPS = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 12,
            fill: "white",
        });
        this.counterFPS = new PIXI.Text('', styleCounterFPS);
        this.counterFPS.anchor.set(1);
        this.counterFPS.zIndex = 2;
        app.stage.addChild(this.counterFPS);
    },

    initBlackZones() {
        const upBlackRectangle = new PIXI.Graphics();
        upBlackRectangle.beginFill(0x000000, 0.8);
        upBlackRectangle.drawRect(0, prop.btnStart.height, window.innerWidth, 2 * prop.simbols.size);
        upBlackRectangle.endFill();
        upBlackRectangle.zIndex = 1;
        app.stage.addChild(upBlackRectangle);

        const downBlackRectangle = new PIXI.Graphics();
        downBlackRectangle.beginFill(0x000000, 0.8);
        downBlackRectangle.drawRect(0, prop.btnStart.height + prop.simbols.size * 4 + this.retreatIcons * 5, window.innerWidth, window.innerHeight - prop.btnStart.height + prop.simbols.size * 4 + this.retreatIcons * 5);
        downBlackRectangle.endFill();
        downBlackRectangle.zIndex = 1;
        app.stage.addChild(downBlackRectangle);

        const winningFrame = new PIXI.Graphics();
        winningFrame.lineStyle(1, 0x3DFF00, 1);
        winningFrame.beginFill(0x66CCFF, 0);
        winningFrame.drawRect(drums[0].arrAllSprites[0].x - prop.simbols.size / 2,
            this.begineGreenZone,
            (prop.simbols.size + init.retreatIcons * 2) * drums.length,
            prop.simbols.size);
        winningFrame.endFill();
        winningFrame.zIndex = 2;
        app.stage.addChild(winningFrame);
    },

    autoResizeApp() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        this.btnStart.x = window.innerWidth / 2;
        this.counterFPS.x = window.innerWidth;
        this.counterFPS.y = window.innerHeight;
    },
};