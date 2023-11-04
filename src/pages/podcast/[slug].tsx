import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { dbUrl } from "~/utils/backendInfo";
import { zMetaData, zEpisodeData } from "~/types/podcastTypes";
import type { EpisodeData, MetaData } from "~/types/podcastTypes";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { EpisodeList } from "~/components/EpisodeList";
import Favourite from "~/components/Favourite";
import { clearHtmlTags } from "~/utils/utils";

const PodcastPage = () => {
  const slug = useRouter().query.slug;
  const [metadata, setMetadata] = useState<MetaData>();
  const [episodeData, setEpisodeData] = useState<EpisodeData[]>([]);

  useEffect(() => {
    if (typeof slug !== "string") return;
    const getMetadata = async () => {
      const res = await fetch(`${dbUrl}/api2/podcast/meta/${slug}`);
      if (!res.ok) return;
      setMetadata(zMetaData.parse(await res.json()));
    };
    const getEpisodedata = async () => {
      const res = await fetch(`${dbUrl}/api2/podcast/episode/${slug}`);
      if (!res.ok) return;
      const data = zEpisodeData.parse(await res.json());
      if (!data) return;
      setEpisodeData(data);
    };
    void Promise.allSettled([getEpisodedata(), getMetadata()]);
    episodeData.map(
      (e) => (e.image_url = e.image_url ?? metadata?.image_url ?? "")
    );
  }, [slug]);

  if (typeof slug !== "string") {
    return <div>The slug is invalid. slug: {slug}</div>;
  }

  // if (!podcast) return <p>could not load page</p>;
  return (
    <div className="relative sm:px-12 flex flex-col">
      {/* Podcast metadata display */}
      <div className="flex flex-col items-center pb-8 gap-4 md:gap-8">
        <div className=" md:w-full  items-center md:self-start flex flex-col md:flex-row gap-4 md:gap-12">
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] flex-none">
            <AspectRatio.Root ratio={1}>
              {metadata?.image_url && (
                <Image
                  className="rounded-2xl"
                  src={metadata.image_url}
                  alt={"cover image for the podcast"}
                  width={300}
                  height={300}
                  priority={true}
                />
              )}
              {metadata?.image_url && (
                <div className="bg-gray-200 rounded-2xl" />
              )}
            </AspectRatio.Root>
          </div>
          <div className="flex flex-col flex-shrink max-w-xl xl:max-w-4xl  md:h-[300px]">
            <h1 className="text-3xl font-bold">
              {metadata ? metadata.title : "Podcast"}
            </h1>
            {metadata?.description && (
              <p
                className="hidden md:flex overflow-y-hidden"
                style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {clearHtmlTags(metadata.description)}
              </p>
            )}
          </div>
        </div>
        <Favourite podcastGuid={metadata?.guid} />
      </div>
      {episodeData && <EpisodeList data={episodeData} />}
    </div>
  );
};

export default PodcastPage;
