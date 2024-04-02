"use client";
import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SoundLevels,
  calculateLNP,
  calculateLeq,
  calculateNC,
  calculateTNI,
} from "@/lib/utils";

const formSchema = z.object({
  l10: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  l50: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  l90: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  lmax: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  lmin: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

export const Client = () => {
  const router = useRouter();
  const { mounted } = useMounted();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [leq, setLeq] = React.useState<number>(0);
  const [lnp, setLnp] = React.useState<number>(0);
  const [tni, setTni] = React.useState<number>(0);
  const [nc, setNc] = React.useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      l10: "0",
      l50: "0",
      l90: "0",
      lmax: "0",
      lmin: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const soundLevels: SoundLevels = {
      l10: Number(values.l10),
      l50: Number(values.l50),
      l90: Number(values.l90),
      lmax: Number(values.lmax),
      lmin: Number(values.lmin),
    };

    let leq = calculateLeq(soundLevels);
    setLeq(leq);
    setLnp(calculateLNP(leq , soundLevels))
    setTni(calculateTNI(soundLevels))
    setNc(calculateNC(soundLevels));
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-2">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-start gap-6"
          >
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
                    <FormDescription>This is a value of L50.</FormDescription>
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
                    <FormDescription>This is a value of L90.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lmax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LMAX</FormLabel>
                    <FormControl>
                      <Input placeholder="Time" {...field} />
                    </FormControl>
                    <FormDescription>This is a value of LMAX.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LMIN</FormLabel>
                    <FormControl>
                      <Input placeholder="Time" {...field} />
                    </FormControl>
                    <FormDescription>This is a value of LMIN.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                Compute
              </Button>
            </fieldset>
          </form>
        </Form>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Leq</CardTitle>
            <CardDescription>(Equivalent Sound Energy Level.)</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input value={leq} disabled placeholder="Store Name" />
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>LNP</CardTitle>
            <CardDescription>(Noise pollution level .)</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input value={lnp} disabled placeholder="Store Name" />
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>TNI</CardTitle>
            <CardDescription>(Traffic Noise Index .)</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input value={tni} disabled placeholder="Store Name" />
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NC</CardTitle>
            <CardDescription>(Noise Climate.)</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input value={nc} disabled placeholder="Store Name" />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
