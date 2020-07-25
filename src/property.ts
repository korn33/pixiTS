interface iProp {
    btnStart: {
        width: number
        height: number
    }
    simbols: {
        size:number
    }
    listSimbols:string[]
    drum:{
        startSpeed: number
        maxSpeed: number
        acceleration: number
        reversAcceleration:number
        restartTime: number
        maxTimeOfRotate: number
        minTimeOfRotate: number
    }
}

export const prop: iProp = {
    btnStart: {
        width: 100,
        height: 50,
    },
    simbols: {
        size: 30,
    },
    listSimbols: [
        "images/cat.png",
        "images/car.png",
        "images/blackberry.png",
        "images/blue_house.png",//минимально допустимое количество символов = 4
        "images/horse.png",
        "images/house.png",
        "images/lens.png",
        "images/monkey.png"
    ],
    drum:{
        startSpeed: -1,
        minTimeOfRotate: 0,
        maxTimeOfRotate: 2,
        maxSpeed: -6,
        acceleration: 0.5,
        reversAcceleration: 0.01,
        restartTime: 1000,
    }
};