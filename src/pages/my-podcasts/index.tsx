import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { zMetaData } from "~/types/podcastTypes";
import CardList from "~/components/CardList";

const MyPodcastsPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      void router.push("/login");
    }
  }, [router, session]);

  const favouriteList = useQuery({
    queryKey: ["favourite", session.data?.user?.id],
    staleTime: 60 * 1000 * 5,
    queryFn: () =>
      fetch(`/api2/subscribe`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => zMetaData.array().parse(res)),
  });

  return (
    <div>
      <h1 className="pb-4 text-2xl">My Podcasts:</h1>
      {favouriteList.status === "success" && (
        <CardList
          data={favouriteList.data}
          isLoading={favouriteList.isLoading}
          error={favouriteList.error}
        />
      )}
    </div>
  );
};

export default MyPodcastsPage;
