import { useRouter } from "next/router";
import React from "react";
import { zMetaData } from "~/types/podcastTypes";
import type { MetaData } from "~/types/podcastTypes";
import { dbUrl } from "~/utils/backendInfo";
import { useQuery } from "@tanstack/react-query";
import CardList from "~/components/CardList";

const CategoryPage = () => {
  const slug = useRouter().query.slug as string;
  const { data, isLoading, error } = useQuery(
    ["category", slug],
    () => fetchCategoryResults(slug),
    { staleTime: 60 * 1000 * 24 }
  );

  const fetchCategoryResults = async (slug: string): Promise<MetaData[]> => {
    const languageCode = "en";
    const quantity = 12;
    const res = await fetch(
      `${dbUrl}/api2/podcast/list?category=${slug}&lang=${languageCode}&quantity=${quantity}`
    );
    return zMetaData.array().parse(await res.json());
  };

  return <CardList data={data ?? []} isLoading={isLoading} error={error} />;
};

export default CategoryPage;
