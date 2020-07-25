import { prop } from "./property.js";
export class Drum {
    constructor() {
        this.arrAllSprites = [];
        this.startPoint = prop.btnStart.height + 2.5 * prop.simbols.size;
        this.drumContainer = new PIXI.Container;
        this.correctPositions = [];
    }
}
//# sourceMappingURL=renderDrums.js.map