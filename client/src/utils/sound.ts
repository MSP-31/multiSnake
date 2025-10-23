import * as Tone from "tone";

// 사운드 초기화 (사용자 입력 후 호출 필요)
export function initSounds() {
    Tone.start();
}

/** 먹이 먹는 소리 */
export function playEatSound() {
    const synth = new Tone.MembraneSynth().toDestination();
    synth.triggerAttackRelease("C2", "4n");
}

/** 충돌(게임오버) 소리 */
export function playCrashSound() {
    const synth = new Tone.Synth().toDestination();

    const notes = ["C5", "A4", "F4", "D4", "C3"]; // 점점 낮아지는 음
    const now = Tone.now();

    notes.forEach((note, i) => {
        synth.triggerAttackRelease(note, "16n", now + i * 0.15);
    });
}
