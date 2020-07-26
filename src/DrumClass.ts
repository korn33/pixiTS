import { prop } from "./property.js";
import {app, drums} from "./app.js";
import {init} from "./initialization.js";

export class Drum {
    drumContainer: any;
    arrAllSprites: any[];
    speed: number;
    timer: number;
    move: 'acceleration' | 'constSpeed' | 'slowdown' | 'stop';
    correctPositions: number[];
    startingMoment: number;

    constructor(public indexThisDrum:number) {
        this.arrAllSprites = [];
        this.drumContainer = new PIXI.Container;
        this.correctPositions = [];
        this.speed = prop.drum.startSpeed;
        this.timer = 0;
        this.move = 'stop';
        this.startingMoment = 0;
    };

    private printIconsInStartPosition(arrAddress: string[]):void {
        const that: any = this;
        const listSimbols: string[] = Array.from(arrAddress);
        listSimbols.forEach(function (addres: string, index: number):void {
            that.arrAllSprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[addres].texture));
            that.arrAllSprites[index].width = prop.simbols.size;
            that.arrAllSprites[index].height = prop.simbols.size;
            that.arrAllSprites[index].anchor.set(0, 0.5);
            that.arrAllSprites[index].x = (window.innerWidth / 2 - prop.simbols.size * drums.length + that.indexThisDrum * 2 * prop.simbols.size + 0.5 * prop.simbols.size);
            that.arrAllSprites[index].y = prop.btnStart.height + 1.5 * prop.simbols.size + 1.5 * prop.simbols.size * (index + 1);
            that.correctPositions.push(that.arrAllSprites[index].y);
            that.arrAllSprites[index].vy = 0;
            that.drumContainer.addChild(that.arrAllSprites[index]);
        });
    };

    initializationDrum(arrAddress: string[]) {
        this.printIconsInStartPosition(arrAddress);
        app.stage.addChild(this.drumContainer);
        const drumFrame = new PIXI.Graphics();
        drumFrame.lineStyle(1, 0xFF3300, 1);
        drumFrame.beginFill(0x66CCFF, 0);
        drumFrame.drawRect(this.arrAllSprites[0].x - prop.simbols.size / 2,
            prop.btnStart.height + 2 * prop.simbols.size,
            prop.simbols.size + init.retreatIcons * 2,
            prop.simbols.size * 3 + init.retreatIcons * 4 - 1 );
        drumFrame.endFill();
        drumFrame.zIndex = 1;
        app.stage.addChild(drumFrame);
    };
}