"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { FormulationItem } from "@/types/formulation";

interface Props {
  data: FormulationItem[];
}

export default function FormulationTable({ data }: Props) {
  const columns: ColumnDef<FormulationItem>[] = [
    {
      header: "Drug / API",
      accessorFn: row => row.formulation.drug,
    },
    {
      header: "Strength",
      accessorFn: row => row.formulation.strength?.join(", ") || "-",
    },
    {
      header: "Dosage Form",
      accessorKey: "type",
    },
    {
      header: "Route",
      accessorFn: row => row.formulation.route,
    },
    {
      header: "Therapeutic Class",
      accessorKey: "therapeutic_class",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-lg max-h-[70vh]">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 sticky top-0 z-10">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="border px-3 py-3 text-left font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={table.getVisibleFlatColumns().length}
                className="text-center py-10 text-gray-500"
              >
                No formulations match your filters.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`hover:bg-blue-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border px-3 py-2">
                    {flexRender(
                      cell.column.columnDef.cell ??
                      cell.column.columnDef.accessorFn,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
