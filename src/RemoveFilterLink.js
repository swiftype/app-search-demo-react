import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { omit } from "lodash";

export default function RemoveFilterLink({ name, queryState, children }) {
  // Because if we're changing our total, we don't want to persist paging in the url
  // We also want to remove the selected value
  const newQueryState = omit(queryState, ["page", name]);

  return (
    <Link
      to={{
        pathname: "/",
        search: "?" + queryString.stringify({ ...newQueryState })
      }}
    >
      {children}
    </Link>
  );
}
