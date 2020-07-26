import {init} from "./initialization.js";
import {prop} from "./property.js";
import {GlobalVars} from "./run.js";
import {Drum} from "./DrumClass.js";

export const app = new PIXI.Application();
app.stage.sortableChildren = true;
document.body.appendChild(app.view);

PIXI.Loader.shared
    .add([
        'images/start_red.png',
        'images/start_green.png',
        "images/cat.png",
        "images/car.png",
        "images/blackberry.png",
        "images/blue_house.png",
        "images/horse.png",
        "images/house.png",
        "images/lens.png",
        "images/monkey.png",
        "images/pistol.png",
        "images/raspberry.png",
    ])
    .load(setup);
export const drums:any[] = [];
function setup():void {
    prop.listSimbols.forEach(function (elem:any, index:number):void {
        drums.push(new Drum(index));
    });
    drums.forEach(function (drum:any, index:number):void {
        drum.initializationDrum(prop.listSimbols[index]);
    });
    init.initFPS();
    init.initStaticZones();
    init.initBtnStart();
    init.autoResizeApp();
    window.addEventListener('resize', init.autoResizeApp.bind(init));
    GlobalVars.state = updatingFunctions.pausePlay;
    app.ticker.add(delta => updatingFunctions.gameLoop(delta));
}

export const updatingFunctions = {
    pausePlay() {},
    gameLoop(delta: any) {
        init.counterFPS.text = PIXI.Ticker.shared.FPS;
        GlobalVars.state(delta);
    }
};