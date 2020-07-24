interface iProp {
    btnStart: {
        width: number
        height: number
    }
    simbols: {
        // width: number,
        size:number
        // retreat: number,
    }
    listSimbols:string[]
    drum:{
        startSpeed: number
        timeOfRotate: number
        maxSpeed: number
        acceleration: number
        reversAcceleration:number
        restartTime: number

    }
}

export const prop: iProp = {
    btnStart: {
        width: 100,
        height: 50,
    },
    simbols: {
        size: 30,
        // retreat: 30,
    },
    listSimbols: [
        "images/cat.png",
        "images/car.png",
        "images/blackberry.png",
        "images/blue_house.png",
        "images/horse.png",
        "images/house.png",
        "images/lens.png",
        "images/monkey.png"
    ],
    drum:{
        startSpeed: -1,
        timeOfRotate: 10000,
        maxSpeed: -8,
        acceleration: 0.005,
        reversAcceleration: 0.001,
        restartTime: 1000,
    }
};