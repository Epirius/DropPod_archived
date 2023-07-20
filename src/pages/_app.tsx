import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/Header";
import Player from "~/components/Player";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex h-screen max-h-screen min-h-screen flex-col">
        <Header />
        <div className="max-h-fit flex-grow bg-GRAY_CLOUD text-slate-50 ">
          <Component {...pageProps} />
        </div>
        <Player />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
