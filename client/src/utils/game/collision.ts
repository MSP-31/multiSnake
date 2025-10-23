import type {Position, Snake} from "@/types";

/** 벽 충돌 판정 함수
 * @param head 뱀의 머리 좌표
 * @param width 게임 맵의 가로 칸
 * @param height 게임 맵의 세로 칸
 * @returns T/F 벽 충돌 여부
 */
export const isWallCollision = (head: Position, width: number, height: number): boolean => {
    return head.x < 0 || head.x >= width || head.y < 0 || head.y >= height;
};

/** 몸통 충돌 판정 함수
 * @param snake 뱀의 몸통 좌표 배열
 * @returns T/F 뱀의 몸통에 머리가 겹치는지 여부
 */
export const isSelfCollision = (snake: Snake): boolean => {
    const head = snake[snake.length - 1];
    return snake.slice(0, -1).some((cell) => cell.x === head.x && cell.y === head.y);
};
