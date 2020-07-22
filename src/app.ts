// import {a} from "./property.js";
// import * as PIXI from 'pixi.js'
// console.log(a);

import {init} from "./initialization.js";

export const app = new PIXI.Application();
document.body.appendChild(app.view);

let state: any;

setup();

function setup() {
    window.addEventListener('load', init.autoResizeApp.bind(init));
    window.addEventListener('resize', init.autoResizeApp.bind(init));

    init.initBtnStart();

    init.initFPS();

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