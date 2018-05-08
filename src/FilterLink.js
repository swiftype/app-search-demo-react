import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

export default function FilterLink({ name, queryState, value, children }) {
  // Because if we're changing our total, we don't want to persist paging in the url
  const { page, ...queryStateWithoutPaging } = queryState;

  return (
    <Link
      to={{
        pathname: "/",
        search:
          "?" +
          queryString.stringify({ ...queryStateWithoutPaging, [name]: value })
      }}
    >
      {children}
    </Link>
  );

  queryString.stringify;
}
