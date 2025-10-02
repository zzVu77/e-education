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
import { UserModal } from "./UserModal"; // Tương tự CourseInfoModal

// 🔹 Định nghĩa kiểu User
interface User {
  _id: string;
  username: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}
interface UserForm {
  _id?: string;
  username: string;
  fullName: string;
  password?: string;
}
// 🔹 Columns type-safe
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "User ID",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) =>
      new Date(info.getValue() as string).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: (info) =>
      new Date(info.getValue() as string).toLocaleString("en-GB", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <UserModal
          type="update"
          defaultValues={row.original}
          onSubmitUser={(data: UserForm) => console.log("Updated:", data)}
        >
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </UserModal>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
];

// 🔹 Mock data
const mockUsers: User[] = [
  {
    _id: "68d3f5cf46d1da4667f55ac7",
    username: "john_doe",
    fullName: "John Doe",
    createdAt: "2025-09-24T13:44:47.676+00:00",
    updatedAt: "2025-09-24T13:44:47.676+00:00",
  },
  {
    _id: "68d3f5cf46d1da4667f55ac8",
    username: "alice_smith",
    fullName: "Alice Smith",
    createdAt: "2025-09-25T08:30:00.000+00:00",
    updatedAt: "2025-09-25T08:30:00.000+00:00",
  },
];

export default function ManageUsers() {
  const [data] = useState<User[]>(mockUsers);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<User>({
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
          placeholder="Filter by username..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("username")?.setFilterValue(e.target.value)
          }
          className="max-w-sm text-xs"
        />
        <Input
          placeholder="Filter by full name..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("fullName")?.setFilterValue(e.target.value)
          }
          className="max-w-sm text-xs"
        />
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

      {/* 🔹 Add New */}
      <div className="self-end">
        <UserModal
          type="create"
          onSubmitUser={(data: UserForm) => console.log("Created:", data)}
        >
          <Button>Add new user</Button>
        </UserModal>
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
