import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import PlayButton from "./PlayButton";
import { create } from "zustand";
import Progressbar from "./Progressbar";

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
  const [currentPlayerTime, setCurrentPlayerTime] = useState<number[]>([0]);
  const player = useRef<HTMLAudioElement>(null);
  const [audioSource] = useAudioStore((state) => [state.audioSource]);

  useEffect(() => {
    if (audioSource === undefined || audioSource === "") return;
    pause();
    void player.current?.load();
    play();
  }, [audioSource]);

  const handlePlayButtonClick = () => {
    if (!playing) {
      if (audioSource === "" || audioSource === undefined) return;
      play();
    } else {
      pause();
    }
  };

  const play = () => {
    void player.current?.play();
  };

  const pause = () => {
    void player.current?.pause();
  };

  const refreshPlayerTime = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement;
    setCurrentPlayerTime([target.currentTime]);
  };

  return (
    <div className="flex h-16 items-center justify-center bg-RED_CARMINE">
      <audio
        ref={player}
        src={audioSource}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => refreshPlayerTime(e)}
      />
      <PlayButton onClick={handlePlayButtonClick} playing={playing} />
      <Progressbar
        onChange={(e) => console.log(e)}
        length={player.current?.duration ?? 9999}
        value={currentPlayerTime}
        playerRef={player}
      />
    </div>
  );
};

export default Player;
