// import {a} from "./property.js";

// console.log(a);

import {init} from "./initialization.js";

export const app = new PIXI.Application();
document.body.appendChild(app.view);

let state: any;

PIXI.Loader.shared
    .add([
        'images/start_red.jpg',
        'images/start_green.png'
    ])
    .load(setup);

function setup() {
    init.initBtnStart();
    init.initFPS();
    init.autoResizeApp();
    window.addEventListener('resize', init.autoResizeApp.bind(init));
    //Set the game state
    state = play;
    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta: any) {
    state(delta);
}

function play(delta: any) {
    init.textFPS = PIXI.Ticker.shared.FPS;
    init.counterFPS.text = init.textFPS;
}