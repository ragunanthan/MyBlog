"use client"
import Link from "next/link";
import React from "react";

export const Pagination = ({
  currentPage,
  totalPages
}: {
  currentPage : number,
  totalPages : number
}) => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
    const nextPage = currentPage + 1;

    const pageNumbers = [];
    const offsetNumber = 3;
    for (let i = currentPage - offsetNumber; i <= currentPage + offsetNumber; i++) {
      if (i >= 1 && i <= totalPages) {
        pageNumbers.push(i);
      }
    }

 
  return (
    <div className="flex items-center justify-between p-4 text-sm">
      {/* Previous Link */}
      <Link
        className="  rounded"
        href={`?page=${prevPage}`}
      >
        Previous
      </Link>

      {/* Pagination Numbers */}
      <div className="flex gap-2">
        {pageNumbers.map((pageNumber) => (
          <Link
            key={pageNumber}
            className={`px-3 py-1  rounded ${
              pageNumber === currentPage ? "fw-bold" : "bg-gray-300"
            }`}
            href={`?page=${pageNumber}`} 
          >
            {pageNumber}
          </Link>
        ))}
      </div>

      {/* Next Link */}
      <Link
        className="rounded" href={`?page=${nextPage}`}         
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
