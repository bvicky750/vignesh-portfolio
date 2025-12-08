import { useCallback } from "react";

export default function useSound(soundFile) {
  const play = useCallback(() => {
    const audio = new Audio(soundFile);
    audio.volume = 0.3; // adjust sound volume
    audio.play();
  }, [soundFile]);

  return play;
}
