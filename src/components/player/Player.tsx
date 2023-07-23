import React, { type SyntheticEvent, useEffect, useRef, useState } from "react";
import PlayButton from "./PlayButton";
import { create } from "zustand";
import Progressbar from "./Progressbar";
import Volume from "./Volume";

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
  const [volume, setVolume] = useState<number>(0.6);
  const [muted, setMuted] = useState<boolean>(false);
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

  const playerSeek = (time: number) => {
    if (player.current) player.current.currentTime = time;
  };

  const refreshAudioData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement;
    setVolume(target.volume);
    setMuted(target.muted);
  };

  const setPlayerVolume = (volume: number) => {
    if (!player.current) return;
    player.current.volume = volume;
    localStorage.setItem("volume", String(volume));
    if (volume < 0.02) {
      muteSound(true)
    } else {
      muteSound(false)
    }
  };

  const muteSound = (mute: boolean) => {
    if (!player.current) return;
    player.current.muted = mute;
  }

  useEffect(() => {
    // set volume on startup
    let storage;
    let volume;
    if (typeof window !== "undefined") {
      storage = localStorage.getItem("volume");
    }
    if (storage) {
      volume = Number(storage);
    } else if (player.current) {
      volume = player.current.volume;
    } else {
      volume = 0.6;
    }
    setPlayerVolume(volume);
  }, []);

  return (
    <div className="flex h-16 items-center justify-center bg-RED_CARMINE">
      <audio
        hidden={true}
        ref={player}
        src={audioSource}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => refreshPlayerTime(e)}
        onVolumeChange={(e) => refreshAudioData(e)}
      />
      <Volume
        onChange={(volume) => setPlayerVolume(volume)}
        value={volume}
        defaultValue={volume}
        muteSound={muteSound}
        muted={muted}/>

      <PlayButton onClick={handlePlayButtonClick} playing={playing} />
      <Progressbar
        onChange={(time) => playerSeek(time)}
        length={player.current?.duration ?? 0}
        value={currentPlayerTime}
        active={audioSource.length > 0}
      />
    </div>
  );
};

export default Player;