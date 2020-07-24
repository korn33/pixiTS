interface iProp {
    btnStart: {
        width: number
        height: number
    }
    simbols: {
        width: number,
        height: number,
        retreat: number,
        // startPoiny: number,
    }
    listSimbols:string[]
}

export const prop: iProp = {
    btnStart: {
        width: 100,
        height: 50,
    },
    simbols: {
        width: 32,
        height: 32,
        retreat: 16,
    },
    // drum: {
    //     // velocity: 0,
    // }
    listSimbols: ["images/cat.png", "images/car.png", "images/blackberry.png", "images/blue_house.png"],
};