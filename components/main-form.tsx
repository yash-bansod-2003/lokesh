"use client";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner";

const formSchema = z.object({
      level: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
      time: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      })
})

export const MainForm = () => {
      const [isLoading, setIsLoading] = React.useState<boolean>(false);

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  level: "0",
                  time: "1"
            },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
            setIsLoading(true);

            const response = await fetch(`/api/data`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
            });

            setIsLoading(false);

            if (!response?.ok) {
                  return toast.error("Something went wrong.", {
                        description: "Your item was not created. Please try again.",
                  });
            }

            const item = await response.json();

            return toast.success("Your item was created.", {
                  description: "please check your table view for further updates.",
            });
      }

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                              <legend className="-ml-1 px-1 text-sm font-medium">
                                    Add New Entry
                              </legend>
                              <FormField
                                    control={form.control}
                                    name="level"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Level</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Level" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is the noise level at time t.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Time</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Time" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is the time duration of the sample.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <Button disabled={isLoading} type="submit">Submit</Button>
                        </fieldset>
                  </form>
            </Form>
      )
}