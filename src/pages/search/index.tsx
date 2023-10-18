import {useState} from "react";
import {dbUrl} from "~/utils/backendInfo";
import {MetaData, zMetaData} from "~/types/podcastTypes";
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "@uidotdev/usehooks";
import CardList from "~/components/CardList";
import Spinner from "~/components/Spinner";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedFilter = useDebounce(searchTerm, 500);
  const { data, isLoading, error  } = useQuery(
    ['searching', debouncedFilter],
    () => fetchSearchResults(debouncedFilter),
    { enabled: Boolean(debouncedFilter), staleTime: 60 * 1000 * 24 }
  )

  const fetchSearchResults = async (searchTerm: string) : Promise<MetaData[]> => {
    if (searchTerm.length === 0) return [];
    const res = await fetch(`${dbUrl}/api/podcast/search?search=${searchTerm}`);
    return zMetaData.array().parse(await res.json());
  }

  return (
    <div className="px-8 pt-8 ">
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-row items-center">
          <h1 className="text-3xl font-bold pr-4">Search:</h1>
          {isLoading && searchTerm && searchTerm.length > 0 &&
              <Spinner size={24} thickness={3} />
          }
        </div>
        <input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Title"
          className="bg-BLACK_CYNICAL text-WHITE_EGG rounded-xl h-8 pl-2 w-full sm:w-96"
        />
      </div>
       <CardList data={data ?? []} isLoading={isLoading} error={error}/>
    </div>
  );
}

export default SearchPage