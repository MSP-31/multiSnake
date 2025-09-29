export type Position = {
    x: number;
    y: number;
};

export type Snake = Position[];

export type GameCanvasProps = {
    snake: Snake;
    food: Position;
};

export type Direction = "up" | "down" | "left" | "right";
