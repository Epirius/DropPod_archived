/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { parse } from "fsp-xml-parser";

export const parseFromUrl = async (url: string) => {
    const xml = await fetch(url).then(
    async (res) => parse(await res.text())
  );
    let root;
     if (xml && xml.root && xml.root.children) {
        root = xml.root?.children[0]?.children
     } else {
        throw new Error("could not read the xml");
     }
     
    const meta = root!.filter( node => node.name !== 'item')
    const items= root!.filter( node => node.name === 'item')
    
    const episodes: EpisodeType[] = items.map(item => {
        const episode: EpisodeType = {
            title: item.children?.find(node => node.name === 'title')?.content ?? "Error could not find name",
            enclosure: item.children?.find(node => node.name === 'enclosure')?.attributes as {url: string, length?: string, type?: string} ?? {url: "error could not read enclosure", length: undefined, type: undefined},
            guid: item.children?.find(node => node.name === 'guid')?.content ?? undefined,
            description: item.children?.find(node => node.name === 'description')?.content,
        };
        return episode;
    })

    const podcastData: metaData = {
        title: meta.find(node => node.name === 'title')?.content ?? "Error could not parse title",
        link:  meta.find(node => node.name === 'link')?.content ?? null,
        image:  meta.find(node => node.name === 'image')?.children?.find(node => node.name === 'url')?.content,
        language: meta.find(node => node.name === 'language')?.content,
        description: meta.find(node => node.name === 'description')?.content,
        items: episodes,

    }

    return podcastData;
}
//  meta.find(node => node.name === '')