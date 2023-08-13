import type { Podcast } from "@prisma/client";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef } from "react";
import { useAudioStore } from "./player/Player";

interface Props {
  podcast: Podcast;
  metaData: metaData;
}

const EpisodeList = ({ podcast, metaData }: Props) => {
  // The scrollable element for your list
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: metaData.items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
    overscan: 5,
  });
  return (
    <div
      className=" absolute bottom-0 top-0 w-full overflow-auto bg-yellow-500"
      ref={parentRef}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virutalRow) => (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virutalRow.size}px`,
              transform: `translateY(${virutalRow.start}px)`,
            }}
            key={`${virutalRow.index}_e_key`}
          >
            <Episode data={metaData.items[virutalRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

interface EpisodeProps {
  data: EpisodeType | undefined;
}

const Episode = ({ data }: EpisodeProps) => {
  const [setAudioSource] = useAudioStore((state) => [state.setAudioSource]);
  if (!data) {
    return <p className="bg-red-600">error this episode does not exist</p>;
  }

  return (
    <div className="space-be flex flex-row justify-between">
      <p>{data.title}</p>
      <button onClick={() => setAudioSource(data)}>play</button>
    </div>
  );
};

export default EpisodeList;
