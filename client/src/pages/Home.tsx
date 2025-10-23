import {useNavigate} from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="home-title">🐍Multi Snake🍎</h1>
            <div className={styles.buttonGroup}>
                <button onClick={() => navigate("/game")}>싱글 플레이</button>
                <button onClick={() => navigate("/multiplayer")}>멀티 플레이</button>
                <button onClick={() => navigate("/settings")}>설정</button>
            </div>
        </div>
    );
}
