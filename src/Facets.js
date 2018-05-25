import React from "react";
import FilterLink from "./FilterLink";
import RemoveFilterLink from "./RemoveFilterLink";

function Facet({ name, children }) {
  return (
    <div>
      <div class="facets__title">{name}</div>
      <ul class="facets__list">{children}</ul>
    </div>
  );
}

function FacetValue({ facetName, facetValue, queryState }) {
  return (
    <li class="facet">
      <FilterLink
        name={facetName}
        value={facetValue["value"]}
        queryState={queryState}
      >
        {facetValue["value"]}
      </FilterLink>{" "}
      <span class="facet__count">{facetValue["count"]}</span>
    </li>
  );
}

function SelectedFacetValue({ facetName, value, queryState }) {
  return (
    <li class="facet__selected">
      {value}{" "}
      <span class="facet__remove">
        (<RemoveFilterLink name={facetName} queryState={queryState}>
          Remove
        </RemoveFilterLink>)
      </span>
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
    <div class="facets with-counts">
      <div class="facets__control facets__control--license">
        <SingleValueFacetSelection
          displayName="License"
          facetName="license"
          facet={facets.license}
          filter={filters.license}
          queryState={queryState}
        />
      </div>
      <div class="facets__control facets__control--keywords">
        <SingleValueFacetSelection
          displayName="Keywords"
          facetName="keywords"
          facet={facets.keywords}
          filter={filters.keywords}
          queryState={queryState}
        />
      </div>
      <div class="facets__control facets__control--dependencies">
        <SingleValueFacetSelection
          displayName="Dependencies"
          facetName="dependencies"
          facet={facets.dependencies}
          filter={filters.dependencies}
          queryState={queryState}
        />
      </div>
    </div>
  );
}
