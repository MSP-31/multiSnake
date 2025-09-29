import {useNavigate} from "react-router-dom";
import StartButton from "@/components/StartButton";

export default function Home() {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate("/game");
    };

    return (
        <div>
            <h1>홈 화면</h1>
            <StartButton onClick={handleStart} />
        </div>
    );
}
