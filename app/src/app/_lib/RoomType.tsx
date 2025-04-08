export const ERoomType = {
    0: "Match",
    1: "Tournament",
    2: "Single Player"
} as const;

export type RoomTypeKey = keyof typeof ERoomType;  // "0" | "1" | "2"
export type RoomTypeValue = typeof ERoomType[RoomTypeKey];