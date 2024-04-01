import { MainForm } from "@/components/main-form"
import { Payment, columns } from "@/components/display/columns"
import { DataTable } from "@/components/display/data-table"
import { db } from "@/lib/db";
import { Data } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

function calculateLeq(samples: Data[]): number {
  let sum = 0;
  let totalDuration = 0;

  for (const sample of samples) {
    sum += Math.pow(10, sample.level / 10) * sample.time;
    totalDuration += sample.time;
  }

  const average = sum / totalDuration;

  return 10 * Math.log10(average);
}


export default async function Home() {
  // const data = await getData();

  const data = await db.data.findMany();
  const result = calculateLeq(data);

  return (
    <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="relative hidden flex-col items-start gap-8 md:flex">
        <MainForm />
        <Card>
          <CardHeader>
            <CardTitle>Leq</CardTitle>
            <CardDescription>
              (Equivalent Continuous Sound Pressure Level.)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <Input value={result} disabled placeholder="Store Name" />
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <DataTable columns={columns} data={data as unknown as Payment[]} />
      </div>
    </div>
  );
}
