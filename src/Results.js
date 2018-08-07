import React from "react";
import FilterLink from "./FilterLink";

function LineItem({ label, value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <li>
      <strong>{label}</strong>: {children(value)}
    </li>
  );
}

function Lisence({ value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return <div className="result__lisence">{value}</div>;
}

function Description({ value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <p
      className="result__description"
      dangerouslySetInnerHTML={createMarkup(value)}
    />
  );
}

function createMarkup(html) {
  return { __html: html };
}

function getRaw(result, field) {
  return (result.data[field] || {}).raw;
}

function getSnippet(result, field) {
  return (result.data[field] || {}).snippet;
}

export default function Results({ results, queryState, trackClick }) {
  return (
    <ul>
      {results.map(result => (
        <li className="result" key={getRaw(result, "name")}>
          <div className="result__header">
            <a
              className="result__title"
              href={`https://www.npmjs.com/package/${getRaw(result, "name")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => trackClick(getRaw(result, "id"))}
              dangerouslySetInnerHTML={createMarkup(getSnippet(result, "name"))}
            />
            <Lisence value={getRaw(result, "license")} />
          </div>

          <div className="result__body">
            <Description value={getSnippet(result, "description")} />
            <ul className="result__details">
              <LineItem label="Version" value={getRaw(result, "version")}>
                {value => <span className="result__version">{value}</span>}
              </LineItem>
              <LineItem label="Home Page" value={getRaw(result, "homepage")}>
                {value => (
                  <a
                    target="_blank subtle-link"
                    href={getRaw(result, "homepage")}
                  >
                    {value}
                  </a>
                )}
              </LineItem>
              <LineItem
                label="Dependencies"
                value={getRaw(result, "dependencies")}
              >
                {values =>
                  values.map(value => (
                    <span key={value}>
                      <FilterLink
                        name="dependencies"
                        value={value}
                        queryState={queryState}
                      >
                        {value}
                      </FilterLink>
                    </span>
                  ))
                }
              </LineItem>
              <LineItem label="License" value={getRaw(result, "license")}>
                {value => value.join(", ")}
              </LineItem>
              <LineItem label="Keywords" value={getRaw(result, "keywords")}>
                {values =>
                  values.map((value, index) => (
                    <span key={`${value}-${index}`}>
                      <FilterLink
                        name="keywords"
                        value={value}
                        queryState={queryState}
                      >
                        {value}
                      </FilterLink>
                    </span>
                  ))
                }
              </LineItem>
            </ul>
          </div>

          <div className="result__footer">
            <div className="result__owner">
              <LineItem label="Owners" value={getRaw(result, "owners")}>
                {value => value.join(", ")}
              </LineItem>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
