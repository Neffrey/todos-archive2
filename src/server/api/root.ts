import "server-only"; // Make sure you can't import this on client

import { createTRPCRouter } from "~/server/api/trpc";
import { taskRouter } from "~/server/api/routers/task";
import { userRouter } from "~/server/api/routers/user";
import { completionRouter } from "~/server/api/routers/completion";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  completion: completionRouter,
  task: taskRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
