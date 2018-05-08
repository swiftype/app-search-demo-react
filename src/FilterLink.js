import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";

export default function FilterLink({ name, queryState, value, children }) {
  return (
    <Link
      to={{
        pathname: "/",
        search: "?" + queryString.stringify({ ...queryState, name: value })
      }}
    >
      {children}
    </Link>
  );

  queryString.stringify;
}
