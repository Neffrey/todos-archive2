"use client";

// LIBRARIES
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// COMPONENTS
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";

// SCHEMA
const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(160, { message: "Message must be less than 160 characters." }),
  age: z.enum(["na", "minor", "adult", "old"], {
    required_error: "You need to select a specified age group.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You need to accept the terms and conditions.",
  }),
});

const Forms = () => {
  const { toast } = useToast();

  // Form
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      message: "",
      age: "na",
      terms: false,
    },
  });

  // Submit handler
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast({
      title: "Form Values",
      description: JSON.stringify(values, null, 2),
    });
  };

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() =>
            onSubmit(form.getValues() as z.infer<typeof FormSchema>),
          )}
          className="space-y-8 rounded-lg p-8"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Patrick" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What do you wanna talk about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <h2 className="text-lg">Age</h2>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="na" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Not Applicable
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="minor" />
                      </FormControl>
                      <FormLabel className="font-normal">Minor</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="adult" />
                      </FormControl>
                      <FormLabel className="font-normal">Adult</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="old" />
                      </FormControl>
                      <FormLabel className="font-normal">Old</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-center justify-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Terms</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};
export default Forms;
