import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import PodcastCard from "~/components/PodcastCard";
import { zMetaData } from "~/types/podcastTypes";
import type { MetaData } from "~/types/podcastTypes";
import { dbUrl } from "~/utils/backendInfo";
import MainWrapper from "~/components/MainWrapper";

export default function Home() {
  const { data: sessionData } = useSession();
  const [podcasts, setPodcasts] = useState<MetaData[]>([]);

  useEffect(() => {
    const getPodcasts = async () => {
      const category = "history";
      const languageCode = "en";
      const quantity = 12;
      const res = await fetch(
        `${dbUrl}/api2/podcast/list?category=${category}&lang=${languageCode}&quantity=${quantity}`
      );
      if (!res.ok) return;
      const data = zMetaData.array().parse(await res.json());
      if (!data) return;
      setPodcasts(data);
    };
    void getPodcasts();
  }, []);

  return (
    <>
      <Head>
        <title>DropPod</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <main className=" overflow-auto ">
        {sessionData && (
          <MainWrapper>
            <div className="grid grid-cols-4  gap-4 overflow-x-hidden">
              {podcasts &&
                podcasts.map((p) => (
                  <PodcastCard key={p.guid + "_card"} data={p} />
                ))}
            </div>
          </MainWrapper>
        )}
        {!sessionData && <p>NOT SIGNED IN</p>}
      </main>
    </>
  );
}
