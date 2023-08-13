import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const episodeRouter = createTRPCRouter({
  setPlaybackPosition: protectedProcedure
    .input(
      z.object({
        episodeId: z.string(),
        playtime: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.playbackPosition.upsert({
        where: {
          userId_episodeGuid: {
            userId: ctx.session.user.id,
            episodeGuid: input.episodeId,
          },
        },
        update: {
          playtime: input.playtime,
        },
        create: {
          userId: ctx.session.user.id,
          episodeGuid: input.episodeId,
          playtime: input.playtime,
        },
      });
    }),

  getPlaybackPosition: protectedProcedure
    .input(
      z.object({
        episodeId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.playbackPosition.findUnique({
        where: {
          userId_episodeGuid: {
            userId: ctx.session.user.id,
            episodeGuid: input.episodeId,
          },
        },
        select: {
          playtime: true,
        },
      });
    }),
});
