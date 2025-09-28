import GameCanvas from "../components/GameCanvas";
import {useSnakeGame} from "../hooks/useSnakeGame";

export default function Game() {
    const {snake, food} = useSnakeGame();

    return (
        <div>
            <h1>게임 화면</h1>
            <GameCanvas snake={snake} food={food} />
        </div>
    );
}
