import React, { useEffect, useRef, useState } from "react";
import PlayButton from "./ui/PlayButton";
import { create } from "zustand";

interface audioState {
  audioSource: string;
}

interface audioAction {
  setAudioSource: (newSource: audioState["audioSource"]) => void;
}

export const useAudioStore = create<audioState & audioAction>()((set) => ({
  audioSource: "",
  setAudioSource: (newSource) => set(() => ({ audioSource: newSource })),
}));

const Player = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const player = useRef<HTMLAudioElement>(null);
  const [audioSource] = useAudioStore((state) => [state.audioSource]);

  useEffect(() => {
    if (audioSource === undefined || audioSource === "") return;
    _pause();
    void player.current?.load();
    _play();
  }, [audioSource]);

  const handlePlayButtonClick = () => {
    if (!playing) {
      if (audioSource === "" || audioSource === undefined) return;
      _play();
    } else {
      _pause();
    }
  };

  const _play = () => {
    void player.current?.play().then(() => {
      setPlaying(true);
    });
  };

  const _pause = () => {
    void player.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="flex h-16 items-center justify-center bg-RED_CARMINE">
      <PlayButton onClick={handlePlayButtonClick} playing={playing} />
      <audio ref={player} src={audioSource} />
    </div>
  );
};

export default Player;

// "https://traffic.megaphone.fm/NSR3125996142.mp3?updated=1689176929"
