import { type Podcast } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {MetaData} from "~/types/podcastTypes";

interface Props {
  data: MetaData;
}

const PodcastCard = ({ data }: Props) => {
  return (
    <div>
      <p>{data.title}</p>
      <Link href={"/podcast/" + data.guid}>
        <Image
          src={data.image_url}
          width={200}
          height={200}
          alt={"cover image for " + data.title}
          priority={true}
        />
      </Link>
    </div>
  );
};

export default PodcastCard;
