import { type Podcast } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  data: Podcast;
}

const PodcastCard = ({ data }: Props) => {
  return (
    <div>
      <p>{data.title}</p>
      <Link href={"/podcast/" + data.guid}>
        <Image
          src={data.imageUrl}
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
