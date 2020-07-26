import { init } from "./initialization.js";
import { allImgInApp, prop } from "./property.js";
import { GlobalVars } from "./run.js";
import { Drum } from "./DrumClass.js";
export const app = new PIXI.Application();
app.stage.sortableChildren = true;
document.body.appendChild(app.view);
PIXI.Loader.shared
    .add(allImgInApp.links)
    .load(setup);
export const drums = [];
function setup() {
    //отрисовка барабанов
    prop.listSimbols.forEach(function (elem, index) {
        drums.push(new Drum(index));
    });
    drums.forEach(function (drum, index) {
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
    pausePlay() { },
    gameLoop(delta) {
        init.counterFPS.text = PIXI.Ticker.shared.FPS;
        GlobalVars.state(delta);
    }
};
//# sourceMappingURL=app.js.map