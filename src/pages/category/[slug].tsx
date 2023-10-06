import { useRouter } from "next/router";
import React from "react";
import PodcastCard from "~/components/PodcastCard";
import { api } from "~/utils/api";

const CategoryPage = () => {
  const slug = useRouter().query.slug as string;
  const podcasts = api.podcast.getPodcast.useQuery({
    category: slug,
    languageCode: "en",
    limit: 10,
  });
  return (
    <div className="grid grid-cols-4  gap-4 overflow-x-hidden">
      {podcasts.data &&
        podcasts.data.map((p) => (
          <PodcastCard key={p.guid + "_card"} data={p} />
        ))}
    </div>
  );
};

export default CategoryPage;
