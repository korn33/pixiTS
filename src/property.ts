interface iProp {
    btnStart: {
        width: number
        height: number
    }
    simbols: {
        size: number
    }
    listSimbols: string[][]
    drum: {
        startSpeed: number
        maxSpeed: number
        acceleration: number
        reversAcceleration: number
        maxTimeOfRotate: number
        minTimeOfRotate: number
        speedForCorrected: number
        rotationalDelayFactor: number
    }
}

export const allImgInApp = {
    links: [
        "images/new_icon.jpeg",
        "images/start_red.png",
        "images/start_green.png",
        //иконки барабана начинаются с индекса 3
        "images/cat.png",
        "images/car.png",
        "images/blackberry.png",
        "images/blue_house.png",
        "images/horse.png",
        "images/house.png",
        "images/lens.png",
        "images/monkey.png"
    ],
};

export const prop: iProp = {
    btnStart: {
        width: 100,
        height: 50,
    },
    simbols: {
        size: 30,
    },
    listSimbols: [
        allImgInApp.links.slice(3),
        [
            "images/cat.png",
            "images/car.png",
            "images/blackberry.png",
            "images/blue_house.png",
            "images/horse.png",
            // Минимальное количество символов = 5.
            // При меньшем количестве символов иконки будут появляться в поле зрения во время быстрого вращения
        ],
        allImgInApp.links.slice(3).concat(["images/new_icon.jpeg"]),
        allImgInApp.links.slice(3),
        allImgInApp.links.slice(3),
    ],
    drum: {
        startSpeed: -1,
        minTimeOfRotate: 0,
        maxTimeOfRotate: 1,
        maxSpeed: -6,
        acceleration: 1,
        reversAcceleration: 0.03,
        speedForCorrected: -2,
        rotationalDelayFactor: 0.6,
    }
};