import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";

interface Props {
  onChange: (value: number) => void;
  muted?: boolean;
  muteSound: (mute: boolean) => void;
  defaultValue: number;
  value: number;
}

const Volume = ({ onChange, muted, muteSound, defaultValue, value }: Props) => {
  const muteThreshold = 0.02;
  return (
    <div className="sm:flex flex-row items-center gap-2 hidden sm:visible">
      {muted ? (
        <FaVolumeMute
          onClick={() => {
            if (value > muteThreshold) muteSound(false);
          }}
          className="text-WHITE_EGG"
        />
      ) : (
        <FaVolumeDown
          onClick={() => muteSound(true)}
          className="text-WHITE_EGG"
        />
      )}
      <Slider.Root
        className="relative flex h-5 w-[100px] touch-none select-none items-center"
        defaultValue={[defaultValue]}
        onValueChange={(e: number[]) => {
          if (e[0]) onChange(e[0]);
        }}
        step={0.001}
        max={1}
        value={[value]}
      >
        <Slider.Track className="relative h-[3px] grow rounded-full bg-BLACK_CYNICAL">
          <Slider.Range className="absolute h-full rounded-full bg-WHITE_EGG" />
        </Slider.Track>
        <Slider.Thumb className="block h-2 w-2 rounded-[10px] bg-WHITE_EGG  " />
      </Slider.Root>
      <FaVolumeUp className="text-WHITE_EGG" />
    </div>
  );
};

export default Volume;
