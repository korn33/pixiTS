import {drums, o} from "./app.js";
import {prop} from "./property.js";
import {init} from "./initialization.js";

export class GlobalVars {
    public static state: any;
}

interface iRotation {
    currentMoment: number
    allDrumsIsStoped: boolean
    winningSymbols: []
    run: (timeOfRotate: number, startingMoment: number) => void
    correctRun: () => void
    testPause: () => void
    winningSymbolsNumber: number[]
}

export const rotation: iRotation = {
    currentMoment: 0,
    allDrumsIsStoped: false,
    winningSymbols: [],
    winningSymbolsNumber: [],

    run(timeOfRotate: number, startingMoment: number) {

        this.currentMoment = Date.now();
        const that: any = this;
        // console.log(timeOfRotate);
        drums.forEach(function (drum, index: number) {

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
                    if ((that.currentMoment - startingMoment) / 1000 > timeOfRotate + index) {
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

        this.allDrumsIsStoped = drums.every(drum => drum.move === 'stop');
        if (this.allDrumsIsStoped) {

            GlobalVars.state = rotation.correctRun.bind(rotation);
        }
    },

    correctRun() {
        const that: any = this;
        this.winningSymbols = [];
        this.winningSymbolsNumber = [];
        // console.log('from', init.begineGreenZone, 'to', init.begineGreenZone + prop.simbols.size);
        drums.forEach(function (drum, indexDrom) {
            const arrDistance: any[] = [];
            drum.arrAllSprites.forEach(function (simbol: any) {
                arrDistance.push({
                    distance: Math.abs((simbol.y - init.centerGreenZone)),
                    numberSign: Math.sign((simbol.y - init.centerGreenZone))
                })
            });
            // console.log(arrDistance); если -1 то нам надо крутить вниз
            let minDistance = {
                distance: arrDistance[0].distance,
                numberSign: arrDistance[0].numberSign
            };
            // let minDistance = arrDistance[0].distance;
            let indexOfMinDistance = {
                index: 0,
                numberSign: 0
            };
            arrDistance.forEach(function (elem: any, index: number) {
                if (elem.distance < minDistance.distance) {
                    minDistance.distance = elem.distance;
                    indexOfMinDistance.index = index;
                    indexOfMinDistance.numberSign = elem.numberSign;
                }
            });
            // console.log(arrDistance[indexOfMinDistance.index]);
            that.winningSymbolsNumber.push(indexOfMinDistance);
            // let nearestDistance = Math.abs((drum.arrAllSprites[0].y - init.centerGreenZone));
            // console.log('indexDrom:', indexDrom, 'nearestDistance', nearestDistance, 'simbol', drum.arrAllSprites[0]._texture.textureCacheIds[0]);
            // let nearestNumber = drum.arrAllSprites[0].y;
            // console.log('nearestDistance = drum.arrAllSprites[0].y', nearestDistance);
            // drum.arrAllSprites.forEach(function (simbol: any, indexSimbol: number) {
            //     if ((Math.abs((simbol.y - nearestDistance)) < (Math.abs((simbol.y - init.centerGreenZone))))) {
            //         nearestDistance = Math.abs((simbol.y - nearestDistance));
            //         nearestNumber = drum.arrAllSprites[0].y;
            //     }
            // });
            //
            // that.winningSymbols.push(nearestNumber);

            // if ((simbol.y >= init.begineGreenZone) && (simbol.y <= init.begineGreenZone + prop.simbols.size) && (that.winningSymbols.length <= drums.length)) {
            //     console.log("drums.length: ", drums.length, 'index drum: ', indexDrom, simbol._texture.textureCacheIds[0], simbol.y);
            //     that.winningSymbols.push(simbol._texture.textureCacheIds[0]);
            //     // flag = false;
            // }
        });
        // });

        this.winningSymbolsNumber.forEach(function (simbolNumber: any, index: number) {
            //drums.forEach(function (drum) {
            drums[index].arrAllSprites.forEach(function (sprite: any, indexOfSprite: number) {
                if (indexOfSprite === simbolNumber.index) {
                    // that.winningSymbols.push(sprite);
                    that.winningSymbols.push({
                        texture: sprite._texture.textureCacheIds[0],
                        // sprite: sprite,
                        numberSign: simbolNumber.numberSign,
                        indexDrum: index
                    });
                }
            })
            //})
        });


        // drums.forEach(function (drum, index) {
        //    drum.arrAllSprites.forEach(function (sprite:any) {
        //        sprite.y += that.winningSymbols[index].numberSign;
        //        // console.log(that.winningSymbols[index].sprite.y)
        //    })
        // })

        // this.winningSymbols.forEach(function (currentWinningSimbol: any) {
        //     // if (currentWinningSimbol.numberSign === -1) {
        //         drums.forEach(function (drum: any) {
        //             drum.arrAllSprites.forEach(function (simbol: any) {
        //                 if (currentWinningSimbol.sprite.y < init.centerGreenZone) {
        //                     simbol.vy = 0.5 * currentWinningSimbol.numberSign;
        //                     simbol.y += simbol.vy;
        //                 }
        //             })
        //         })
        //     // }
        //     // else {
        //     //     drums.forEach(function (drum: any) {
        //     //         drum.arrAllSprites.forEach(function (simbol: any) {
        //     //             if (currentWinningSimbol.sprite.y > init.centerGreenZone) {
        //     //                 simbol.vy = -0.5;
        //     //                 simbol.y += simbol.vy;
        //     //             }
        //     //         })
        //     //     })
        //     // }
        // });

        // this.winningSymbols.forEach(function (currentWinningSimbol: any) {
        //     if (currentWinningSimbol.sprite.y === init.centerGreenZone)  {
        //         console.log(that.winningSymbols);
        //         GlobalVars.state = rotation.testPause;
        //     }
        // });

        if (this.winningSymbols.length >= drums.length) {
            console.log(that.winningSymbols);
            GlobalVars.state = rotation.testPause;
        }


    },

    testPause() {

    }
};
