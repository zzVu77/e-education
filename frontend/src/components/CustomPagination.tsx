"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

const CustomPagination = ({ totalPages }: Props) => {
  const limit = 5;
  const [start, setStartPage] = useState(1);
  const [end, setEndPage] = useState(limit);
  const [currentPage, setCurrentPage] = useState(1);
  const isPreviousDisabled = start === 1;
  const isNextDisabled = end >= totalPages;
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  useEffect(() => {
    setStartPage(1);
    setEndPage(Math.min(limit, totalPages));
    setCurrentPage(1);
  }, [totalPages]);
  const handlePreviousClick = () => {
    if (!isPreviousDisabled) {
      setStartPage((prev) => Math.max(prev - limit, 1));
      if (isNextDisabled) {
        setEndPage((prev) => prev - (totalPages % limit || limit));
      } else {
        setEndPage((prev) => Math.max(prev - limit, limit));
      }
    }
    const newPage = Math.max(start - limit, 1);
    handlePageChange(newPage);
  };
  const handleNextClick = () => {
    if (!isNextDisabled) {
      setStartPage((prev) => Math.min(prev + limit, totalPages));
      setEndPage((prev) => Math.min(prev + limit, totalPages));
      const newPage = Math.min(start + limit, totalPages);
      handlePageChange(newPage);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  };
  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              if (!isPreviousDisabled) {
                handlePreviousClick();
              }
            }}
          >
            <PaginationPrevious
              className={cn("hover:bg-green-200/80", {
                "cursor-not-allowed opacity-50 hover:bg-transparent":
                  isPreviousDisabled,
              })}
              href="#pagination"
              aria-disabled={isPreviousDisabled}
            />
          </PaginationItem>

          {Array.from(
            { length: end - start + 1 },
            (_, index) => index + start,
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  { "hover:bg-green-200/80": currentPage !== page },
                  {
                    "bg-green-500/80 border-1 border-solid border-black hover:bg-green-500/80 ":
                      currentPage === page,
                  },
                )}
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            onClick={(e) => {
              e.preventDefault();
              if (!isNextDisabled) {
                handleNextClick();
              }
            }}
          >
            <PaginationNext
              className={cn("hover:bg-green-200/80", {
                "cursor-not-allowed opacity-50 hover:bg-transparent":
                  isNextDisabled,
              })}
              href="#"
              aria-disabled={isNextDisabled}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default CustomPagination;
