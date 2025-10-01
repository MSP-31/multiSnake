import styles from "./GameOverModal.module.css";

interface GameOverModalProps {
    onRestart: () => void;
    onGoToMain: () => void;
}

export default function GameOverModal({onRestart, onGoToMain}: GameOverModalProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>💥 Game Over 💥</h2>
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
