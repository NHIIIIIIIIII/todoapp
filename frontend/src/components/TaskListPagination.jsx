import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// NHẬN PROPS TỪ HOMEPAGE
const TaskListPagination = ({
  page,
  totalPages,
  handleNext,
  handlePrev,
  handlePageChange
}) => {
  // Hàm tạo danh sách số trang
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 0) {
      return [1];
    }

    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(1, 2, 3);
        if (totalPages > 3) {
          pages.push("...", totalPages);
        }
      } else if (page >= totalPages - 1) {
        pages.push(1, "...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-lg font-semibold">
        Nội dung của <span className="text-blue-600">Trang {page}</span>
        {totalPages > 0 && (
          <span className="text-gray-500 text-sm ml-2">
            (Tổng: {totalPages} trang)
          </span>
        )}
      </div>
      
      {/* Thanh phân trang - chỉ hiển thị khi có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {/* Nút Trước */}
            <PaginationItem>
              <PaginationPrevious
                onClick={page === 1 ? undefined : handlePrev}
                className={cn(
                  "cursor-pointer",
                  page === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {/* Số trang */}
            {pagesToShow.map((p, index) => (
              <PaginationItem key={index}>
                {p === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => {
                      if (p !== page) handlePageChange(p);
                    }}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Nút Sau */}
            <PaginationItem>
              <PaginationNext
                onClick={page === totalPages ? undefined : handleNext}
                className={cn(
                  "cursor-pointer",
                  page === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TaskListPagination;