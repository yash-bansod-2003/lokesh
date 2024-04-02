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
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";

const formSchema = z.object({
      l10 : z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
      l50: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
      l90: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
      lmax: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
      lmin: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string"
      }),
})

export const MainForm = () => {
      const router = useRouter();
      const { mounted } = useMounted();
      const [isLoading, setIsLoading] = React.useState<boolean>(false);


      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                 l10 : "0",
                 l50 : "0",
                 l90 : "0",
                 lmax : "0",
                 lmin : "0"
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
                        description: "Your noicd level was not created. Please try again.",
                  });
            }

            const item = await response.json();

            form.reset();

            router.refresh();

            return toast.success("Your noice level was created.", {
                  description: "please check your table view for further updates.",
            });
      }

      if (!mounted) {
            return null;
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
                                    name="l10"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>L10</FormLabel>
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
                                    name="l50"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>L50</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Time" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is a value of L50.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                                <FormField
                                    control={form.control}
                                    name="l90"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>L90</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Time" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is a value of L90.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                                <FormField
                                    control={form.control}
                                    name="l50"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>LMAX</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Time" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is a value of LMAX.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                                <FormField
                                    control={form.control}
                                    name="l50"
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>LMIN</FormLabel>
                                                <FormControl>
                                                      <Input placeholder="Time" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                      This is a value of LMIN.
                                                </FormDescription>
                                                <FormMessage />
                                          </FormItem>
                                    )}
                              />
                              <Button disabled={isLoading} type="submit">Compute</Button>
                        </fieldset>
                  </form>
            </Form>
      )
}