export interface Ball {
    x: number;
    y: number;
    radius: number;
}

export interface Player {
    user_id: string;
    color: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface FieldAttributes {
    height: number;
    width: number;
}

type PlayerMap = {
    [key: string]: Player;
}

type GameStatus = 'PLAYING' | 'PAUSED' | 'ENDED' | string;

export interface GameState {
    ball: Ball;
    players: PlayerMap;
    numberOfPlayers: number;
    fieldAttributes: FieldAttributes;
    gameStatus: GameStatus;
    lastPlayerHit: Player;
}