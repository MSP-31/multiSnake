import {useCallback, useEffect, useRef, useState} from "react";
import type {Direction} from "@/types";
import {moveSnake} from "@/utils/game/movement";
import {playEatSound, playCrashSound} from "@/utils/sound";

export function useSnakeGame() {
    const [snake, setSnake] = useState([{x: 5, y: 5}]);
    const [food, setFood] = useState({x: 10, y: 10});
    const [score, setScore] = useState(0);
    const [isMoving, setIsMoving] = useState(false); // 움직임 시작 여부
    const directionRef = useRef<Direction>("right"); // 입력값
    const [gameOver, setGameOver] = useState(false); // 게임 종료 여부
    const inputLockedRef = useRef(false); // 입력 지연
    const snakeLengthRef = useRef(snake.length); // 뱀 길이

    const width = 25;
    const height = 25;

    /** 초기화 핸들러 */
    const handleReset = () => {
        setSnake([{x: 5, y: 5}]);
        setFood({x: 10, y: 10});
        setScore(0);
        setIsMoving(false);
        setGameOver(false);
        directionRef.current = "right";
        inputLockedRef.current = false;
        snakeLengthRef.current = snake.length;
    };

    /** 뱀의 움직임 */
    const moveSnakeHandler = useCallback(() => {
        const {newSnake, newFood, ateFood, gameOver} = moveSnake(snake, directionRef.current, food, width, height);

        if (gameOver) {
            playCrashSound();
            setIsMoving(false);
            setGameOver(true);
            return;
        }

        setSnake(newSnake);

        if (ateFood && newFood) {
            playEatSound();
            setFood(newFood);
            setScore((prev) => prev + 1);
        }
    }, [snake, food]);

    // 다음 위치 계산후 상태 업데이트
    useEffect(() => {
        if (!isMoving || gameOver) return; // 움직임 시작 여부 및 게임오버 여부

        const interval = setInterval(() => {
            console.log("moving...");
            moveSnakeHandler();
        }, 100); //100ms

        // 움직일때마다 새 타이머 설정
        return () => clearInterval(interval);
    }, [isMoving, gameOver, moveSnakeHandler]);

    // 뱀의 길이 업데이트
    useEffect(() => {
        snakeLengthRef.current = snake.length;
    }, [snake]);

    // 방향 입력
    useEffect(() => {
        /** 방향 동시 입력 방지
         * @param newDir 입력받은 새 방향
         * @param currentDir 현재 진행중인 방향
         * @returns true/false 값
         */
        const isOpposite = (newDir: string, currentDir: string) => {
            return (
                (newDir === "up" && currentDir === "down") ||
                (newDir === "down" && currentDir === "up") ||
                (newDir === "left" && currentDir === "right") ||
                (newDir === "right" && currentDir === "left")
            );
        };

        /** 키보드 입력 처리
         * @param e 입력받은 키보드 이벤트
         */
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver || inputLockedRef.current) return; // 입력 잠금여부 확인

            /** 입력키에 따른 방향 할당 */
            const newDirection = {
                ArrowUp: "up",
                ArrowDown: "down",
                ArrowLeft: "left",
                ArrowRight: "right",
            }[e.key];

            // 반대 방향 입력은 무시
            // 뱀의 길이가 1일때는 모든 방향 전환 허용
            if (newDirection && (snakeLengthRef.current === 1 || !isOpposite(newDirection, directionRef.current))) {
                directionRef.current = newDirection as Direction;
                inputLockedRef.current = true; // 입력지연
                setTimeout(() => (inputLockedRef.current = false), 100); // 100ms 잠금

                if (!isMoving) setIsMoving(true); // 움직임 시작
            }
        };

        // 키 입력 감지
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMoving, gameOver]);

    return {
        snake,
        setSnake,
        food,
        setFood,
        score,
        setScore,
        gameOver,
        handleReset,
    };
}
