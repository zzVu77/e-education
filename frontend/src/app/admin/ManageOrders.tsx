"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown } from "lucide-react";
import { OrderModal } from "./OrderInfoModal";

// 🔹 Định nghĩa kiểu dữ liệu Order
interface Order {
  _id: string;
  userName: string;
  courses: { id: number; title: string }[];
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
}

// 🔹 Columns type-safe cho Order
const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "userName",
    header: "User",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "courses",
    header: "Courses",
    cell: (info) => {
      // Cast value từ unknown sang array đúng type
      const courses = info.getValue() as { id: number; title: string }[];
      if (!courses || courses.length === 0) return "No courses";

      const displayCourses: string[] = courses.slice(0, 2).map((c) => c.title);
      const extraCount = courses.length > 2 ? courses.length - 2 : 0;

      return (
        <div className="flex flex-col items-center text-xs gap-1">
          {displayCourses.map((title: string, i: number) => (
            <span key={i}>{title}</span>
          ))}
          {extraCount > 0 && (
            <OrderModal courses={courses}>
              <Button size="sm" variant="outline">
                +{extraCount} more
              </Button>
            </OrderModal>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: (info) => {
      const value = info.getValue() as number; // ép kiểu sang number
      return `$${value.toFixed(2)}`;
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "paymentMethod",
    header: "Method",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => {
      const value = info.getValue() as string; // ép kiểu sang string
      return new Date(value).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
  },
];

// 🔹 Mock data
const mockOrders: Order[] = [
  {
    _id: "68d4074c61dbbcf56a047b61",
    userName: "John Doe",
    courses: [
      { id: 1, title: "Node.js API Development" },
      { id: 2, title: "Next.js Mastery" },
      { id: 3, title: "React.js Basics" },
    ],
    totalAmount: 23.78,
    paymentStatus: "Pending",
    paymentMethod: "Paypal",
    createdAt: "2025-07-25T16:01:00.000+00:00",
  },
  {
    _id: "68d4074c61dbbcf56a047b62",
    userName: "Alice Smith",
    courses: [
      { id: 1, title: "Node.js API Development" },
      { id: 2, title: "Next.js Mastery" },
    ],
    totalAmount: 59,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    createdAt: "2025-08-01T10:15:00.000+00:00",
  },
];

export default function ManageOrders() {
  const [data] = useState<Order[]>(mockOrders);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<Order>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      {/* 🔹 Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Input
          placeholder="Filter by Order ID..."
          value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("_id")?.setFilterValue(e.target.value)
          }
          className="max-w-sm text-xs"
        />

        <select
          className="border rounded p-1 text-xs"
          value={
            (table.getColumn("paymentStatus")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table
              .getColumn("paymentStatus")
              ?.setFilterValue(e.target.value || undefined)
          }
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          className="border rounded p-1 text-xs"
          value={
            (table.getColumn("paymentMethod")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table
              .getColumn("paymentMethod")
              ?.setFilterValue(e.target.value || undefined)
          }
        >
          <option value="">All Methods</option>
          <option value="Paypal">Paypal</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-xs">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🔹 Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔹 Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
