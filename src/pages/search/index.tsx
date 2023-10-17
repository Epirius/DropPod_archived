import {useState} from "react";
import {dbUrl} from "~/utils/backendInfo";
import {zMetaData} from "~/types/podcastTypes";
import PodcastCard, {CardType} from "~/components/PodcastCard";
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "@uidotdev/usehooks";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {IoGridSharp, IoListSharp} from "react-icons/io5";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cardType, setCardType] = useState<CardType>(CardType.Cover);

  const debouncedFilter = useDebounce(searchTerm, 500);
  const { data, isLoading, error  } = useQuery(
    ['searching', debouncedFilter],
    () => fetchSearchResults(debouncedFilter),
    { enabled: Boolean(debouncedFilter), staleTime: Infinity }
  )

  const fetchSearchResults = async (searchTerm: string) => {
    if (searchTerm.length === 0) return [];
    const res = await fetch(`${dbUrl}/api/podcast/search?search=${searchTerm}`);
    const data = zMetaData.array().parse(await res.json());
    return data;
  }
  const toggleClasses = "bg-BLACK_CYNICAL text-WHITE_EGG  w-8 h-8 data-[state=on]:bg-RED_CARMINE flex items-center justify-center first:rounded-l last:rounded-r"
  const gridClass = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-4"
  const listClass = "flex flex-col gap-6"

  return (
    <div className="px-8 pt-8 ">
      <div className="flex flex-col gap-4 pb-8">
        <h1 className="text-3xl font-bold">Search:</h1>
        <input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Title"
          className="bg-BLACK_CYNICAL text-WHITE_EGG rounded-xl h-8 pl-2 w-full sm:w-96"
        />
        <ToggleGroup.Root
          aria-label="Display options"
          defaultValue="cover"
          value={cardType == CardType.Cover ? "Cover" : "List"}
          type="single"
          className="flex flex-row"
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
      </div>
      <div
        className={cardType == CardType.Cover ? gridClass : listClass}
      >
        {data && !isLoading && data.map((p) => (
          <PodcastCard key={p.guid + "_card"} data={p} type={cardType} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage