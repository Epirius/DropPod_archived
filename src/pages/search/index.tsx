import {type ChangeEvent, useEffect, useState} from "react";
import { dbUrl} from "~/utils/backendInfo";
import {type MetaData, zMetaData} from "~/types/podcastTypes";
import PodcastCard from "~/components/PodcastCard";
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "@uidotdev/usehooks";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedFilter = useDebounce(searchTerm, 500);
    const { data, isLoading, error  } = useQuery(
        ['searching', debouncedFilter],
        () => fetchSearchResults(debouncedFilter),
        { enabled: Boolean(debouncedFilter) }
    )

    const fetchSearchResults = async (searchTerm: string) => {
        if (searchTerm.length === 0) return [];
        const res = await fetch(`${dbUrl}/api/podcast/search?search=${searchTerm}`);
        const data = zMetaData.array().parse(await res.json());
        return data;
    }

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                onChange={e => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="text-RED_CARMINE"
            />
            {data && !isLoading && data.map((p) => (
                <PodcastCard key={p.guid + "_card"} data={p} />
            ))}
        </div>
    );
}

export default SearchPage