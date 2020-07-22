import {a} from "./property.js";

const app = new PIXI.Application();
document.body.appendChild(app.view);

console.log(a);


let state: any, counterFPS: any, textFPS: number;

setup();

function setup() {
//change size app
    const autoResizeApp = function (): void {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('load', autoResizeApp);
    window.addEventListener('resize', autoResizeApp);

//FPS
    const styleCounterFPS = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 12,
        fill: "white",
    });
    counterFPS = new PIXI.Text('', styleCounterFPS);
    app.stage.addChild(counterFPS);

//Set the game state
    state = play;
    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

// функция, которая срабатывает 60 раз в секунду
function gameLoop(delta: any) {
    //Update the current game state:
    state(delta);
}

function play(delta) {
    textFPS = PIXI.Ticker.shared.FPS;
    counterFPS.text = textFPS;
}