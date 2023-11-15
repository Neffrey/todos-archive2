import "server-only"; // Make sure you can't import this on client

import { eq } from "drizzle-orm";
import { z } from "zod";

import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedUserProcedure,
  userProcedure,
} from "~/server/api/trpc";
import { tasks, TASK_TIMEFRAMES } from "~/server/db/schema";

export const taskRouter = createTRPCRouter({
  // getOne: userProcedure
  //   .input(
  //     z.object({
  //       id: z.string().min(1),
  //     }),
  //   )
  //   .query(async ({ ctx }) => {
  //     return await ctx.db.query.tasks.findMany({
  //       where: eq(tasks.user, ctx.session.user.id),
  //     });
  //   }),
  getAll: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.tasks.findMany({
      where: eq(tasks.user, ctx.session.user.id),
      with: { comments: true, taskCompletions: true },
    });
  }),
  create: protectedUserProcedure
    .input(
      z.object({
        title: z.string().min(1),
        timesToComplete: z.number().int().min(1),
        timeframe: z.enum(TASK_TIMEFRAMES),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        title: input.title,
        user: ctx.session.user.id,
        timesToComplete: input.timesToComplete,
        timeframe: input.timeframe,
      });
    }),
  edit: userProcedure
    .input(
      z.object({
        id: z.number().int().min(1),
        title: z.string().min(1),
        timesToComplete: z.number().int().min(1),
        timeframe: z.enum(TASK_TIMEFRAMES),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const dbTask = await ctx.db.query.tasks.findFirst({
        where: eq(tasks.id, input.id),
      });
      if (dbTask?.user !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .update(tasks)
        .set({
          title: input.title,
          user: ctx.session.user.id,
          timesToComplete: input.timesToComplete,
          timeframe: input.timeframe,
        })
        .where(eq(tasks.id, input.id));
    }),
});
