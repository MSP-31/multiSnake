import GameCanvas from "@/components/GameCanvas";
import GameOverModal from "@/components/GameOverModal";
import {useSnakeGame} from "@/hooks/useSnakeGame";
import styles from "./Game.module.css";
import {useNavigate} from "react-router-dom";

export default function Game() {
    const {snake, food, gameOver, handleReset, score} = useSnakeGame();
    const navigate = useNavigate();

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
            {gameOver && <GameOverModal onRestart={handleReset} onGoToMain={() => navigate("/")} />}
        </div>
    );
}
