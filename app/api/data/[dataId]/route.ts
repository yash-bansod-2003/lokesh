import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const routeContextSchema = z.object({
      params: z.object({
            dataId: z.string(),
      }),
});


export async function DELETE(
      req: Request,
      context: z.infer<typeof routeContextSchema>,
) {
      try {
            const { params } = routeContextSchema.parse(context);

            await db.noiceLevel.delete({
                  where: {
                        id: params.dataId,
                  }
            });

            return new NextResponse(null, { status: 200 });
      } catch (error) {
            return new NextResponse(null, { status: 500 });
      }
}