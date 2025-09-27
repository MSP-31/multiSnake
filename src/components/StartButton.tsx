type StartButtonProps = {
    onClick: () => void;
};

export default function StartButton({onClick}: StartButtonProps) {
    return (
        <button onClick={onClick} style={styles.button}>
            시작하기
        </button>
    );
}

const styles = {
    button: {
        padding: "10px 20px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
};
