import React from "react";
import FilterLink from "./FilterLink";
import RemoveFilterLink from "./RemoveFilterLink";

function Facet({ name, children }) {
  return (
    <div>
      <em>{name}</em>
      <ul>{children}</ul>
    </div>
  );
}

function FacetValue({ facetName, facetValue, queryState }) {
  return (
    <li>
      <FilterLink name={facetName} value={facetValue["value"]} queryState={queryState}>
        {facetValue["value"]}
      </FilterLink>{" "}
      ({facetValue["count"]})
    </li>
  );
}

function SelectedFacetValue({ facetName, value, queryState }) {
  return (
    <li>
      {value} (<RemoveFilterLink name={facetName} queryState={queryState}>
        Remove
      </RemoveFilterLink>)
    </li>
  );
}

function SingleValueFacetSelection({
  displayName,
  facetName,
  facet,
  filter,
  queryState
}) {
  if (!facet || facet[0].data.length === 0) return null;

  return (
    <Facet name={displayName}>
      {!!filter && (
        <SelectedFacetValue
          facetName={facetName}
          value={filter}
          queryState={queryState}
        />
      )}
      {!filter &&
        facet[0].data.map((facetValue, index) => (
          <FacetValue
            facetName={facetName}
            facetValue={facetValue}
            key={`${facetValue["name"]}-${index}`}
            queryState={queryState}
          />
        ))}
    </Facet>
  );
}

export default function Facets({ facets, filters, queryState }) {
  return (
    <div>
      <SingleValueFacetSelection
        displayName="License"
        facetName="license"
        facet={facets.license}
        filter={filters.license}
        queryState={queryState}
      />
      <SingleValueFacetSelection
        displayName="Keywords"
        facetName="keywords"
        facet={facets.keywords}
        filter={filters.keywords}
        queryState={queryState}
      />
      <SingleValueFacetSelection
        displayName="Dependencies"
        facetName="dependencies"
        facet={facets.dependencies}
        filter={filters.dependencies}
        queryState={queryState}
      />
    </div>
  );
}
