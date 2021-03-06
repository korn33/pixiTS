import {app, drums} from "./app.js";
import {prop} from "./property.js";
import {GlobalVars, rotation} from "./run.js";

interface iInit {
    counterFPS: any;
    buttonImages: string[];
    buttonStartTexture: any;
    initBtnStart: () => void;
    btnStart: any;
    initFPS: () => void;
    autoResizeApp: () => void;
    clickOnStart: () => void;
    initStaticZones: () => void;
    retreatIcons: number
    heightIcons: number
    timeOfRotate: number
    startingMoment: number
    begineGreenZone: number
    centerGreenZone: number
    winningFrame: any
    endGameMessage: any
}

export const init: iInit = {
    counterFPS: {},
    buttonImages: ['images/start_red.png', 'images/start_green.png'],
    buttonStartTexture: [],
    btnStart: {},
    heightIcons: prop.simbols.size,
    retreatIcons: prop.simbols.size / 2,
    timeOfRotate: 0,
    startingMoment: 0,
    begineGreenZone: prop.btnStart.height + 3 * prop.simbols.size + 2 * (prop.simbols.size / 2),
    centerGreenZone: (prop.btnStart.height + 3 * prop.simbols.size + 2 * (prop.simbols.size / 2) + 0.5 * prop.simbols.size),
    winningFrame: {},
    endGameMessage: {},

    initBtnStart(): void {
        const that: any = this;
        this.buttonImages.forEach(function (img):void {
            let texture = (PIXI.Texture.from(img));
            that.buttonStartTexture.push(texture);
        });
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
        init.endGameMessage.text = '';
        this.startingMoment = Date.now();
        this.timeOfRotate = prop.drum.minTimeOfRotate + Math.random() * (prop.drum.maxTimeOfRotate - prop.drum.minTimeOfRotate + 1);
        drums.forEach(function (drum) {
            // при нажатии на кнопку вращение запускается со стартового положения иконок
            drum.arrAllSprites.forEach(function (sprite: any, indexOfSprite: number) {
                sprite.y = prop.btnStart.height + 1.5 * prop.simbols.size + 1.5 * prop.simbols.size * (indexOfSprite + 1);
            });
            //команда на ускорение
            drum.move = 'acceleration';
        });
        //включение сцены вращения барабанов
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

    initStaticZones() {
        const upBlackRectangle = new PIXI.Graphics();
        upBlackRectangle.beginFill(0x000000, 1);
        upBlackRectangle.drawRect(0, prop.btnStart.height, window.innerWidth, 2 * prop.simbols.size);
        upBlackRectangle.endFill();
        upBlackRectangle.zIndex = 1;
        app.stage.addChild(upBlackRectangle);

        const downBlackRectangle = new PIXI.Graphics();
        downBlackRectangle.beginFill(0x000000, 1);
        downBlackRectangle.drawRect(0,
            prop.btnStart.height + prop.simbols.size * 4 + this.retreatIcons * 6,
            window.innerWidth,
            window.innerHeight - prop.btnStart.height + prop.simbols.size * 4 + this.retreatIcons * 5);
        downBlackRectangle.endFill();
        downBlackRectangle.zIndex = 1;
        app.stage.addChild(downBlackRectangle);

        this.winningFrame = new PIXI.Graphics();
        this.winningFrame.lineStyle(3, 0x3DFF00, 0.5);
        this.winningFrame.beginFill(0x66CCFF, 0);
        this.winningFrame.drawRect(drums[0].arrAllSprites[0].x - prop.simbols.size / 2,
            this.begineGreenZone,
            (prop.simbols.size + init.retreatIcons * 2) * drums.length,
            prop.simbols.size);
        this.winningFrame.endFill();
        this.winningFrame.zIndex = 2;
        app.stage.addChild(this.winningFrame);

        const styleEndGameMessage = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 24,
            fill: "gold",
            align: "center"
        });
        this.endGameMessage = new PIXI.Text('', styleEndGameMessage);
        this.endGameMessage.anchor.set(0.5, 0);
        this.endGameMessage.zIndex = 3;
        app.stage.addChild(this.endGameMessage);
    },

    autoResizeApp() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        this.btnStart.x = window.innerWidth / 2;
        this.counterFPS.x = window.innerWidth;
        this.counterFPS.y = window.innerHeight;
        this.endGameMessage.x = window.innerWidth / 2;
        this.endGameMessage.y = prop.btnStart.height + prop.simbols.size * 5 + this.retreatIcons * 6
    },
};