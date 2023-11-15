"use client";

// LIBS
import { useRouter } from "next/navigation";

// UTILS
import { api } from "~/trpc/react";

// COMPONENTS
import { Button } from "~/components/ui/button";

// TYPES
import { type Task } from "~/components/tables/tasks/columns";
type Props = {
  task: Task;
};

const CreateCompletionBtn = ({ task }: Props) => {
  const router = useRouter();

  const createCompletion = api.completion.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleCreateCompletion = () => {
    createCompletion.mutate({
      taskId: task.id,
      timeframeCompletion:
        task.taskCompletions.length < task.timesToComplete - 1 ? false : true,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Button onClick={handleCreateCompletion}>Mark Complete</Button>
    </div>
  );
};

export default CreateCompletionBtn;
