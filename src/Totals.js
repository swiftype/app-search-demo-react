import React from "react";

export default function Totals({ currentPage, pageSize, totalResults }) {
  const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = totalResults <= pageSize ? totalResults : start + pageSize - 1;

  return (
    <div>
      Showing {start} - {end} of {totalResults}
    </div>
  );
}
