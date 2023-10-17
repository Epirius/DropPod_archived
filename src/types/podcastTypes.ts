import { z } from "zod";
export type MetaData = {
  guid: string;
  url: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  language_code: string;
};
export const zMetaData = z.object({
  guid: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  category: z.string(),
  language_code: z.string(),
});

export type EpisodeData = {
  title: string | null,
  description: string | null,
  audio_url: string | null,
  guid: string | null,
  date: string | null,
  image_url: string | null,
  episode: string | null,
  season: string | null,
};

export const zEpisodeData = z.array(z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  audio_url: z.string().nullable(),
  guid: z.string().nullable(),
  date: z.string().nullable(),
  image_url: z.string().nullable(),
  episode: z.string().nullable(),
  season: z.string().nullable(),
}))

// interface CommonPodcastData {
//     title: string,
//     link?: string | null,
//     image?: string,
//     language?: string,
//     description?: string,
//     items: EpisodeType[],
// }
//
// interface metaData extends CommonPodcastData {
//     [key: string]: string | number | boolean | EpisodeType[] | null | undefined
// }
//
// interface CommonEpisodeData{
//     title: string,
//     enclosure: {
//         length?: string,
//         type?: string,
//         url: string,
//     },
//     description?: string,
//     guid?: string | CDATASection,
// }
//
// interface EpisodeType extends CommonEpisodeData {
//     [key: string]: string | CDATASection | {length?: string, type?: string, url: string} | number | boolean | undefined
// }
