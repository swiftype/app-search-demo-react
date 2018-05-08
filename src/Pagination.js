import React from "react";
import styled from "styled-components";
import RCPagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Container = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

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
    <Container>
      <RCPagination
        pageSize={pageSize}
        current={currentPage}
        total={limitedTo100Pages(totalResults, pageSize)}
        onChange={onPage}
      />
    </Container>
  );
}
