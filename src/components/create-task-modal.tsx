"use client";

// LIBS
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";

// UITLS
import { api } from "~/trpc/react";
import { TASK_TIMEFRAMES } from "~/server/db/schema";

// COMPONENTS
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/use-toast";
import { FaCheck } from "react-icons/fa";

const TIMES_TO_COMPLETE_MAX = 10;
const timesToCompleteItems = Array.from(
  { length: TIMES_TO_COMPLETE_MAX },
  (_, i) => i + 1,
);
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 3 characters.",
  }),
  timesToComplete: z.string().min(1),
  timeframe: z.enum(TASK_TIMEFRAMES),
});

// FALLBACK - LOGIN BTN
export const LoginBtn = () => {
  return (
    <Button className="px-10 py-6 text-xl" onClick={() => signIn("google")}>
      Login
    </Button>
  );
};

// COMPONENT
const CreateTaskModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timesToComplete: "1",
      timeframe: TASK_TIMEFRAMES[0],
    },
  });

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const validatedValues = {
      title: values.title,
      timesToComplete: parseInt(values.timesToComplete),
      timeframe: values.timeframe,
    };
    createTask.mutate(validatedValues);
    setOpen(false);
    toast({
      action: (
        <div className="flex h-full w-full items-center justify-between">
          <FaCheck className="text-2xl" />
          {`Task "${validatedValues.title}" created successfully!`}
        </div>
      ),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl px-8 py-6 text-lg font-bold lg:text-xl">
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Create Task</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 p-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title" className="text-md">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="Task Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-1/2 justify-center">
                  <FormField
                    control={form.control}
                    name="timesToComplete"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-md"># of times</FormLabel>
                        <Select
                          name="timesToComplete"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select # of times" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timesToCompleteItems.map((item) => (
                              <SelectItem
                                key={`timesToComplete-${item}`}
                                id={`timesToComplete-${item}`}
                                value={item.toString()}
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-1/2 justify-center">
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <h2 className="text-md">Per Timeframe</h2>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {TASK_TIMEFRAMES.map((item) => {
                              return (
                                <FormItem
                                  key={`timeframe-${item.toLowerCase()}`}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      id={`timeframe-${item.toLowerCase()}`}
                                      value={item}
                                    />
                                  </FormControl>
                                  <FormLabel
                                    htmlFor={`timeframe-${item.toLowerCase()}`}
                                    className="font-normal capitalize"
                                  >
                                    {item.toLowerCase()}
                                  </FormLabel>
                                </FormItem>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="rounded-xl px-8 py-6 text-xl font-bold"
              >
                Create Task
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
