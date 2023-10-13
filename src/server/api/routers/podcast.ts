import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const podcastRouter = createTRPCRouter({
  getPodcast: publicProcedure
    .input(
      z.object({
        category: z.string(),
        languageCode: z.string(),
        limit: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.podcast.findMany({
        where: {
          category: input.category,
          languageCode: input.languageCode,
        },
        take: input.limit,
        orderBy: {
          priority: "desc",
        },
      });
    }),
});
