import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 20px;
  font-weight: bold;
`;

export default function Totals({ currentPage, pageSize, totalResults }) {
  const start = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = totalResults <= pageSize ? totalResults : start + pageSize - 1;

  return (
    <Container>
      Showing {start} - {end} of {totalResults}
    </Container>
  );
}
