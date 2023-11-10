import "server-only"; // Make sure you can't import this on client

import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedUserProcedure,
  userProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  get: userProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
    });
  }),
  edit: protectedUserProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, { message: "Name must be at least 3 characters long" })
          .optional(),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set({
          name: input.name ? input.name : undefined,
          image: input.image ? input.image : undefined,
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
  adminEdit: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z
          .string()
          .min(3, { message: "Name must be at least 3 characters long" })
          .optional(),
        image: z.string().url().optional(),
        role: z.enum(["ADMIN", "USER", "RESTRICTED"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(users)
        .set({
          name: input.name ? input.name : undefined,
          image: input.image ? input.image : undefined,
          role: input.role ? input.role : undefined,
        })
        .where(eq(users.id, input.id));
    }),
});
