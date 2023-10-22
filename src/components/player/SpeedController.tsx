import React from "react";
import {
  BiSolidChevronDownCircle,
  BiSolidChevronUpCircle,
} from "react-icons/bi";

interface Props {
  speed: number;
  setSpeed: (speed: number) => void;
}

export const SpeedController = ({ speed, setSpeed }: Props) => {
  const iconClassname = "text-WHITE_EGG hover:scale-105";

  const increaseSpeed = () => {
    const newSpeed = Number((speed + 0.1).toFixed(1));
    setSpeed(newSpeed);
  };

  const decreaseSpeed = () => {
    const newSpeed = Number((speed - 0.1).toFixed(1));
    if (newSpeed > 0) {
      setSpeed(newSpeed);
    }
  };

  const toggleSpeed = () => {
    const options = [1, 1.2, 1.5, 1.7, 2];
    if (!options.includes(speed)) {
      setSpeed(1);
    }
    const index = options.indexOf(speed);
    const newSpeed = options.at(index + 1) ?? 1;
    setSpeed(newSpeed);
  };

  return (
    <div className="sm:flex flex-col items-center gap-1.5 p-2 hidden">
      <button
        aria-label="increase playback speed"
        onClick={() => increaseSpeed()}
      >
        <BiSolidChevronUpCircle className={iconClassname} />
      </button>
      <button onClick={() => toggleSpeed()}>
        <div className="flex flex-row justify-end gap-0.5 pr-1.5 bg-WHITE_EGG text-BLACK_CYNICAL w-[2.5rem] rounded-sm">
          <p
            className="m-0 text-[0.8rem] font-medium"
            aria-label="current playback speed"
          >
            {speed}
          </p>
          <p
            className="m-0 text-[0.8rem] font-medium"
            aria-label="current playback speed"
          >
            x
          </p>
        </div>
      </button>
      <button
        aria-label="decrease playback speed"
        onClick={() => decreaseSpeed()}
      >
        <BiSolidChevronDownCircle className={iconClassname} />
      </button>
    </div>
  );
};

export default SpeedController;
