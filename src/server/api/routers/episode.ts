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
        episodeId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.episodeId) return 0;
      const result = await ctx.prisma.playbackPosition.findFirst({
        where: {
          userId: ctx.session.user.id,
          episodeGuid: input.episodeId,
        },
        select: {
          playtime: true,
        },
      });
      return result?.playtime ?? 0;
    }),
});
