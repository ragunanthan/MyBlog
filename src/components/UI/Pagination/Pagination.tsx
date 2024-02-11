"use client"
import { itemsPerPage } from "@/utils/const";
import Link from "next/link";
import React from "react";


const Pagination = ({
  currentPage,
  totalPages
}: {
  currentPage : number,
  totalPages : number
}) => {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
    const nextPage = currentPage + 1;

    const pageNumbers = Array.from({ length: Math.ceil(totalPages/itemsPerPage) }, (_, index) => index + 1);

  if(!pageNumbers?.length) return null;
 
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
