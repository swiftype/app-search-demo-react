import React from "react";
import RCPagination from "rc-pagination";
import "rc-pagination/assets/index.css";

// App search is currently limited to 100 pages, so we need to make sure
// that our pager only shows up to 100 pages.
function limitedTo100Pages(totalResults, pageSize) {
  return Math.min(pageSize * 100, totalResults);
}

export default function Pagination({
  currentPage,
  pageSize,
  totalPages,
  totalResults,
  onPage
}) {
  return (
    <div className="container">
      <RCPagination
        pageSize={pageSize}
        current={currentPage}
        total={limitedTo100Pages(totalResults, pageSize)}
        onChange={onPage}
      />
    </div>
  );
}
