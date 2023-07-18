import React, { useRef, useState } from "react";
import PlayButton from "./ui/PlayButton";

const Player = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const player = useRef<HTMLAudioElement>(null);
  const [audioSource, setAudioSource] = useState<string>(
    "https://traffic.megaphone.fm/NSR3125996142.mp3?updated=1689176929"
  );

  const handlePlayButtonClick = () => {
    if (!playing) {
      void player.current?.play().then(() => {
        setPlaying(true);
      });
    } else {
      void player.current?.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="flex h-16 items-center justify-center bg-RED_CARMINE">
      <PlayButton onClick={handlePlayButtonClick} playing={playing} />
      <audio ref={player} src={audioSource} />
    </div>
  );
};

export default Player;
