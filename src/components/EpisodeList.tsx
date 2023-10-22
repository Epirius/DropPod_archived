import type { EpisodeData } from "~/types/podcastTypes";
import React from "react";
import * as Separator from "@radix-ui/react-separator";
import { useAudioStore } from "~/components/player/Player";

type Props = {
  data: EpisodeData[];
};

export const EpisodeList = ({ data }: Props) => {
  return (
    <div>
      <Separator.Root className="bg-BLACK_CYNICAL  rounded-sm py-0.5 mb-4" />
      {data.map((e, i) => {
        return <EpisodeItem episode={e} key={i} />;
      })}
    </div>
  );
};

type ItemProps = {
  episode: EpisodeData;
};
const EpisodeItem = ({ episode }: ItemProps) => {
  const [setAudioSource] = useAudioStore((state) => [state.setAudioSource]);
  return (
    <div className="flex-col flex">
      <div className="flex flex-row justify-between px-4">
        <p className="sm:text-xl text-sm sm:truncate">{episode.title}</p>
        <button
          className="pl-4 sm:pl-8 text-sm sm:text-base"
          onClick={() => setAudioSource(episode)}
        >
          play
        </button>
      </div>
      <Separator.Root className="bg-BLACK_CYNICAL  rounded-sm py-0.5 my-4" />
    </div>
  );
};
