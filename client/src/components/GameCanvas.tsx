import {useEffect, useRef} from "react";
import type {GameCanvasProps} from "@/types";

export default function GameCanvas({snake, food}: GameCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 DOM을 참조하기 위한 Hook

    useEffect(() => {
        const canvas = canvasRef.current; // 실제 캔버스 DOM 요소 가져오기
        if (!canvas) return; // 캔버스가 없으면 그리기 중단

        const ctx = canvas?.getContext("2d"); // 2D 그리기 컨텍스트 가져오기
        if (!ctx) return; // 컨텍스트가 없으면 그리기 중단

        ctx.clearRect(0, 0, canvas.width, canvas.height); // 화면 초기화

        // 격자무늬 그리기
        const gridSize = 20;
        const numCols = canvas.width / gridSize;
        const numRows = canvas.height / gridSize;

        for (let i = 0; i < numCols; i++) {
            for (let j = 0; j < numRows; j++) {
                // (i + j)가 짝수/홀수인지에 따라 색상을 번갈아 칠합니다.
                ctx.fillStyle = (i + j) % 2 === 0 ? "#1e1e1e" : "#121212";
                ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
            }
        }

        // --- 기존 그리기 코드 ---

        ctx.fillStyle = "green"; // 뱀 색상 설정
        snake.forEach((segment) => {
            ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20); // 뱀의 각 몸통을 그리기
        });

        ctx.fillStyle = "red"; // 먹이 색상 설정
        ctx.fillRect(food.x * 20, food.y * 20, 20, 20); // 먹이 그리기
    }, [snake, food]); // 뱀이나 먹이가 바뀔 때마다 다시 그림

    return (
        <canvas
            ref={canvasRef} // 캔버스 참조 연결
            width={500} // 캔버스 너비
            height={500} // 캔버스 높이
            style={{border: "1px solid white"}} // 스타일 설정 (배경색은 canvas에서 직접 그리므로 제거)
        />
    );
}
