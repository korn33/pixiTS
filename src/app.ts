import {init} from "./initialization.js";
import {prop} from "./property.js";
// import {drum} from "./drum.js";
import {GlobalVars} from "./run.js";
import {Drum} from "./DrumClass.js";

export const app = new PIXI.Application();
app.stage.sortableChildren = true;
document.body.appendChild(app.view);

PIXI.Loader.shared
    .add([
        'images/start_red.jpg',
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
function setup() {
    prop.listSimbols.forEach(function (elem:any, index:number) {
        drums.push(new Drum(index));
    });
    drums.forEach(function (drum:any, index:number) {
        drum.initializationDrum(prop.listSimbols[index]);
    });
    // console.log(drums);
    //drums[0].initializationDrum(prop.listSimbols);
    init.initBtnStart();
    init.initFPS();
    init.initBlackZones();
    init.autoResizeApp();
    window.addEventListener('resize', init.autoResizeApp.bind(init));
    GlobalVars.state = o.play;
    app.ticker.add(delta => o.gameLoop(delta));
}

export const o = {
    play(delta: any) {},
    gameLoop(delta: any) {
        init.counterFPS.text = PIXI.Ticker.shared.FPS;
        GlobalVars.state(delta);
    }
};