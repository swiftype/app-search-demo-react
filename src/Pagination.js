import React from "react";
import { ButtonCircle } from "rebass";
import styled from "styled-components";
import RCPagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const Container = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;

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
        current={currentPage}
        total={totalPages}
        onChange={onPage}
      />
    </Container>
  );
}
