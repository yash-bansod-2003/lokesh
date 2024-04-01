"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ItemDeleteButton } from "./remove-button"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
      id: string
      name: string
      value: string
}



export const columns: ColumnDef<Payment>[] = [
      {
            accessorKey: "name",
            header: "Name",
      },
      {
            accessorKey: "value",
            header: "Value",
      },
      {
            id: "actions",
            cell: ({ row }) => {
                  const payment = row.original

                  return (
                        <ItemDeleteButton dataId={payment.id} />
                  )
            },
      },

]
