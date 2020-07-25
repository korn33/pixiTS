import {drums} from "./app.js";
import {prop} from "./property.js";
import {init} from "./initialization.js";

export class GlobalVars {
    public static state: any;
}

export const rotation = {
    currentMoment: 0,

    run (timeOfRotate: number, startingMoment: number) {
        this.currentMoment = Date.now();
        const that: any = this;
        // console.log(timeOfRotate);
        drums.forEach(function (drum, index:number) {

            switch (drum.move) {
                case 'acceleration': {
                    if (drum.speed > prop.drum.maxSpeed) {

                        drum.speed -= prop.drum.acceleration * (that.currentMoment - startingMoment) / 1000;
                        // console.log('acceleration, speed:', drum.speed);
                        // console.log('t: ', (that.currentMoment - startingMoment) / 1000);
                        // console.log('that.currentMoment: ', that.currentMoment);
                        // console.log('that.startingMoment: ', startingMoment);

                    } else {
                        drum.move = 'constSpeed';
                        drum.speed = prop.drum.maxSpeed;
                        // console.log('acceleration, speed:', drum.speed);
                    }
                    break;
                }
                case 'constSpeed': {
                    if ((that.currentMoment - startingMoment) / 1000 > timeOfRotate) {
                        // console.log((that.currentMoment - startingMoment) / 1000 > timeOfRotate);
                        drum.move = 'slowdown';
                        drum.timer = 0;
                        // console.log('constSpeed', drum.timer);
                    }
                    break;
                }
                case 'slowdown': {
                    if (drum.speed < 0) {
                        drum.speed += prop.drum.reversAcceleration * (that.currentMoment - startingMoment) / 1000;
                        // console.log('slowdown', drum.speed);
                    } else {
                        drum.speed = 0;
                        drum.move = 'stop';
                        // console.log('stop, drum.speed:', drum.speed);
                    }
                    break;
                }
            }
            drum.arrAllSprites.forEach(function (sprite: any) {
                sprite.vy = drum.speed;
                sprite.y += sprite.vy;
                if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
                    // drum.arrAllSprites.push(drum.arrAllSprites.splice(0, 1)[0]);
                    sprite.y = prop.btnStart.height + prop.listSimbols[index].length * (prop.simbols.size + init.retreatIcons) + init.retreatIcons;
                }
            });
        });
    }
};
