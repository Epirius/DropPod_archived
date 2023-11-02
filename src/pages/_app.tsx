import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Analytics } from "@vercel/analytics/react";
import "~/styles/globals.css";
import Player from "~/components/player/Player";
import Head from "next/head";
import Header from "~/components/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainWrapper from "~/components/MainWrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>DropPod</title>
        <meta name="description" content="a podcast app" />
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

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <div className="flex h-screen max-h-screen min-h-screen flex-col">
            <Header />
            <div className="h-1 flex-grow bg-GRAY_CLOUD text-slate-50 h-full overflow-y-auto">
              <MainWrapper>
                <Component {...pageProps} />
              </MainWrapper>
              <Analytics />
            </div>
            <Player />
          </div>
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
