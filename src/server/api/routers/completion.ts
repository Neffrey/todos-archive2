// LIBS
import "server-only"; // Make sure you can't import this on client
import { z } from "zod";
import { eq } from "drizzle-orm";

// UTILS
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, userProcedure } from "~/server/api/trpc";
import { taskCompletions } from "~/server/db/schema";

export const completionRouter = createTRPCRouter({
  create: userProcedure
    .input(
      z.object({
        taskId: z.number().min(1),
        timeframeCompletion: z.boolean().default(false).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(taskCompletions).values({
        taskId: input.taskId,
        user: ctx.session.user.id,
        timeframeCompletion: input.timeframeCompletion,
      });
    }),
  delete: userProcedure
    .input(
      z.object({
        id: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tc = await ctx.db.query.taskCompletions.findFirst({
        where: eq(taskCompletions.id, input.id),
      });
      if (tc?.user !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .delete(taskCompletions)
        .where(eq(taskCompletions.id, input.id));
    }),
  // getAll: userProcedure.query(async ({ ctx }) => {
  //   return await ctx.db.query.tasks.findMany({
  //     where: eq(tasks.user, ctx.session.user.id),
  //     with: { comments: true, taskCompletions: true },
  //   });
  // }),
  // create: protectedUserProcedure
  //   .input(
  //     z.object({
  //       title: z.string().min(1),
  //       timesToComplete: z.number().int().min(1),
  //       timeframe: z.enum(["DAY", "WEEK", "FORTNIGHT", "MONTH"]),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(tasks).values({
  //       title: input.title,
  //       user: ctx.session.user.id,
  //       timesToComplete: input.timesToComplete,
  //       timeframe: input.timeframe,
  //     });
  //   }),
  // edit: userProcedure
  //   .input(
  //     z.object({
  //       id: z.number().int().min(1),
  //       title: z.string().min(1),
  //       timesToComplete: z.number().int().min(1),
  //       timeframe: z.enum(["DAY", "WEEK", "FORTNIGHT", "MONTH"]),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const dbTask = await ctx.db.query.tasks.findFirst({
  //       where: eq(tasks.id, input.id),
  //     });
  //     if (dbTask?.user !== ctx.session.user.id) {
  //       throw new TRPCError({ code: "UNAUTHORIZED" });
  //     }
  //     return await ctx.db
  //       .update(tasks)
  //       .set({
  //         title: input.title,
  //         user: ctx.session.user.id,
  //         timesToComplete: input.timesToComplete,
  //         timeframe: input.timeframe,
  //       })
  //       .where(eq(tasks.id, input.id));
  //   }),
});
