import { type ChangeEvent } from "react";
import { type MetaData, zMetaData } from "~/types/podcastTypes";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import CardList from "~/components/CardList";
import Spinner from "~/components/Spinner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();
  const searchTerm = useSearchParams().get("q") ?? "";

  const debouncedFilter = useDebounce(searchTerm, 500);
  const { data, isLoading, error } = useQuery(
    ["searching", debouncedFilter],
    () => fetchSearchResults(debouncedFilter),
    { enabled: Boolean(debouncedFilter), staleTime: 60 * 1000 * 24 }
  );

  const fetchSearchResults = async (
    searchTerm: string
  ): Promise<MetaData[]> => {
    if (searchTerm.length === 0) return [];
    const res = await fetch(`/api2/podcast/search?search=${searchTerm}`);
    return zMetaData.array().parse(await res.json());
  };

  const updateQueryParamas = (e: ChangeEvent<HTMLInputElement>) => {
    void router.replace(
      e.target.value.length > 0
        ? `?q=${e.target.value.replace(/ /g, "%20")}`
        : ""
    );
  };

  return (
    <div className="px-8 pt-8 ">
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-row items-center">
          <h1 className="text-3xl font-bold pr-4">Search:</h1>
          {isLoading && searchTerm && searchTerm.length > 0 && (
            <Spinner size={24} thickness={3} />
          )}
        </div>
        <input
          type="text"
          onChange={updateQueryParamas}
          value={searchTerm ?? ""}
          placeholder="Title"
          className="bg-BLACK_CYNICAL text-WHITE_EGG rounded-xl h-8 pl-2 w-full sm:w-96"
        />
      </div>
      <CardList data={data ?? []} isLoading={isLoading} error={error} />
    </div>
  );
};

export default SearchPage;
