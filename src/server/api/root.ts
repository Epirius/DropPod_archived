import { createTRPCRouter } from "~/server/api/trpc";
import { podcastRouter } from "~/server/api/routers/podcast";
import { episodeRouter } from "~/server/api/routers/episode";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  podcast: podcastRouter,
  episode: episodeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
