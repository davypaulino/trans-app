import { Ball, FieldAttributes, GameState, Player } from "@/app/_components/_dtos/gameState";

class Board {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(width: number, height: number, canvas: HTMLCanvasElement) {
        this.width = width;
        this.height = height;

        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
    }

    cleanScreen() {
        if (!this.ctx) return;
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(player: Paddle) {
        if (!this.ctx) return;
        this.ctx.fillStyle = player.color;
        this.ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    drawCircle = (ball: BallModel) => {
        if (!this.ctx) return;
        this.ctx.fillStyle = ball.color;
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fill();
    };
}

class Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    
    constructor(x: number, y: number, color: string)
    {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.color =  color;
    }
}

class BallModel {
    x: number;
    y: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.color =  color;
    }
}

class Scale {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    calculate(canvasw: number, canvash: number, serverw: number, serverh: number) {
        this.x = ( canvasw / serverw );
        this.y = ( canvash / serverh );
    }
}

export class GameRender {
    board: Board;
    leftPaddle: Paddle;
    rightPaddle: Paddle;
    ball: BallModel;
    scale: Scale;

    constructor(canvas: HTMLCanvasElement) {
        this.board = new Board(700, 400, canvas);
        this.leftPaddle = new Paddle(0, 0, "blue");
        this.rightPaddle = new Paddle(0, 0, "red");
        this.ball = new BallModel(0, 0, "yellow");
        this.scale = new Scale(0, 0);
    }

    render() {
        this.board.cleanScreen();
        this.board.drawRect(this.leftPaddle);
        this.board.drawRect(this.rightPaddle);
        this.board.drawCircle(this.ball);
    }

    update(gameState: GameState | null) {
        if (gameState) {
            const { fieldAttributes, players, ball: ball } = gameState
            this.scale.calculate(this.board.canvas.width, this.board.canvas.height, fieldAttributes.width, fieldAttributes.height);
            
            this.setBallInfo(this.ball, ball, fieldAttributes)
            this.setPlayerInfo(this.leftPaddle, players['1'], fieldAttributes);
            this.setPlayerInfo(this.rightPaddle, players['2'], fieldAttributes);
        }
        
        this.render()
    }

    setBallInfo(current: BallModel, updated: Ball | null, fieldAttributes: FieldAttributes) {
        if (!current || !updated) return
        current.x = ((updated.x + fieldAttributes.width / 2) * this.scale.x);
        current.y = ((fieldAttributes.height / 2 - updated.y) * this.scale.y);
        current.radius = updated.radius * this.scale.x;
    }

    setPlayerInfo(current: Paddle, updated: Player | null, fieldAttributes: FieldAttributes) {
        if (!updated || !current) return
        current.width = updated.width * this.scale.x;
        current.height = updated.height * this.scale.y;
        current.x = ((updated.x + fieldAttributes.width / 2) * this.scale.x) - (current.width / 2);
        current.y = ((fieldAttributes.height / 2 - updated.y) * this.scale.y) - (current.height / 2);
    }

}
