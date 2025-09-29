import type {Position, Snake, Direction} from "@/types";
import {isFoodEaten, generateNewFood, isSelfCollision, isWallCollision} from "@/utils/game";

/** 방향에 따른 뱀의 움직임 정의
 * @param head
 * @param direction
 * @returns
 */
export const getNextHead = (head: Position, direction: Direction): Position => {
    switch (direction) {
        case "up":
            return {x: head.x, y: head.y - 1};
        case "down":
            return {x: head.x, y: head.y + 1};
        case "left":
            return {x: head.x - 1, y: head.y};
        case "right":
            return {x: head.x + 1, y: head.y};
    }
};

/** 뱀의 움직임에 따른 상태 정의 함수
 * @param snake 현재 뱀의 몸통 좌표 배열
 * @param direction 현재 이동 방향 ("up" | "down" | "left" | "right")
 * @param food 현재 음식의 좌표
 * @param width 게임 맵의 너비 (가로 칸 수)
 * @param height 게임 맵의 높이 (세로 칸 수)
 *
 * @returns {
 *   newSnake: 이동 후의 뱀 좌표 배열,
 *   newFood: 새로 생성된 음식 좌표 (음식을 먹었을 경우),
 *   ateFood: 음식 먹었는지 여부,
 *   gameOver: 충돌 여부 (게임 오버 상태)
 *  }
 */
export const moveSnake = (
    snake: Snake,
    direction: Direction,
    food: Position,
    width: number,
    height: number
): {
    newSnake: Snake;
    newFood: Position | null;
    ateFood: boolean;
    gameOver: boolean;
} => {
    const head = snake[snake.length - 1]; // 현재 머리 좌표
    const newHead = getNextHead(head, direction); // 방향에 따른 새 머리 좌표
    const newSnake = [...snake, newHead]; // 머리를 몸통에 추가

    // 충돌 판정
    if (isWallCollision(newHead, width, height) || isSelfCollision(newSnake)) {
        return {
            newSnake: snake,
            newFood: null,
            ateFood: false,
            gameOver: true,
        };
    }

    // 음식 판정
    if (isFoodEaten(newHead, food)) {
        const newFood = generateNewFood(newSnake, width, height);
        return {
            newSnake,
            newFood,
            ateFood: true,
            gameOver: false,
        };
    }

    // 아무것도 안 먹었다면 꼬리 제거
    newSnake.shift();
    return {
        newSnake,
        newFood: null,
        ateFood: false,
        gameOver: false,
    };
};
