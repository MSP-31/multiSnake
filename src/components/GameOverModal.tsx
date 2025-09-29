import React from "react";

interface GameOverModalProps {
    onRestart: () => void;
}

export default function GameOverModal({onRestart}: GameOverModalProps) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h2>💥 Game Over 💥</h2>
                <button onClick={onRestart} style={buttonStyle}>
                    다시 시작하기
                </button>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
};

const modalStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    color: "#000",
};

const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
};
