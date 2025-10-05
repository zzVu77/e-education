"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
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
  currPage: number;
};

function getPageRange(currentPage: number, totalPages: number, limit: number) {
  const start = Math.floor((currentPage - 1) / limit) * limit + 1;
  const end = Math.min(start + limit - 1, totalPages);
  return { start, end };
}

const CustomPagination = ({ totalPages, currPage }: Props) => {
  const limit = 5;

  // Calculate initial start and end pages using useMemo for optimization
  const { start: initialStart, end: initialEnd } = useMemo(
    () => getPageRange(currPage || 1, totalPages, limit),
    [currPage, totalPages, limit],
  );

  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const [start, setStartPage] = useState(initialStart);
  const [end, setEndPage] = useState(initialEnd);
  const [currentPage, setCurrentPage] = useState(currPage);

  const isPreviousDisabled = start === 1;
  const isNextDisabled = end >= totalPages;

  const router = useRouter();

  // Synchronize state with props when they change
  useEffect(() => {
    setStartPage(initialStart);
    setEndPage(initialEnd);
  }, [initialStart, initialEnd]);

  // Use useCallback to avoid recreating the function on every render
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      params.set("page", page.toString());
      router.replace(`?${params.toString()}`);
    },
    [params, router],
  );

  const handlePreviousClick = useCallback(() => {
    if (isPreviousDisabled) return;
    const newStart = Math.max(start - limit, 1);
    setStartPage(newStart);

    if (isNextDisabled) {
      setEndPage((prev) => prev - (totalPages % limit || limit));
    } else {
      setEndPage((prev) => Math.max(prev - limit, limit));
    }

    const newPage = newStart;
    handlePageChange(newPage);
  }, [
    isPreviousDisabled,
    isNextDisabled,
    start,
    limit,
    totalPages,
    handlePageChange,
  ]);

  const handleNextClick = useCallback(() => {
    if (isNextDisabled) return;
    const newStart = Math.min(start + limit, totalPages);
    setStartPage(newStart);
    setEndPage(Math.min(end + limit, totalPages));

    const newPage = newStart;
    handlePageChange(newPage);
  }, [isNextDisabled, start, limit, totalPages, end, handlePageChange]);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem
          onClick={(e) => {
            e.preventDefault();
            handlePreviousClick();
          }}
        >
          <PaginationPrevious
            className={cn("hover:bg-green-200/80", {
              "cursor-not-allowed opacity-50 hover:bg-transparent":
                isPreviousDisabled,
            })}
            aria-disabled={isPreviousDisabled}
          />
        </PaginationItem>

        {/* Page Number Links */}
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

        {/* Next Button */}
        <PaginationItem
          onClick={(e) => {
            e.preventDefault();
            handleNextClick();
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
  );
};

export default CustomPagination;
