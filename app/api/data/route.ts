import * as z from "zod";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

const formSchema = z.object({
      name : z.string().min(1),
      value: z.string().min(1),
});

export async function POST(req: Request) {
      try {

            // Get the request body and validate it.
            const body = await req.json();
            const payload = formSchema.parse(body);

            const dbStore = await db.noiceLevel.create({
                  data : {
                        name : payload.name,
                        value : Number(payload.value)
                  }
            })
            return NextResponse.json(dbStore, { status: 201 });
      } catch (error) {
            if (error instanceof z.ZodError) {
                  return new NextResponse(JSON.stringify(error.issues), {
                        status: 422,
                  });
            }

            return new NextResponse(null, { status: 500 });
      }
}

export async function GET(req: Request) {
      try {
            const data = await db.noiceLevel.findMany();
            return NextResponse.json(data, { status: 200 });
      } catch (error) {
            return new NextResponse(null, { status: 500 });
      }
}