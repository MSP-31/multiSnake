import styles from "./GameOverModal.module.css";

interface GameOverModalProps {
    onRestart: () => void;
    onGoToMain: () => void;
    score: number;
}

export default function GameOverModal({onRestart, onGoToMain, score}: GameOverModalProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>💥 Game Over 💥</h2>
                <p className={styles.scoreText}>최종 점수: {score}</p>
                <div className={styles.buttonGroup}>
                    <button onClick={onRestart} autoFocus>
                        다시 시작하기
                    </button>
                    <button onClick={onGoToMain}>메인화면으로</button>
                </div>
            </div>
        </div>
    );
}
