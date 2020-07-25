import { prop } from "./property.js";
import {app} from "./app.js";
import {init} from "./initialization.js";

export class Drum {
    drumContainer: any;
    arrAllSprites: any[];
    startPoint: number;
    speed: number;
    timer: number;
    move: 'acceleration' | 'constSpeed' | 'slowdown' | 'stop';
    correctPositions: number[];
    startingMoment: number;
    currentMoment: number;

    constructor(public indexThisDrum:number) {
        this.arrAllSprites = [];
        this.startPoint = prop.btnStart.height + 2.5 * prop.simbols.size;
        this.drumContainer = new PIXI.Container;
        this.correctPositions = [];
        this.speed = prop.drum.startSpeed;
        this.timer = 0;
        this.move = 'stop';
        this.startingMoment = 0;
        this.currentMoment = 0;

    };

    printIconsInStartPosition(arrAddress: string[]) {
        const that: any = this;
        const listSimbols: string[] = Array.from(arrAddress);
        listSimbols.forEach(function (addres: string, index: number) {
            that.arrAllSprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[addres].texture));
            that.arrAllSprites[index].width = prop.simbols.size;
            that.arrAllSprites[index].height = prop.simbols.size;
            that.arrAllSprites[index].x = (window.innerWidth / 2 - (prop.listSimbols.length * prop.simbols.size + 2 * init.retreatIcons) / 2) + that.indexThisDrum * (prop.simbols.size + 2 * init.retreatIcons);
            that.arrAllSprites[index].y = prop.btnStart.height + prop.simbols.size + 1.5 * prop.simbols.size * (index + 1);
            that.correctPositions.push(that.arrAllSprites[index].y);
            that.arrAllSprites[index].vy = 0;
            that.drumContainer.addChild(that.arrAllSprites[index]);
        });
    };

    initializationDrum(arrAddress: string[]) {
        this.printIconsInStartPosition(arrAddress);
        app.stage.addChild(this.drumContainer);
        // this.drumContainer.x = 0;
        const drumFrame = new PIXI.Graphics();
        drumFrame.lineStyle(1, 0xFF3300, 1);
        drumFrame.beginFill(0x66CCFF, 0);
        drumFrame.drawRect(this.arrAllSprites[0].x - prop.simbols.size / 2, prop.btnStart.height + 2 * prop.simbols.size, prop.simbols.size + init.retreatIcons * 2, prop.simbols.size * 3 + init.retreatIcons * 3 - 1);
        drumFrame.endFill();
        drumFrame.zIndex = 1;
        app.stage.addChild(drumFrame);
    };

    run(timeOfRotate: number) {
        const that: any = this;
        this.currentMoment = Date.now();
        // switch (that.move) {
        //     case 'acceleration': {
        //         if (that.speed > prop.drum.maxSpeed) {
        //             that.speed -= prop.drum.acceleration * (this.currentMoment - this.startingMoment) / 1000;
        //         } else {
        //             that.move = 'constSpeed';
        //             that.speed = prop.drum.maxSpeed;
        //         }
        //         break;
        //     }
        //     case 'constSpeed': {
        //         if ((this.currentMoment - this.startingMoment) / 1000 > timeOfRotate) {
        //             that.move = 'slowdown';
        //             that.timer = 0;
        //         }
        //         break;
        //     }
        //     case 'slowdown': {
        //         if (that.speed < 0) {
        //             that.speed += prop.drum.reversAcceleration * (this.currentMoment - this.startingMoment) / 1000;
        //         } else {
        //             that.speed = 0;
        //             that.move = 'stop';
        //         }
        //         break;
        //     }
        // }

        this.arrAllSprites.forEach(function (sprite: any, index:number) {
            sprite.vy = that.speed;
            sprite.y += sprite.vy;
            if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
                that.arrAllSprites.push(that.arrAllSprites.splice(0, 1)[0]);
                sprite.y = prop.btnStart.height + prop.listSimbols.length * (prop.simbols.size + init.retreatIcons) + init.retreatIcons;
            }
        });
    }
}