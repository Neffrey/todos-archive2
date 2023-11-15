"use client";

// LIBS
import { type ColumnDef } from "@tanstack/react-table";

// UTILS
import { type TaskTimeframe } from "~/server/db/schema";

// COMPONENTS
import CreateCompletionBtn from "~/components/tables/tasks/create-completion-btn";
import TCsPerTimeframe from "./tcs-per-timeframe";

// TYPES
export type Task = {
  id: number;
  title: string;
  timesToComplete: number;
  timeframe: TaskTimeframe;
  createdAt: Date;
  updatedAt: Date;
  comments: TaskComment[];
  taskCompletions: TaskCompletion[];
};

export type TaskComment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  taskId: number;
  content: string;
};

export type TaskCompletion = {
  id: number;
  user: string;
  taskId: number;
  timeframeCompletion: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// COLUMNS
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    header: "#",
    cell: ({ row }) => {
      return <TCsPerTimeframe task={row.original} />;
    },
  },
  {
    header: "per",
    // cell: () => {
    //   return <span className="text-sm">Per</span>;
    // },
  },
  {
    accessorKey: "timeframe",
    header: "Timeframe",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <span className="min-w-full text-center">
            {row.original.timeframe.toLowerCase()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Complete",
    cell: ({ row }) => {
      return <CreateCompletionBtn task={row.original} />;
    },
  },
];
