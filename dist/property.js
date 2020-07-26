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
export const prop = {
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
//# sourceMappingURL=property.js.map