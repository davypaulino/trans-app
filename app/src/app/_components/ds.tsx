interface IPlayerColor {
    border: string,
    text: string
}

interface IPlayerColors {
    [key: string]: IPlayerColor;
}

interface IDS {
    playerColors: IPlayerColors
}



export const DS: IDS = {
    playerColors: {
        red: {
            border: "border-red-400 hover:border-red-600",
            text: "text-red-400"
        },
        blue: {
            border: "border-blue-400 hover:border-blue-600",
            text: "text-blue-400"
        },
        green: {
            border: "border-green-400 hover:border-green-600",
            text: "text-green-400"
        },
        yellow: {
            border: "border-yellow-400 hover:border-yellow-600",
            text: "text-yellow-400"
        },
    }
}

