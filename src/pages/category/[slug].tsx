import { useRouter } from "next/router";
import React, {useEffect, useState} from "react";
import PodcastCard from "~/components/PodcastCard";
import {zMetaData} from "~/types/podcastTypes";
import type {MetaData} from "~/types/podcastTypes";
import {dbUrl} from "~/utils/backendInfo";
import {useQuery} from "@tanstack/react-query";
import CardList from "~/components/CardList";

const CategoryPage = () => {
  const slug = useRouter().query.slug as string;
  // const [podcasts, setPodcasts] = useState<MetaData[]>([]);
  //
  // useEffect(() => {
  //   if (!slug) return;
  //   const getPodcasts = async () => {
  //     const languageCode = "en";
  //     const quantity = 12;
  //     const res = await fetch(`${dbUrl}/api/podcast/list?category=${slug}&lang=${languageCode}&quantity=${quantity}`);
  //     if (!res.ok) return;
  //     const data = zMetaData.array().parse(await res.json());
  //     if (!data) return;
  //     setPodcasts(data);
  //   }
  //   void getPodcasts();
  // }, [slug])
  const { data, isLoading, error  } = useQuery(
    ['category', slug],
    () => fetchCategoryResults(slug),
    { staleTime: 60 * 1000 * 24 }
  )

  const fetchCategoryResults = async (slug: string) : Promise<MetaData[]> => {
    const languageCode = "en";
    const quantity = 12;
    const res = await fetch(`${dbUrl}/api/podcast/list?category=${slug}&lang=${languageCode}&quantity=${quantity}`);
    return zMetaData.array().parse(await res.json());
  }

  return (
    // <div className="grid grid-cols-4  gap-4 overflow-x-hidden">
    //   {podcasts &&
    //     podcasts.map((p) => (
    //       <PodcastCard key={p.guid + "_card"} data={p} />
    //     ))}
    // </div>
    <CardList data={data ?? []} isLoading={isLoading} error={error}/>
  );
};

export default CategoryPage;
