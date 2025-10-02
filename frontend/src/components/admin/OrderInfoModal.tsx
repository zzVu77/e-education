"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderModalProps {
  children?: React.ReactNode;
  courses: { id: number; title: string }[];
}

export function OrderModal({ children, courses }: OrderModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Courses</DialogTitle>
          <DialogDescription>View all courses in this order.</DialogDescription>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">#</TableHead>
              <TableHead className="text-center">Course Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{course.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DialogFooter className="mt-4">
          <Button variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
