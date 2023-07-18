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
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>
        <Player />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
