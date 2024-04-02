"use client";

import * as React from "react";
import { NoiceLevel } from "@prisma/client"
import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useMounted } from "@/hooks/use-mounted";

interface ResultDisplayProps {
      data: NoiceLevel[]
}

function calculateLeq(samples: NoiceLevel[]): number {
      let sum = 0;
      let totalDuration = 0;

      for (const sample of samples) {
            sum += Math.pow(10, sample.level / 10) * sample.time;
            totalDuration += sample.time;
      }

      const average = sum / totalDuration;

      return 10 * Math.log10(average);
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
      const { mounted } = useMounted();
      const result = React.useMemo(() => calculateLeq(data), [data]);

      if (!mounted) {
            return null;
      }
      return (
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
      )
}