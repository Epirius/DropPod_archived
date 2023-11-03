import { useSession } from "next-auth/react";
import {
  PiHeartBold,
  PiSpinnerBold,
  PiHeartBreakDuotone,
  PiHeartFill,
  PiHeartHalfDuotone,
} from "react-icons/pi";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { dbUrl } from "~/utils/backendInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zMetaData } from "~/types/podcastTypes";

interface Props {
  podcastGuid?: string;
}

const Favourite = ({ podcastGuid }: Props) => {
  const session = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const favouriteList = useQuery({
    queryKey: ["favourite", session.data?.user?.id],
    staleTime: 60 * 1000 * 5,
    queryFn: () =>
      fetch(`${dbUrl}/api/subscribe`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => zMetaData.array().parse(res)),
  });

  const mutateFavourite = useMutation({
    mutationFn: (isFav?: boolean) => {
      if (session.status !== "authenticated") {
        void router.push("/login");
        return Promise.reject("not authenticated");
      }
      if (!podcastGuid || isFav === undefined) {
        console.log("podcastGuid is undefined");
        return Promise.reject(`Illegal mutation: 
        ${!podcastGuid ? "podcastGuid is undefined" : ""}
        ${isFav === undefined ? `isFav is undefined}` : ""}
        `);
      }
      if (isFav) {
        return fetch(`${dbUrl}/api/subscribe?podcast_id=${podcastGuid}`, {
          method: "DELETE",
          credentials: "include",
        });
      } else {
        return fetch(`${dbUrl}/api/subscribe?podcast_id=${podcastGuid}`, {
          method: "POST",
          credentials: "include",
        });
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries(["favourite", session.data?.user?.id]),
  });

  if (!podcastGuid) {
    return <div>The slug is invalid. slug: {podcastGuid}</div>;
  }

  const isFav = favouriteList.data
    ?.map((podcast) => podcast.guid)
    .includes(podcastGuid);

  return (
    <button
      className="rounded-full bg-BLACK_CYNICAL h-10 w-20 font-semibold text-WHITE_EGG flex items-center justify-center group text-2xl"
      disabled={favouriteList.status !== "success"}
      onClick={() => mutateFavourite.mutate(isFav)}
      aria-label={
        isFav ? "remove podcast from favourites" : "add podcast to favourites"
      }
    >
      {favouriteList.status === "error" && !favouriteList.isFetching && (
        <PiHeartBreakDuotone />
      )}
      {favouriteList.status === "success" &&
        !favouriteList.isFetching &&
        isFav && <PiHeartFill className="group-hover:text-red-300" />}
      {favouriteList.status === "success" &&
        !favouriteList.isFetching &&
        !isFav && <PiHeartBold className="group-hover:text-green-300" />}
      {favouriteList.isFetching && <PiHeartHalfDuotone />}
      {(favouriteList.status === "loading" || favouriteList.isLoading) && (
        <PiSpinnerBold />
      )}
    </button>
  );
};

export default Favourite;
