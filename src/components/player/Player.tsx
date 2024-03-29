import React, { type SyntheticEvent, useEffect, useRef, useState } from "react";
import PlayButton from "./PlayButton";
import { create } from "zustand";
import Progressbar from "./Progressbar";
import Volume from "./Volume";
import SpeedController from "~/components/player/SpeedController";
import { api } from "~/utils/api";
import type { EpisodeData } from "~/types/podcastTypes";

interface audioState {
  episodeData: EpisodeData;
}

interface audioAction {
  setAudioSource: (newData: audioState["episodeData"]) => void;
}

export const useAudioStore = create<audioState & audioAction>()((set) => ({
  episodeData: {
    title: "",
    description: "",
    audio_url: "",
    guid: "",
    date: "",
    image_url: "",
    episode: "",
    season: "",
  },
  setAudioSource: (newData) =>
    set(() => ({
      episodeData: newData,
    })),
}));

const getEpisodeGuid = (episodeData: EpisodeData): string | null => {
  // if (guid && typeof guid !== "string") return guid.data ?? undefined;
  return episodeData.guid;
};

const Player = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentPlayerTime, setCurrentPlayerTime] = useState<number[]>([0]);
  const [speed, setSpeed] = useState<number>(1);
  const [volume, setVolume] = useState<number>(0.6);
  const [muted, setMuted] = useState<boolean>(false);
  const player = useRef<HTMLAudioElement>(null);
  const [episodeData] = useAudioStore((state) => [state.episodeData]);

  const playtimeMutation = api.episode.setPlaybackPosition.useMutation();
  const playtimeQuery = api.episode.getPlaybackPosition.useQuery({
    episodeId: getEpisodeGuid(episodeData) ?? "",
  });

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (playing) {
      interval = setInterval(() => {
        if (!playing) return;
        const time = player.current?.currentTime;
        if (!time || getEpisodeGuid(episodeData) === undefined) return;
        playtimeMutation.mutate({
          episodeId: getEpisodeGuid(episodeData) ?? "",
          playtime: Math.floor(time),
        });
      }, 5000);
    } else if (interval) {
      clearInterval(interval);
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episodeData.title ?? undefined,
      artwork: [
        {
          src: episodeData.image_url ?? "",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing]);

  useEffect(() => {
    if (episodeData === undefined || episodeData.audio_url === "") return;
    pause();
    void player.current?.load();
    void playtimeQuery
      .refetch()
      .then((res) => {
        if (res.data === undefined) return;
        const playtime = res.data;
        playerSeek(playtime);
      })
      .finally(() => play());
  }, [episodeData]);

  const handlePlayButtonClick = () => {
    if (!playing) {
      if (episodeData.audio_url === "" || episodeData.audio_url === undefined)
        return;
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

  const playerSeek = (time: number) => {
    if (player.current) player.current.currentTime = time;
  };

  const refreshAudioData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const target = e.target as HTMLAudioElement;
    setVolume(target.volume);
    setMuted(target.muted);
    setSpeed(target.playbackRate);
    setCurrentPlayerTime([target.currentTime]);
  };

  const setPlayerVolume = (volume: number) => {
    if (!player.current) return;
    player.current.volume = volume;
    localStorage.setItem("volume", String(volume));
    if (volume < 0.02) {
      muteSound(true);
    } else {
      muteSound(false);
    }
  };

  const setPlaybackSpeed = (speed: number) => {
    if (!player.current) return;
    player.current.playbackRate = speed;
  };

  const muteSound = (mute: boolean) => {
    if (!player.current) return;
    player.current.muted = mute;
  };

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
    <div className="z-40 flex h-20 items-center justify-center bg-RED_CARMINE sticky bottom-0">
      <audio
        hidden={true}
        ref={player}
        src={episodeData.audio_url ?? undefined}
        title={episodeData.title ?? undefined}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => refreshAudioData(e)}
        onVolumeChange={(e) => refreshAudioData(e)}
        onRateChange={(e) => refreshAudioData(e)}
      />
      <Volume
        onChange={(volume) => setPlayerVolume(volume)}
        value={volume}
        defaultValue={volume}
        muteSound={muteSound}
        muted={muted}
      />

      <PlayButton onClick={handlePlayButtonClick} playing={playing} />
      {episodeData.audio_url && (
        <Progressbar
          onChange={(time) => playerSeek(time)}
          length={player.current?.duration ?? 0}
          value={currentPlayerTime}
          active={episodeData.audio_url.length > 0}
        />
      )}
      <SpeedController setSpeed={setPlaybackSpeed} speed={speed} />
    </div>
  );
};

export default Player;
