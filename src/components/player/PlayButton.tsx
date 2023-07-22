import React from "react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import * as Switch from "@radix-ui/react-switch";
import * as Toggle from "@radix-ui/react-toggle";

interface Props {
  playing: boolean;
  onClick: () => void;
}

const PlayButton = ({ playing, onClick }: Props) => {
  return (
    <button onClick={onClick} aria-label="play and pause button">
      {playing ? (
        <FaCirclePause className="h-14 w-auto p-2 text-WHITE_EGG hover:scale-105 hover:text-slate-200" />
      ) : (
        <FaCirclePlay className="h-14 w-auto p-2 text-WHITE_EGG hover:scale-105 hover:text-slate-200" />
      )}
    </button>
  );
};

export default PlayButton;
