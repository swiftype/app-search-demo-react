import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { omit } from "lodash";

export default function FilterLink({ name, queryState, value, children }) {
  // Because if we're changing our total, we don't want to persist paging in the url
  const newQueryState = omit(queryState, ["page", name]);

  return (
    <Link
      to={{
        pathname: "/",
        search: "?" + queryString.stringify({ ...newQueryState, [name]: value })
      }}
      className="facet__link"
    >
      {children}
    </Link>
  );
}
