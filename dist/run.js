import { drums } from "./app.js";
import { prop } from "./property.js";
import { init } from "./initialization.js";
export class GlobalVars {
}
export const rotation = {
    currentMoment: 0,
    allDrumsIsStoped: false,
    allDrumsIsCurrectid: false,
    winningSymbols: [],
    winningSymbolsNumber: [],
    run(timeOfRotate, startingMoment) {
        this.currentMoment = Date.now();
        const that = this;
        // console.log(timeOfRotate);
        drums.forEach(function (drum, index) {
            switch (drum.move) {
                case 'acceleration': {
                    if (drum.speed > prop.drum.maxSpeed) {
                        drum.speed -= prop.drum.acceleration * (that.currentMoment - startingMoment) / 1000;
                        // console.log('acceleration, speed:', drum.speed);
                        // console.log('t: ', (that.currentMoment - startingMoment) / 1000);
                        // console.log('that.currentMoment: ', that.currentMoment);
                        // console.log('that.startingMoment: ', startingMoment);
                    }
                    else {
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
                    }
                    else {
                        drum.speed = 0;
                        drum.move = 'stop';
                        // console.log('stop, drum.speed:', drum.speed);
                    }
                    break;
                }
            }
            drum.arrAllSprites.forEach(function (sprite) {
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
            drums.forEach(drum => drum.speed = prop.drum.speedForCorrected);
            GlobalVars.state = rotation.correctRun.bind(rotation);
        }
    },
    getSign(value) {
        if (value > 0) {
            return 1;
        }
        else if (value < 0) {
            return -1;
        }
        else
            return 0;
    },
    correctRun() {
        const that = this;
        this.winningSymbols = [];
        this.winningSymbolsNumber = [];
        // console.log('from', init.begineGreenZone, 'to', init.begineGreenZone + prop.simbols.size);
        drums.forEach(function (drum, indexDrom) {
            const arrDistance = [];
            drum.arrAllSprites.forEach(function (simbol) {
                arrDistance.push({
                    distance: Math.abs((simbol.y - init.centerGreenZone)),
                    numberSign: that.getSign((simbol.y - init.centerGreenZone))
                });
            });
            // console.log(arrDistance); если -1 то нам надо крутить вниз
            let minDistance = {
                distance: arrDistance[0].distance,
                numberSign: arrDistance[0].numberSign
            };
            // let minDistance = arrDistance[0].distance;
            let indexOfMinDistance = {
                minDistance: arrDistance[0].distance,
                index: 0,
                numberSign: 0
            };
            arrDistance.forEach(function (elem, index) {
                if (elem.distance < minDistance.distance) {
                    minDistance.distance = elem.distance;
                    indexOfMinDistance.index = index;
                    indexOfMinDistance.numberSign = elem.numberSign;
                    indexOfMinDistance.minDistance = elem.distance;
                }
            });
            // console.log(arrDistance[indexOfMinDistance.index]);
            that.winningSymbolsNumber.push(indexOfMinDistance);
        });
        this.winningSymbolsNumber.forEach(function (simbolNumber, index) {
            //drums.forEach(function (drum) {
            drums[index].arrAllSprites.forEach(function (sprite, indexOfSprite) {
                if (indexOfSprite === simbolNumber.index) {
                    // that.winningSymbols.push(sprite);
                    that.winningSymbols.push({
                        texture: sprite._texture.textureCacheIds[0],
                        sprite: sprite,
                        numberSign: that.getSign((sprite.y - init.centerGreenZone)),
                        indexDrum: index,
                        minDistance: simbolNumber.minDistance,
                        centerY: simbolNumber.minDistance + sprite.y
                    });
                }
            });
            //})
        });
        drums.forEach(function (drum, numberDrum) {
            drum.arrAllSprites.forEach(function (sprite) {
                // console.log(numberDrum, sprite);
                sprite.vy = drum.speed * that.winningSymbols[numberDrum].numberSign;
                sprite.y += sprite.vy;
                if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
                    sprite.y = prop.btnStart.height + prop.listSimbols[numberDrum].length * (prop.simbols.size + init.retreatIcons) + init.retreatIcons;
                }
                if (that.winningSymbols[numberDrum].numberSign === 1) {
                    if (that.winningSymbols[numberDrum].sprite.y < init.centerGreenZone) {
                        drum.speed = 0;
                    }
                }
                else if (that.winningSymbols[numberDrum].numberSign === -1) {
                    if (that.winningSymbols[numberDrum].sprite.y > init.centerGreenZone) {
                        drum.speed = 0;
                    }
                }
                else
                    drum.speed = 0;
            });
        });
        // this.winningSymbols.forEach(simbol=> {
        //     this.allDrumsIsCurrectid = simbol.sprite.y === 0
        // });
        this.allDrumsIsCurrectid = this.winningSymbols.every((simbol) => simbol.sprite.vy === 0);
        if (this.allDrumsIsCurrectid) {
            console.log(that.winningSymbols);
            GlobalVars.state = rotation.testPause;
        }
    },
    testPause() {
    }
};
//# sourceMappingURL=run.js.map