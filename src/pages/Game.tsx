import GameCanvas from "@/components/GameCanvas";
import GameOverModal from "@/components/GameOverModal";
import {useSnakeGame} from "@/hooks/useSnakeGame";

export default function Game() {
    const {snake, food, gameOver, handleReset, score} = useSnakeGame();

    return (
        <div>
            <h1>게임 화면</h1>
            <p>점수: {score}</p>
            <GameCanvas snake={snake} food={food} />
            {gameOver && <GameOverModal onRestart={handleReset} />}
        </div>
    );
}
