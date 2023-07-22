import React, { useEffect, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface Props {
  onChange: (value: number) => void;
  defaultValue?: number;
  value?: number[];
  length: number;
  playerRef: React.RefObject<HTMLAudioElement>;
}

const Progressbar = ({
  onChange,
  defaultValue,
  value,
  length,
  playerRef,
}: Props) => {
  const [currentTime, setCurrentTime] = useState<number[]>([]);
  const root = useRef<HTMLSpanElement>(null);

  return (
    <form>
      <Slider.Root
        defaultValue={defaultValue ? [defaultValue] : [0]}
        onValueChange={(e) => {
          if (e[0]) onChange(e[0]);
        }}
        step={0.1}
        max={length}
        value={value}
        ref={root}
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
    </form>
  );
};

export default Progressbar;
