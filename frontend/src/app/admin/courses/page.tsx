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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
import { ChevronDown, Plus } from "lucide-react";
import {
  CourseFormValues,
  CourseInfoModal,
} from "../../../components/admin/CourseInfoModal";
import {
  CategoryDataResponse,
  CreateCourseResponse,
  CourseApiResponse,
} from "@/types";
import axiosInstance from "@/config/axiosConfig";
import { toast } from "sonner";
import { uploadImageToCloudinary } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
const onSubmitCreateCourse = async (values: CourseFormValues) => {
  try {
    // const imgUrl =
    //   "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
    let imgUrl = "";
    if (values.imgUrl instanceof File) {
      imgUrl = await uploadImageToCloudinary(values.imgUrl, "courses");
    } else if (typeof values.imgUrl === "string") {
      imgUrl = values.imgUrl;
    }
    // Call API createCourse
    const createRes = await axiosInstance.post<CreateCourseResponse>(
      "/courses",
      {
        title: values.title,
        description: values.description,
        price: Number(values.price),
        category: values.category,
        level: values.level,
        instructor: values.instructor,
        duration: Number(values.duration),
        imgUrl,
      },
    );

    console.log("Course created:", createRes.data);
    toast.success(createRes.message);
  } catch (err) {
    console.error("Error creating course:", err);
    toast.error("Failed to create course");
  }
};

export default function ManageCourses() {
  const [data, setData] = useState<CourseApiResponse[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const isMd = useMediaQuery("(min-width: 768px)");
  const onSubmitEditCourse = async (dataForm: CourseFormValues) => {
    try {
      const { id, ...newValues } = dataForm;
      // toast.info(id, dataForm);
      const oldCourse = data.find((c) => c.id === id);
      if (!oldCourse) return toast.error("Course not found");

      const changedFields: Partial<CourseFormValues> = {};

      // ✅ So sánh và ánh xạ giữa image ↔ imgUrl
      (
        Object.keys(newValues) as (keyof Omit<CourseFormValues, "id">)[]
      ).forEach((key) => {
        if (newValues[key] !== oldCourse[key]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (changedFields as any)[key] = newValues[key]!;
        }
      });

      if (Object.keys(changedFields).length === 0) {
        return toast.info("No changes detected");
      }

      let imgUrl = oldCourse.imgUrl;
      console.log("changedFields", changedFields);
      if (changedFields.imgUrl instanceof File) {
        // Upload ảnh thật sự ở đây nếu có
        imgUrl = await uploadImageToCloudinary(changedFields.imgUrl, "courses");
        changedFields.imgUrl = imgUrl;
      }
      console.log("changedFields after image upload", changedFields);

      await axiosInstance.put(`/courses/${id}`, {
        ...changedFields,
        imgUrl: imgUrl,
      });

      setData((prev) =>
        prev.map((course) =>
          course.id === id ? { ...course, ...changedFields, imgUrl } : course,
        ),
      );

      toast.success("Course changed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    }
  };
  const onDeleteCourse = async (id: string) => {
    try {
      await axiosInstance.delete(`/courses/${id}`);
      setData((prev) => prev.filter((course) => course.id !== id));
      toast.success("Deleted course successfully");
    } catch (err) {
      console.error("Error deleting course:", err);
      toast.error("Failed to delete course");
    }
  };
  useEffect(() => {
    axiosInstance
      .get<CourseApiResponse[]>("/courses")
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    axiosInstance
      .get<CategoryDataResponse>("/courses/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);
  const columns: ColumnDef<CourseApiResponse>[] = [
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
            categories={categories} // <- thêm prop categories
            defaultValues={{
              ...row.original,
              imgUrl: row.original.imgUrl,
            }}
            onSubmitCourse={onSubmitEditCourse}
          >
            <Button
              size="sm"
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Edit
            </Button>
          </CourseInfoModal>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this course?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The course will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDeleteCourse(row.original.id)}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  const table = useReactTable<CourseApiResponse>({
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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  // if (!mounted) return null;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col gap-4 p-2 py-4">
      <div className="flex flex-row justify-between items-center ">
        {/* Filter + Toggle Columns */}
        <div className="flex flex-row items-start justify-start gap-2">
          <Input
            placeholder="Filter by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
            className="max-w-sm text-xs border-green-500 text-green-500 hover:bg-green-50 px-2"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-xs border-green-500 text-green-500 hover:bg-green-50"
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
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
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
            categories={categories} // <- thêm prop categories
            onSubmitCourse={onSubmitCreateCourse}
          >
            <Button className="bg-green-500 text-white hover:bg-green-600">
              <Plus />
              {isMd ? "Create" : ""}
            </Button>
          </CourseInfoModal>
        </div>
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
