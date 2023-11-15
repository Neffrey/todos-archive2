// LIBS
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// UTILS
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { type UserRole, mysqlTable, users } from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      role?: UserRole | null;
    } & DefaultSession["user"];
  }

  export interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: UserRole | null;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: session.user.role
          ? session.user.role
          : await db.query.users
              .findFirst({ where: eq(users.id, user.id) })
              .then((user) => user?.role),
      },
    }),
  },

  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID ? env.GOOGLE_ID : "",
      clientSecret: env.GOOGLE_SECRET ? env.GOOGLE_SECRET : "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
