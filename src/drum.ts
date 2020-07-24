import {app} from "./app.js";
import {prop} from "./property.js";

interface iDrum {
    cat:any
    car:any
    blackberry:any
    blue_house: any
    arrAllSprites: any[]
    printIconsInStartPosition: ([])=> void
    initializationDrum: ([])=> void
    run: ()=> void
    startPoint: number,
}

export const drum: iDrum = {
    cat:{},
    car:{},
    blackberry:{},
    blue_house:{},
    arrAllSprites: [],
    startPoint: prop.btnStart.height + 2.5*prop.simbols.height,


    printIconsInStartPosition(arrAddress) {
        const that = this;
        this.arrAllSprites = [];
        const listSimbols = Array.from(arrAddress);
        listSimbols.forEach(function (addres:string, index: number) {
            that.arrAllSprites.push(new PIXI.Sprite(PIXI.Loader.shared.resources[addres].texture));
            that.arrAllSprites[index].width = prop.simbols.width;
            that.arrAllSprites[index].height = prop.simbols.height;
            that.arrAllSprites[index].x = window.innerWidth / 2;
            that.arrAllSprites[index].y = prop.btnStart.height + prop.simbols.height + 1.5*prop.simbols.height*(index+1);
            // console.log(prop.btnStart.height + prop.simbols.height + 1.5*prop.simbols.height*(index+1));
            that.arrAllSprites[index].vy = 0;
            app.stage.addChild(that.arrAllSprites[index]);
        });
    },

    initializationDrum(arrAddress) {
        this.printIconsInStartPosition(arrAddress);
        // console.log(this.arrAllSprites[this.arrAllSprites.length-1].y);
        // console.log(prop.btnStart.height + prop.simbols.height + 1.5*prop.simbols.height*4);
        let drumFrame = new PIXI.Graphics();
        drumFrame.lineStyle(1, 0xFF3300, 1);
        drumFrame.beginFill(0x66CCFF, 0);
        drumFrame.drawRect(window.innerWidth / 2 - prop.simbols.width/2, prop.btnStart.height+2*prop.simbols.height, prop.simbols.width+prop.simbols.retreat*2,  prop.simbols.height*3 + prop.simbols.retreat*3 - 1);
        drumFrame.endFill();
        drumFrame.zIndex = 1;
        app.stage.addChild(drumFrame);

        let upBlackRectangle = new PIXI.Graphics();
        upBlackRectangle.beginFill(0x000000, 1);
        upBlackRectangle.drawRect(window.innerWidth / 2 - prop.simbols.height/2, prop.btnStart.height, 64, 64);
        upBlackRectangle.endFill();
        upBlackRectangle.zIndex = 1;
        app.stage.addChild(upBlackRectangle);

        let downBlackRectangle = new PIXI.Graphics();
        downBlackRectangle.beginFill(0x000000, 1);
        downBlackRectangle.drawRect(window.innerWidth / 2 - prop.simbols.height/2, prop.btnStart.height + prop.simbols.height* 4 + prop.simbols.retreat*5, 64, 64);
        downBlackRectangle.endFill();
        downBlackRectangle.zIndex = 1;
        app.stage.addChild(downBlackRectangle);
    },

  run() {
        const that = this;
        let currentIndexRemovedSprite:number = that.arrAllSprites.length+1;
        this.arrAllSprites.forEach(function (sprite, index) {
            sprite.vy = -1;
            sprite.y += sprite.vy;
            if (sprite.y <= prop.btnStart.height+prop.simbols.height/2) {
                currentIndexRemovedSprite = index;
                app.stage.removeChild(sprite);
            }
            if ((currentIndexRemovedSprite < that.arrAllSprites.length+1)&&(that.arrAllSprites[that.arrAllSprites.length-1].y < prop.btnStart.height + prop.simbols.height + 1.5*prop.simbols.height*that.arrAllSprites.length)) {
                that.arrAllSprites[currentIndexRemovedSprite].y = prop.btnStart.height + 6.5 * prop.simbols.height;
                app.stage.addChild(that.arrAllSprites[currentIndexRemovedSprite]);
            }
        });
  }
};