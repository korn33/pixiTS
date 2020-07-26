import { drums, updatingFunctions } from "./app.js";
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
        drums.forEach(function (drum, index) {
            switch (drum.move) {
                case 'acceleration': {
                    if (drum.speed > prop.drum.maxSpeed) {
                        drum.speed -= prop.drum.acceleration * (that.currentMoment - startingMoment) / 1000;
                    }
                    else {
                        drum.move = 'constSpeed';
                        drum.speed = prop.drum.maxSpeed;
                    }
                    break;
                }
                case 'constSpeed': {
                    // для того чтобы гарантированно выиграть, можно удалить " + index * prop.drum.rotationalDelayFactor" и сделать наполнение барабанов одинаковым
                    if ((that.currentMoment - startingMoment) / 1000 > timeOfRotate + index * prop.drum.rotationalDelayFactor) {
                        drum.move = 'slowdown';
                        drum.timer = 0;
                    }
                    break;
                }
                case 'slowdown': {
                    if (drum.speed < 0) {
                        drum.speed += prop.drum.reversAcceleration * (that.currentMoment - startingMoment) / 1000;
                    }
                    else {
                        drum.speed = 0;
                        drum.move = 'stop';
                    }
                    break;
                }
            }
            drum.arrAllSprites.forEach(function (sprite) {
                sprite.vy = drum.speed;
                sprite.y += sprite.vy;
                if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
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
    //определение того, выше символ центра барабана, ниже или в центре
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
        drums.forEach(function (drum) {
            //создание массива из расстояний от каждого символа до центра барабана
            const arrDistance = [];
            drum.arrAllSprites.forEach(function (simbol) {
                arrDistance.push({
                    distance: Math.abs((simbol.y - init.centerGreenZone)),
                    numberSign: that.getSign((simbol.y - init.centerGreenZone))
                });
            });
            //нахождение индекса символа с наименьшей дистанцией
            let minDistance = {
                distance: arrDistance[0].distance,
                numberSign: arrDistance[0].numberSign
            };
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
            //создаем массив из таких индексов ближайших символов (по одному символу на барабан)
            that.winningSymbolsNumber.push(indexOfMinDistance);
        });
        //заполняем массив выигрыша объектами, содержашие данные о каждом выигрышном символе
        this.winningSymbolsNumber.forEach(function (simbolNumber, index) {
            //индекс символа в массиве равен номеру его барабана
            drums[index].arrAllSprites.forEach(function (sprite, indexOfSprite) {
                if (indexOfSprite === simbolNumber.index) {
                    that.winningSymbols.push({
                        texture: sprite._texture.textureCacheIds[0],
                        sprite: sprite,
                        numberSign: that.getSign((sprite.y - init.centerGreenZone)),
                    });
                }
            });
        });
        // Так как эта функция запускается постоянно, то свойство numberSign постоянно пересчитывается.
        // Крутим барабаны до тех пор, пока у найденных в предыдущем шаге символов
        // свойство numberSign не станет нулем (что значит что символ в центре).
        // Тогда и скорость этого символа обнуляется: sprite.vy = drum.speed * 0.
        drums.forEach(function (drum, numberDrum) {
            drum.arrAllSprites.forEach(function (sprite) {
                sprite.vy = drum.speed * that.winningSymbols[numberDrum].numberSign;
                sprite.y += sprite.vy;
                if (sprite.y <= prop.btnStart.height + prop.simbols.size / 2) {
                    sprite.y = prop.btnStart.height + prop.listSimbols[numberDrum].length * (prop.simbols.size + init.retreatIcons) + init.retreatIcons;
                }
                // если символ ниже центральной точки, то обнулим скорость всего барабана
                // и тогда скорость спрайтов будет 0 не зависимо от numberSign: sprite.vy = 0 * that.winningSymbols[numberDrum].numberSign
                if (that.winningSymbols[numberDrum].numberSign === 1) {
                    if (that.winningSymbols[numberDrum].sprite.y < init.centerGreenZone) {
                        drum.speed = 0;
                    }
                    // то же для символов выше центра и находящихся в центре
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
        this.allDrumsIsCurrectid = this.winningSymbols.every((simbol) => simbol.sprite.vy === 0);
        // если скорость всех спрайтов равна 0
        if (this.allDrumsIsCurrectid) {
            //сравниваем названия текстур у всех центральных символов
            const firstSimbol = this.winningSymbols[0].texture;
            if (this.winningSymbols.every(icon => icon.texture === firstSimbol)) {
                init.endGameMessage.text = 'Вы выиграли!';
            }
            else {
                init.endGameMessage.text = `Вы не выиграли 
Попробуйте еще раз`;
            }
            GlobalVars.state = updatingFunctions.pausePlay;
        }
    },
};
//# sourceMappingURL=run.js.map