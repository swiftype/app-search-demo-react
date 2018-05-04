import React from "react";
import { ButtonCircle } from "rebass";
import styled from "styled-components";

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
      <ButtonCircle
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </ButtonCircle>
      <ButtonCircle
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </ButtonCircle>
    </Container>
  );
}
