import {init} from "./initialization.js";
import {allImgInApp, prop} from "./property.js";
import {GlobalVars} from "./run.js";
import {Drum} from "./DrumClass.js";

export const app = new PIXI.Application();
app.stage.sortableChildren = true;
document.body.appendChild(app.view);

PIXI.Loader.shared
    .add(allImgInApp.links)
    .load(setup);

export const drums:any[] = [];

function setup():void {
    //отрисовка барабанов
    prop.listSimbols.forEach(function (elem:any, index:number):void {
        drums.push(new Drum(index));
    });
    drums.forEach(function (drum:any, index:number):void {
        drum.initializationDrum(prop.listSimbols[index]);
    });
    //отрисовка прочих компонентов приложения и их расстановка
    init.initFPS();
    init.initStaticZones();
    init.initBtnStart();
    // адаптация приложения под разные диагонали
    init.autoResizeApp();
    //установка сцены на пайзу
    GlobalVars.state = updatingFunctions.pausePlay;
    app.ticker.add(delta => updatingFunctions.gameLoop(delta));
}

export const updatingFunctions = {
    pausePlay() {}, //пустая сцена, на которую может переключатся приложение для того чтобы не грузить ресурсы
    gameLoop(delta: any) {
        init.counterFPS.text = PIXI.Ticker.shared.FPS;
        GlobalVars.state(delta);
    }
};