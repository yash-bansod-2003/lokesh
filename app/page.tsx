import * as React from "react";

import { MainForm } from "@/components/main-form"
import { db } from "@/lib/db";

import { DataClient } from "@/components/display/client";
import { ResultDisplay } from "@/components/result-display";


export default async function Home() {

  const data = await db.noiceLevel.findMany();

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <MainForm />
        <ResultDisplay data={data} />
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <DataClient data={data} />
      </div>
    </div>
  );
}
