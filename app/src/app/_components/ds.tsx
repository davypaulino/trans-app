interface IPlayerColor {
    border?: string,
    text?: string,
    bg?: string
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
            border: "border-red-400 hover:border-red-300",
            text: "text-red-400"
        },
        blue: {
            border: "border-blue-400 hover:border-blue-300",
            text: "text-blue-400"
        },
        green: {
            border: "border-green-400 hover:border-green-300",
            text: "text-green-400"
        },
        yellow: {
            border: "border-yellow-400 hover:border-yellow-300",
            text: "text-yellow-400"
        },
        gray: {
            border: "border-slate-300 hover:border-slate-400",
            bg: "bg-slate-300 hover:bg-slate-400",
            text: "text-yellow-400"
        },
    }
}

