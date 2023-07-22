import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";

interface Props {
  onChange: (value: number) => void;
  defaultValue: number;
  value: number;
}

const Volume = ({ onChange, defaultValue, value }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {value && value > 0.02 ? (
        <FaVolumeDown className="text-WHITE_EGG" />
      ) : (
        <FaVolumeMute className="text-WHITE_EGG" />
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
