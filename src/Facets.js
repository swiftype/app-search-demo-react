import React from "react";
import FilterLink from "./FilterLink";

function Facet({ name, children }) {
  return (
    <div>
      <em>{name}</em>
      <ul>{children}</ul>
    </div>
  );
}

function FacetValue({ facetName, facetValue: [value, count], queryState }) {
  return (
    <li>
      <FilterLink name={facetName} value={value} queryState={queryState}>
        {value}
      </FilterLink>{" "}
      ({count})
    </li>
  );
}

export default function Facets({ facets, queryState }) {
  return (
    <div>
      <Facet name="License">
        {facets.license &&
          facets.license[0].data.map(facetValue => (
            <FacetValue
              facetName="license"
              facetValue={facetValue}
              key={facetValue[0]}
              queryState={queryState}
            />
          ))}
      </Facet>
    </div>
  );
}
