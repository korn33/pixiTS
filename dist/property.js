const simbolsOfDrum = {
    simbolsForOneDrum: [
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
        simbolsOfDrum.simbolsForOneDrum,
        [
            "images/cat.png",
            "images/car.png",
            "images/blackberry.png",
            "images/blue_house.png",
        ],
        simbolsOfDrum.simbolsForOneDrum.concat(["images/start_red.png"]),
        simbolsOfDrum.simbolsForOneDrum,
        simbolsOfDrum.simbolsForOneDrum,
    ],
    drum: {
        startSpeed: -1,
        minTimeOfRotate: 0,
        maxTimeOfRotate: 1,
        maxSpeed: -6,
        acceleration: 1,
        reversAcceleration: 0.03,
        speedForCorrected: -2,
    }
};
//# sourceMappingURL=property.js.map