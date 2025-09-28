import {useCallback, useEffect, useRef, useState} from "react";

type Direction = "up" | "down" | "left" | "right";

export function useSnakeGame() {
    const [snake, setSnake] = useState([{x: 5, y: 5}]);
    const [food, setFood] = useState({x: 10, y: 10});
    const [score, setScore] = useState(0);
    const directionRef = useRef<Direction>("right"); // 입력값
    const inputLockedRef = useRef(false); // 입력 지연
    const snakeLengthRef = useRef(snake.length); // 뱀 길이

    /** 뱀의 움직임 */
    const moveSnake = useCallback(() => {
        setSnake((prevSnake) => {
            const head = prevSnake[prevSnake.length - 1]; // 현재 머리위치
            let newHead;

            switch (directionRef.current) {
                case "up":
                    newHead = {x: head.x, y: head.y - 1};
                    break;
                case "down":
                    newHead = {x: head.x, y: head.y + 1};
                    break;
                case "left":
                    newHead = {x: head.x - 1, y: head.y};
                    break;
                case "right":
                    newHead = {x: head.x + 1, y: head.y};
                    break;
            }

            const newSnake = [...prevSnake, newHead]; // 기존 몸통에 머리 붙이기
            newSnake.shift(); // 꼬리 제거 [배열의 첫번째 요소 제거]
            return newSnake;
        });
    }, [directionRef]);

    // 다음 위치 계산후 상태 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            moveSnake(); // 실제
        }, 100); //100ms

        // 움직일때마다 새 타이머 설정
        return () => clearInterval(interval);
    }, [moveSnake]);

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
            if (inputLockedRef.current) return; // 입력 잠금여부 확인

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
            }
        };

        // 키 입력 감지
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return {
        snake,
        setSnake,
        food,
        setFood,
        score,
        setScore,
    };
}
