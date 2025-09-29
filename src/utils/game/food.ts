import type {Position, Snake} from "@/types";

/** 뱀이 음식을 먹었는지 안먹었는지 확인하는 함수
 * @param head 뱀의 머리 좌표
 * @param food 음식의 좌표
 * @returns T/F 머리가 음식에 도달했는지 여부
 */
export const isFoodEaten = (head: Position, food: Position): boolean => {
    return head.x === food.x && head.y === food.y;
};

/** 음식 좌표 생성 함수
 * @param snake 뱀의 몸통 좌표 배열
 * @param width 게임 맵의 가로 칸
 * @param height 게임 맵의 세로 칸
 * @returns
 */
export const generateNewFood = (snake: Snake, width: number, height: number): Position => {
    let newFood: Position;
    do {
        // 음식의 좌표를 랜덤으로 생성
        newFood = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
        };
        // 몸통과 겹치는지 확인
    } while (snake.some((cell) => cell.x === newFood.x && cell.y === newFood.y));
    return newFood;
};
