import { Client } from "@/components/client";
import * as React from "react";

export default async function Home() {
  return <div className="h-screen w-screen space-y-10">
    <div>
      <h1 className="text-5xl my-5 text-center font-bold underline">Noice Parameter Calculator</h1>
    </div>
    <Client />
  </div>
}
