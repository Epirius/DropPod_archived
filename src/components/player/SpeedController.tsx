import React from "react";
import { BiSolidChevronDownCircle, BiSolidChevronUpCircle} from "react-icons/bi";

interface Props {
    speed: number;
    setSpeed: (speed: number) => void;
}

export const SpeedController = ({speed, setSpeed}: Props) => {
    const iconClassname = "text-WHITE_EGG hover:scale-105";

    const increaseSpeed = () => {
        const newSpeed = Number((speed + 0.1).toFixed(1));
        setSpeed(newSpeed);
    }

    const decreaseSpeed = () => {
        const newSpeed = Number((speed - 0.1).toFixed(1));
        if (newSpeed > 0) {
            setSpeed(newSpeed);
        }

    }

    return (
        <div className="flex flex-col items-center gap-1.5">
            <button aria-label="increase playback speed" onClick={() => increaseSpeed()}>
                <BiSolidChevronUpCircle className={iconClassname}  />
            </button>
            <div className="flex flex-row justify-end gap-0.5 pr-1.5 bg-WHITE_EGG text-BLACK_CYNICAL w-[2rem] ">
                <p className="m-0 text-[0.8rem] font-medium" aria-label="current playback speed">{speed}</p>
                <p className="m-0 text-[0.8rem] font-medium" aria-label="current playback speed">x</p>
            </div>
            <button aria-label="decrease playback speed" onClick={() => decreaseSpeed()}>
                <BiSolidChevronDownCircle className={iconClassname} />
            </button>
        </div>
    )
};

export default SpeedController;