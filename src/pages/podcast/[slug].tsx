import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { prisma } from "~/server/db";
import type { GetServerSideProps } from "next";
import type { Podcast } from "@prisma/client";
import Image from "next/image";
import EpisodeList from "~/components/EpisodeList";
import { parseFromUrl } from "~/utils/parser";

const PodcastPage = ({ podcast, podcastData }: PageProp) => {
  const slug = useRouter().query.slug;

  if (!podcast) return <p>could not load page</p>;
  return (
    <div className="relative h-full flex flex-col">
      <div className="">

      <p>{slug}</p>
      <Image
        src={podcast.imageUrl}
        alt={"cover image for the podcast"}
        width={300}
        height={300}
        priority={true}
      />
      </div>
      {/* line break */}
      <div className="relative flex-grow">

      <EpisodeList podcast={podcast} metaData={podcastData} />
      </div>
    </div>
  );
};

type PageProp = {
  podcast: Podcast | null;
  podcastData: metaData;
};

export const getServerSideProps: GetServerSideProps<PageProp> = async ({
  params,
}) => {
  const podcasts: Podcast | null = await prisma.podcast.findUniqueOrThrow({
    where: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      guid: `${params?.slug}`,
    },
  });
  const podcastData: metaData = await parseFromUrl(podcasts.url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const podcast: Podcast | null = await JSON.parse(JSON.stringify(podcasts));

  return {
    props: { podcast, podcastData },
  };
};

export default PodcastPage;
