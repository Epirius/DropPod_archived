import React, { useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface Props {
  onChange: (value: number) => void;
  defaultValue?: number;
  value: number[];
  length: number;
  active: boolean;
}

const Progressbar = ({
  onChange,
  defaultValue,
  value,
  length,
  active,
}: Props) => {
  const secondsToTime = (seconds: number) => {
    if (!seconds) return;
    const time = new Date(seconds * 1000);
    return time.toISOString().slice(11, 19);
  };
  return (
    <form className="flex flex-col">
      <div>
        <Slider.Root
          defaultValue={defaultValue ? [defaultValue] : [0]}
          onValueChange={(e: number[]) => {
            if (e[0]) onChange(e[0]);
          }}
          step={0.1}
          max={length}
          value={value}
          className="relative flex h-5 w-[200px] touch-none select-none items-center"
        >
          <Slider.Track className="relative h-[3px] grow rounded-full bg-BLACK_CYNICAL">
            <Slider.Range className="absolute h-full rounded-full bg-WHITE_EGG" />
          </Slider.Track>
          <Slider.Thumb
            className="block h-3 w-3 rounded-[10px] bg-WHITE_EGG   hover:bg-violet-200 focus:shadow-[0_0_0_5px] focus:shadow-black focus:outline-none"
            aria-label="progress bar"
          />
        </Slider.Root>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-[10px] text-WHITE_EGG">
          {active && value[0] && secondsToTime(value[0])}
        </p>
        <p className="text-[10px] text-WHITE_EGG">
          {active && secondsToTime(length)}
        </p>
      </div>
    </form>
  );
};

export default Progressbar;
