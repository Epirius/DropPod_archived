import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { Podcast } from "@prisma/client";
import Image from "next/image";
import EpisodeList from "~/components/EpisodeList";
import { parseFromUrl } from "~/utils/parser";
import * as process from "process";
import { dbUrl } from "~/utils/backendInfo";
import { MetaData, zMetaData } from "~/types/podcastTypes";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

const PodcastPage = () => {
  const slug = useRouter().query.slug;
  const [metadata, setMetadata] = useState<MetaData>();

  useEffect(() => {
    if (typeof slug !== "string") return;
    const get_data = async () => {
      const res = await fetch(`${dbUrl}/api/podcast/meta/${slug}`);
      if (!res.ok) return;
      setMetadata(zMetaData.parse(await res.json()));
    };
    void get_data();
  }, [slug]);

  if (slug! instanceof String) {
    return <div>The slug is invalid. slug: {slug}</div>;
  }

  // if (!podcast) return <p>could not load page</p>;
  return (
    <div className="relative h-full flex flex-col">
      {/* Podcast metadata display */}
        <div className=" md:w-full  self-center md:self-start md:pl-12 pt-8 md:pt-12 flex flex-col md:flex-row gap-4 md:gap-12">
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex-none">
          <AspectRatio.Root ratio={1/1}>
            {metadata?.image_url && <Image
              className="rounded-2xl"
              src={metadata.image_url}
              alt={"cover image for the podcast"}
              width={300}
              height={300}
              priority={true}
            />}
            {metadata?.image_url && <div className="bg-gray-200 rounded-2xl"/>}
          </AspectRatio.Root>
          </div>
          <div className="flex flex-col flex-shrink max-w-xl xl:max-w-4xl h-[200px] md:h-[300px] pr-6">
            <h1 className="text-3xl font-bold">{metadata ? metadata.title : "Podcast"}</h1>
            {metadata?.description && <p className="hidden md:flex overflow-y-hidden" style={{overflowWrap: "anywhere", wordBreak: "break-word"}}>{metadata.description}</p>}
          </div>
        </div>
      {/* Episode list */}
      {/*<div className="relative flex-grow">*/}

      {/*<EpisodeList podcast={podcast} metaData={podcastData} />*/}
      {/*</div>*/}
    </div>
  );
};
//
// type PageProp = {
//   podcast: Podcast | null;
//   podcastData: metaData;
// };
//
// export const getServerSideProps: GetServerSideProps<PageProp> = async ({
//   params,
// }) => {
//   const podcasts: Podcast | null = await prisma.podcast.findUniqueOrThrow({
//     where: {
//       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//       guid: `${params?.slug}`,
//     },
//   });
//   const podcastData: metaData = await parseFromUrl(podcasts.url);
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   const podcast: Podcast | null = await JSON.parse(JSON.stringify(podcasts));
//
//   return {
//     props: { podcast, podcastData },
//   };
// };

export default PodcastPage;
