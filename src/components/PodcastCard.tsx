import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { MetaData } from "~/types/podcastTypes";

export enum CardType {
  Cover,
  List,
}
interface Props {
  data: MetaData;
  type?: CardType;
  size?: number;
}

//TODO handle data still loading, or missing images / title / category
const PodcastCard = ({ data, type = CardType.Cover, size }: Props) => {
  if (!size && type === CardType.List) size = 100;
  if (!size && type === CardType.Cover) size = 200;

  return (
    <div>
      {type === CardType.Cover && (
        <Link
          href={"/podcast/" + data.guid}
          className="flex justify-center items-center"
        >
          <Image
            src={data.image_url}
            width={size}
            height={size}
            alt={"cover image for " + data.title}
            priority={true}
            className="rounded-md hover:scale-105 transition-all"
          />
        </Link>
      )}
      {type === CardType.List && (
        <Link href={"/podcast/" + data.guid} className="group">
          <div className="flex flex-row gap-4 max-h-[] ">
            <Image
              src={data.image_url}
              width={size}
              height={size}
              alt={"cover image for " + data.title}
              priority={true}
              className="rounded-md group-hover:scale-105 transition-all"
            />
            <div className="overflow-y-hidden" style={{ maxHeight: size }}>
              <p className="font-light text-sm">{data.category}</p>
              <p className="font-medium group-hover:underline transition-all">
                {data.title}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default PodcastCard;
