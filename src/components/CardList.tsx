import {MetaData} from "~/types/podcastTypes";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import PodcastCard, {CardType} from "~/components/PodcastCard";
import {IoGridSharp, IoListSharp} from "react-icons/io5";
import {useState} from "react";


interface Props {
  data: MetaData[],
  isLoading: boolean,
  error: any
}
const CardList = ({data, isLoading, error}: Props) => {
  const [cardType, setCardType] = useState<CardType>(CardType.Cover);
  const toggleClasses = "bg-BLACK_CYNICAL text-WHITE_EGG  w-8 h-8 data-[state=on]:bg-RED_CARMINE flex items-center justify-center first:rounded-l last:rounded-r"
  const gridClass = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-4"
  const listClass = "flex flex-col gap-6"

  return (
    <div>
      <ToggleGroup.Root
        aria-label="Display options"
        defaultValue="cover"
        value={cardType == CardType.Cover ? "Cover" : "List"}
        type="single"
        className="flex flex-row pb-4"
        orientation="horizontal"
        onValueChange={val => {
          if (val === "List") setCardType(CardType.List)
          if (val === "Cover") setCardType(CardType.Cover)
        }}
      >
        <ToggleGroup.Item value="Cover" aria-label="Card" className={toggleClasses}>
          <IoGridSharp/>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="List" aria-label="List" className={toggleClasses}>
          <IoListSharp/>
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <div
        className={cardType == CardType.Cover ? gridClass : listClass}
      >
        {data && data.length > 0 && !isLoading && data.map((p) => (
          <PodcastCard key={p.guid + "_card"} data={p} type={cardType} />
        ))}
        {data && data.length === 0 && !isLoading && (
          <p>Could not find any podcasts</p>
        )}
      </div>
    </div>
  )
}

export default CardList;