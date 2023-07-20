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
    <div>
      <p>{slug}</p>
      <Image
        src={podcast.imageUrl}
        alt={"cover image for the podcast"}
        width={300}
        height={300}
      />
      {/* line break */}
      <EpisodeList podcast={podcast} metaData={podcastData} />
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
  if (!params) return { props: { podcast: null } };

  const podcasts: Podcast | null = await prisma.podcast.findUniqueOrThrow({
    where: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      guid: `${params.slug}`,
    },
  });
  const podcastData: metaData = await parseFromUrl(podcasts.url);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    props: { podcast: JSON.parse(JSON.stringify(podcasts)), podcastData },
  };
};

export default PodcastPage;
