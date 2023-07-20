
interface CommonPodcastData {
    title: string,
    link?: string | null,
    image?: string,
    language?: string,
    description?: string,
    items: EpisodeType[],
}

interface metaData extends CommonPodcastData {
    [key: string]: string | number | boolean | EpisodeType[] | null | undefined
}

interface CommonEpisodeData{
    title: string,
    enclosure: {
        length?: string,
        type?: string,
        url: string,
    },
    description?: string,
    guid?: string | CDATASection,
}

interface EpisodeType extends CommonEpisodeData {
    [key: string]: string | CDATASection | {length?: string, type?: string, url: string} | number | boolean | undefined
}