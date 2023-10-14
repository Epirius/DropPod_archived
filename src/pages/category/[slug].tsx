import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import PodcastCard from "~/components/PodcastCard";
import {MetaData, zMetaData} from "~/types/podcastTypes";
import {dbUrl} from "~/utils/backendInfo";

const CategoryPage = () => {
  const slug = useRouter().query.slug as string;
  const [podcasts, setPodcasts] = useState<[MetaData]>();

  useEffect(() => {
    if (!slug) return;
    const getPodcasts = async () => {
      const languageCode = "en";
      const quantity = 12;
      const res = await fetch(`${dbUrl}/api/podcast/list?category=${slug}&lang=${languageCode}&quantity=${quantity}`);
      if (!res.ok) return;
      const data = zMetaData.array().parse(await res.json());
      if (!data) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setPodcasts(data);
    }
    void getPodcasts();
  }, [slug])

  // const podcasts = api.podcast.getPodcast.useQuery({
  //   category: slug,
  //   languageCode: "en",
  //   limit: 10,
  // });
  return (
    <div className="grid grid-cols-4  gap-4 overflow-x-hidden">
      {podcasts &&
        podcasts.map((p) => (
          <PodcastCard key={p.guid + "_card"} data={p} />
        ))}
    </div>
  );
};

export default CategoryPage;
