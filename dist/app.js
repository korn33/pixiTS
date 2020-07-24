// import {a} from "./property.js";
// console.log(a);
import { init } from "./initialization.js";
import { prop } from "./property.js";
import { drum } from "./drum.js";
import { GlobalVars } from "./run.js";
export const app = new PIXI.Application();
app.stage.sortableChildren = true;
document.body.appendChild(app.view);
// export let state: any;
PIXI.Loader.shared
    .add([
    'images/start_red.jpg',
    'images/start_green.png',
    "images/cat.png",
    "images/car.png",
    "images/blackberry.png",
    "images/blue_house.png",
])
    .load(setup);
// let cat: any;
// const hBtn = init.btnStart.height;
// console.log(init.btnStart);
function setup() {
    drum.initializationDrum(prop.listSimbols);
    init.initBtnStart();
    init.initFPS();
    init.autoResizeApp();
    window.addEventListener('resize', init.autoResizeApp.bind(init));
    //Set the game state
    // console.log(state);
    GlobalVars.state = play;
    // GlobalVars.c = 100;
    // console.log(GlobalVars.c);
    // console.log(state);
    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
    // init.textFPS = PIXI.Ticker.shared.FPS;
    init.counterFPS.text = PIXI.Ticker.shared.FPS;
    GlobalVars.state(delta);
}
let o = {
    p() {
        drum.cat.vy = -1;
        drum.cat.y += drum.cat.vy;
    }
};
function play(delta) {
}
//# sourceMappingURL=app.js.map