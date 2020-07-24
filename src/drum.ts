import {app} from "./app.js";
import {prop} from "./property.js";
import {init} from "./initialization.js";

interface iDrum {
    drumContainer: any
    arrAllSprites: any[]
    printIconsInStartPosition: ([]) => void
    initializationDrum: ([]) => void
    run: () => void
    startPoint: number
    speed: number
    timer: number
    move: 'acceleration' | 'constSpeed' | 'slowdown' | 'stop'
    correctPositions: number[]
}

export const drum: iDrum = {
    arrAllSprites: [],
    startPoint: prop.btnStart.height + 2.5 * prop.simbols.size,
    drumContainer: new PIXI.Container,
    correctPositions: [],

    printIconsInStartPosition(arrAddress) {
        const that: any = this;
        this.arrAllSprites = [];
        const listSimbols: string[] = Array.from(arrAddress);
        listSimbols.forEach(function (addres: string, index: number) {
            that.arrAllSprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[addres].texture));
            that.arrAllSprites[index].width = prop.simbols.size;
            that.arrAllSprites[index].height = prop.simbols.size;
            that.arrAllSprites[index].x = window.innerWidth / 2;
            that.arrAllSprites[index].y = prop.btnStart.height + prop.simbols.size + 1.5 * prop.simbols.size * (index + 1);
            that.correctPositions.push(that.arrAllSprites[index].y);
            that.arrAllSprites[index].vy = 0;
            that.drumContainer.addChild(that.arrAllSprites[index]);
        });
    },

    initializationDrum(arrAddress) {
        this.printIconsInStartPosition(arrAddress);
        app.stage.addChild(this.drumContainer);
        this.drumContainer.x = 0;
        const drumFrame = new PIXI.Graphics();
        drumFrame.lineStyle(1, 0xFF3300, 1);
        drumFrame.beginFill(0x66CCFF, 0);
        drumFrame.drawRect(window.innerWidth / 2 - prop.simbols.size/2, prop.btnStart.height + 2 * prop.simbols.size, prop.simbols.size + init.retreatIcons * 2, prop.simbols.size * 3 + init.retreatIcons * 3 - 1);
        drumFrame.endFill();
        drumFrame.zIndex = 1;
        app.stage.addChild(drumFrame);
    },

    speed: prop.drum.startSpeed,
    timer: 0,
    move: 'stop',

    run() {
        const that: any = this;

        app.ticker.add(function (delta: number) {
            switch (that.move) {
                case 'acceleration': {
                    if (that.speed > prop.drum.maxSpeed) {
                        that.speed -= prop.drum.acceleration * delta;
                    } else {
                        that.move = 'constSpeed';
                        that.speed = prop.drum.maxSpeed;
                    }
                    break;
                }
                case 'constSpeed': {
                    if (that.timer < prop.drum.timeOfRotate) {
                        that.timer += delta;
                    } else {
                        that.move = 'slowdown';
                        that.timer = 0;
                    }
                    break;
                }
                case 'slowdown': {
                    if (that.speed < 0) {
                        that.speed += prop.drum.reversAcceleration * delta;
                        // if (that.speed > -0.01) {
                        //
                        //     that.arrAllSprites.forEach((icon:any, index: number) => {
                        //         icon.y = that.correctPositions[index-1];
                        //     });
                        // }
                    } else {
                        that.speed = 0;
                        that.move = 'stop';

                        // that.arrAllSprites.forEach((icon:any, index: number) => {
                        //     icon.y = that.correctPositions[index-1];
                        // });
                        // that.arrAllSprites.forEach((i:any)=>console.log(i.y));

                        // console.log(that.arrAllSprites[0]);
                        // setTimeout(()=>{
                        //     window.location.reload(false);
                        // }, prop.drum.restartTime)

                    }
                    break;
                }
            }
        }, that);


        this.arrAllSprites.forEach(function (sprite: any) {
            sprite.vy = that.speed;
            sprite.y += sprite.vy;
            if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
                // that.arrAllSprites.push(that.arrAllSprites.splice(0, 1)[0]);
                sprite.y = prop.btnStart.height + 6.5 * prop.simbols.size
            }
        });
    }
};