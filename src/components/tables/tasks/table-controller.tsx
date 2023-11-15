// LIBS

// UTILS
import { isWithin } from "~/lib/time-compare";

// COMPONENTS
import { api } from "~/trpc/server";
import { columns, type Task } from "./columns";
import { DataTable } from "./data-table";

// HELPERS
const getData = async (): Promise<Task[]> => {
  return await api.task.getAll.query();
};

// COMP
const TasksTableController = async () => {
  const data = await getData();
  const now = new Date();

  const currentData = data.map((task) => {
    return {
      id: task.id,
      title: task.title,
      timesToComplete: task.timesToComplete,
      timeframe: task.timeframe,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      comments: task.comments,
      taskCompletions: task.taskCompletions
        .slice(-task.timesToComplete)
        .filter((completion) =>
          isWithin({
            timeframe: task.timeframe,
            oldDate: completion.createdAt,
            newDate: now,
          }),
        ),
    };
  });

  return (
    <div className="flex w-full flex-col items-center p-20">
      <h2 className="pb-4 text-3xl uppercase tracking-wider">Task Table</h2>

      <DataTable columns={columns} data={currentData} />
    </div>
  );
};
export default TasksTableController;
