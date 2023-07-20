import type { Podcast } from "@prisma/client";
import { Virtualizer, useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef, useState } from "react";
import { randomUUID } from "crypto";

interface Props {
  podcast: Podcast;
  metaData: metaData;
}

const EpisodeList = ({ podcast, metaData }: Props) => {
  // The scrollable element for your list
  const parentRef = useRef(null);
  console.log(metaData);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: metaData.items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 20,
  });
  return (
    <div className="h-[30rem] overflow-auto bg-yellow-500" ref={parentRef}>
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

const Episode = ({ data }: { data: EpisodeType | undefined }) => {
  if (!data) {
    return <p className="bg-red-600">error this episode does not exist</p>;
  }
  return (
    <div>
      <p>{data.title}</p>
    </div>
  );
};

export default EpisodeList;

/*
{rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={virtualRow.index % 2 ? "bg-yellow-400" : "bg-yellow-600"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            hi
            {/* {episodes[virtualRow.index].map((e) => ( * /}
            {/* <Episode key={virtualRow.index} data={e} /> * /}
            {/* ))} * /}
            {/* <Episode /> * /}
          // </div>
        // ))}
// */
