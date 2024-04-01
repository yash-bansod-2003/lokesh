"use client";

import { NoiceLevel } from "@prisma/client"
import { DataTable } from "./data-table"
import { Payment } from "./columns"
import { useMounted } from "@/hooks/use-mounted";
import { columns } from "@/components/display/columns"
interface DataClientProps {
      data: NoiceLevel[]
}

export const DataClient: React.FC<DataClientProps> = ({ data }) => {
      const { mounted } = useMounted();

      if (!mounted) {
            return null;
      }

      return (
            <DataTable columns={columns} data={data as unknown as Payment[]} />
      )
}