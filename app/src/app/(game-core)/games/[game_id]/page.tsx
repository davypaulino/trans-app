'use client'
import { useEffect, useRef } from "react";

export default function Page() {
    return (
        <div className={`container mx-auto bg-slate-300 h-[100vh]`}>
            <div className={`bg-slate-500 h-96 w-[85%] mx-auto`}>
                <PongGame />
            </div>
        </div>
    );
}

const PongGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Função para ajustar o tamanho do canvas às dimensões da div contenedora
        const setCanvasSize = () => {
            const containerRect = container.getBoundingClientRect();
            canvas.width = containerRect.width;
            canvas.height = containerRect.height;
        };

        // Configurar o tamanho do canvas ao carregar e ao redimensionar
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Variáveis do jogo
        const paddleWidth = canvas.width * 0.02; // Largura dos paddles ajustada
        const paddleHeight = canvas.height * 0.3; // Altura proporcional ao canvas
        const ballSize = canvas.width * 0.02; // Tamanho da bola proporcional

        const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
        const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, dy: 0 };
        const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4 };

        const keyMap: { [key: string]: boolean } = {};

        // Funções de desenho
        const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        const drawCircle = (x: number, y: number, size: number, color: string) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        };

        const render = () => {
            // Limpar canvas
            drawRect(0, 0, canvas.width, canvas.height, "black");

            // Desenhar paddles
            drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, "red");
            drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, "blue");

            // Desenhar a bola
            drawCircle(ball.x, ball.y, ballSize, "yellow");
        };

        // Lógica do jogo
        const update = () => {
            // Atualizar posição da bola
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Colisão com as bordas superior e inferior
            if (ball.y <= 0 || ball.y >= canvas.height) ball.dy *= -1;

            // Colisão com os paddles
            if (
                ball.x <= leftPaddle.x + paddleWidth &&
                ball.y >= leftPaddle.y &&
                ball.y <= leftPaddle.y + paddleHeight
            ) {
                ball.dx *= -1;
            }

            if (
                ball.x >= rightPaddle.x - ballSize &&
                ball.y >= rightPaddle.y &&
                ball.y <= rightPaddle.y + paddleHeight
            ) {
                ball.dx *= -1;
            }

            // Reseta posição da bola ao sair da tela
            if (ball.x <= 0 || ball.x >= canvas.width) {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                ball.dx *= -1; // Inverter direção inicial
            }

            // Movimentação dos paddles
            if (keyMap["ArrowUp"] && rightPaddle.y > 0) rightPaddle.y -= 8;
            if (keyMap["ArrowDown"] && rightPaddle.y + paddleHeight < canvas.height) rightPaddle.y += 8;
            if (keyMap["w"] && leftPaddle.y > 0) leftPaddle.y -= 8;
            if (keyMap["s"] && leftPaddle.y + paddleHeight < canvas.height) leftPaddle.y += 8;

            render();
        };

        // Controle do teclado
        const keydownHandler = (e: KeyboardEvent) => {
            keyMap[e.key] = true;
        };

        const keyupHandler = (e: KeyboardEvent) => {
            keyMap[e.key] = false;
        };

        window.addEventListener("keydown", keydownHandler);
        window.addEventListener("keyup", keyupHandler);

        // Loop do jogo
        const gameLoop = setInterval(update, 1000 / 60); // 60 FPS

        return () => {
            window.removeEventListener("keydown", keydownHandler);
            window.removeEventListener("keyup", keyupHandler);
            window.removeEventListener("resize", setCanvasSize);
            clearInterval(gameLoop);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <canvas ref={canvasRef} style={{ display: "block" }} />
        </div>
    );
};
