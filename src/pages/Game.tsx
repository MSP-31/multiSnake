import GameCanvas from "@/components/GameCanvas";
import GameOverModal from "@/components/GameOverModal";
import {useSnakeGame} from "@/hooks/useSnakeGame";
import styles from "./Game.module.css";
import {useNavigate} from "react-router-dom";

export default function Game() {
    const {snake, food, gameOver, handleReset, score} = useSnakeGame();
    const navigate = useNavigate();

    // 최고 점수는 localStorage에서 가져오거나, 없으면 0으로 시작합니다.
    // 실제 구현에서는 useSnakeGame 훅으로 옮기는 것이 좋습니다.
    const highScore = localStorage.getItem("snakeHighScore") || 0;

    return (
        <div className={styles.container}>
            <h1>🐍 Single Play 🍎</h1>
            <div className={styles.gameHeader}>
                <button onClick={() => navigate("/")}>&lt;-</button>
                <div className={styles.scoreDisplay}>
                    <span>점수: {score}</span>
                    <span>/</span>
                    <span>최고점수: {highScore}</span>
                </div>
            </div>
            <GameCanvas snake={snake} food={food} />
            {/* 조작법은 필요하다면 여기에 다시 추가할 수 있습니다. */}
            {gameOver && <GameOverModal onRestart={handleReset} onGoToMain={() => navigate("/")} />}
        </div>
    );
}
