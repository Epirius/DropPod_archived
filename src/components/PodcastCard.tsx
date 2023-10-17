import Image from "next/image";
import Link from "next/link";
import React from "react";
import type {MetaData} from "~/types/podcastTypes";

export enum CardType {
  Cover,
  List
}
interface Props {
  data: MetaData;
  type?: CardType
  size?: number
}

const PodcastCard = ({ data, type = CardType.Cover, size }: Props) => {
  if (!size && type === CardType.List) size = 100;
  if (!size && type === CardType.Cover) size = 200;

  return (
    <div>
      {type === CardType.Cover &&
        <Link href={"/podcast/" + data.guid}>
          <Image
            src={data.image_url}
            width={size}
            height={size}
            alt={"cover image for " + data.title}
            priority={true}
          />
        </Link>
      }
      {type === CardType.List &&
        <Link href={"/podcast/" + data.guid}>
          <div className="flex flex-row gap-4 max-h-[] ">
            <Image
              src={data.image_url}
              width={size}
              height={size}
              alt={"cover image for " + data.title}
              priority={true}
            />
            <div className="overflow-y-hidden" style={{maxHeight: size}}>
              <p className="font-light text-sm">
                {data.category}
              </p>
              <p className="font-medium text-xl ">
                {data.title}
              </p>
            </div>
          </div>
        </Link>
      }
    </div>
  );
};

export default PodcastCard;
