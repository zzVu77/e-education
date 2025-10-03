"use client";

import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { CourseInfoModal } from "../../../components/admin/CourseInfoModal";
import { ProductCardProps, CoursesDataResponse } from "@/types";
import axiosInstance from "@/config/axiosConfig";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   level: string;
//   instructor: string;
// }

const columns: ColumnDef<ProductCardProps>[] = [
  {
    accessorKey: "title",
    header: "Course Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info) => (
      <span className="max-w-[250px] truncate inline-block">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <CourseInfoModal
          type="update"
          defaultValues={row.original}
          onSubmitCourse={(data) => console.log("Updated:", data)}
        >
          <Button
            size="sm"
            className="bg-green-500 text-white hover:bg-green-600"
          >
            Edit
          </Button>
        </CourseInfoModal>
        <Button size="sm" className="bg-red-500 text-white hover:bg-red-600">
          Delete
        </Button>
      </div>
    ),
  },
];

// const mockData: Course[] = [
//   {
//     id: "1",
//     title: "React Native Fundamentals",
//     description:
//       "This beginner course on React Native offers a thorough introduction…",
//     price: 90.9,
//     category: "Programming",
//     level: "Beginner",
//     instructor: "John Doe",
//   },
//   {
//     id: "2",
//     title: "Node.js API Development",
//     description: "Build REST APIs with Express and MongoDB.",
//     price: 59,
//     category: "Backend",
//     level: "Intermediate",
//     instructor: "Jane Smith",
//   },
//   {
//     id: "3",
//     title: "MongoDB Mastery",
//     description: "Learn MongoDB from scratch and advanced queries.",
//     price: 39,
//     category: "Database",
//     level: "Beginner",
//     instructor: "Alex Johnson",
//   },
// ];

export default function ManageCourses() {
  const [data, setData] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true); // đánh dấu đã mount
  // }, []);
  useEffect(() => {
    axiosInstance
      .get<CoursesDataResponse>("/courses")
      .then((res) => setData(res.data)) // nhớ res.data.data
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const table = useReactTable<ProductCardProps>({
    data: data || [], // data mặc định []
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
  // if (!mounted) return null;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col gap-4 p-2">
      {/* Filter + Toggle Columns */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter by title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm text-xs"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto text-xs border-green-500 text-green-500 hover:bg-green-50"
            >
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

      {/* Add New */}
      <div className="self-end">
        <CourseInfoModal
          type="create"
          onSubmitCourse={(data) => console.log("Created:", data)}
        >
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Add new course
          </Button>
        </CourseInfoModal>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center font-semibold"
                  >
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
                <TableRow key={row.id} className="hover:bg-green-50">
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

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 text-green-500 hover:bg-green-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 text-green-500 hover:bg-green-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
