// import "server-only"; // Make sure you can't import this on client

import { type AdapterAccount } from "next-auth/adapters";
import { relations, sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `todos_14_${name}`);

export const USER_ROLES = ["ADMIN", "USER", "RESTRICTED"] as const;
export type UserRole = (typeof users.role.enumValues)[number];

export const TASK_TIMEFRAMES = ["DAY", "WEEK", "FORTNIGHT", "MONTH"] as const;
export type TaskTimeframe = (typeof tasks.timeframe.enumValues)[number];

// User & Auth tables
export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: mysqlEnum("role", USER_ROLES).default(USER_ROLES[1]),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  tasks: many(tasks),
  comments: many(comments),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const tasks = mysqlTable(
  "task",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    title: varchar("title", { length: 256 }).notNull(),
    user: varchar("user", { length: 255 }).notNull(),
    timesToComplete: int("timesToComplete").default(1).notNull(),
    timeframe: mysqlEnum("timeframe", TASK_TIMEFRAMES)
      .default(TASK_TIMEFRAMES[0])
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (task) => ({
    createdByIdIdx: index("createdById_idx").on(task.user),
    nameIndex: index("name_idx").on(task.title),
  }),
);

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  user: one(users, { fields: [tasks.user], references: [users.id] }),
  taskCompletions: many(taskCompletions),
  comments: many(comments),
}));

export const taskCompletions = mysqlTable(
  "taskCompletion",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    taskId: bigint("taskId", { mode: "number" }).notNull(),
    user: varchar("user", { length: 255 }).notNull(),
    timeframeCompletion: boolean("timeframeCompletion")
      .default(false)
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (taskCompletion) => ({
    tcompIdIdx: index("tcompId_idx").on(taskCompletion.id),
  }),
);

export const tcRelations = relations(taskCompletions, ({ one }) => ({
  task: one(tasks, {
    fields: [taskCompletions.taskId],
    references: [tasks.id],
  }),
  users: one(users, {
    fields: [taskCompletions.taskId],
    references: [users.id],
  }),
}));

export const comments = mysqlTable(
  "comment",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    taskId: bigint("taskId", { mode: "number" }).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (comment) => ({
    taskIdIdx: index("taskId_idx").on(comment.taskId),
  }),
);

export const commentsRelations = relations(comments, ({ one }) => ({
  task: one(tasks, { fields: [comments.taskId], references: [tasks.id] }),
  users: one(users, { fields: [comments.taskId], references: [users.id] }),
}));
