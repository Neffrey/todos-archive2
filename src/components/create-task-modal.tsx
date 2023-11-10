"use client";

// LIBS
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

// UITLS
import { api } from "~/trpc/react";

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

const TIMES_TO_COMPLETE_MAX = 10;
const TIMEFRAME_VALUES = ["DAY", "WEEK", "FORTNIGHT", "MONTH"] as const;
const timesToCompleteItems = Array.from(
  { length: TIMES_TO_COMPLETE_MAX },
  (_, i) => i + 1,
);
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 3 characters.",
  }),
  timesToComplete: z.string().min(1),
  timeframe: z.enum(TIMEFRAME_VALUES),
});

// COMPONENT
const CreateTaskModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      timesToComplete: "1",
      timeframe: "DAY",
    },
  });

  const createTask = api.task.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("submitted form values", values);
    const validatedValues = {
      title: values.title,
      timesToComplete: parseInt(values.timesToComplete),
      timeframe: values.timeframe,
    };
    createTask.mutate(validatedValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl px-8 py-6 text-xl font-bold">
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
                            // id="timeframe"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {TIMEFRAME_VALUES.map((item) => {
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
              <Button
                className="rounded-xl px-8 py-6 text-xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  form.reset();
                }}
              >
                Reset Form Values
              </Button>
              <Button
                className="rounded-xl px-8 py-6 text-xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("form-values", form.getValues());
                }}
              >
                Log Form Values
              </Button>
              <Button
                className="rounded-xl px-8 py-6 text-xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Close Form
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskModal;
