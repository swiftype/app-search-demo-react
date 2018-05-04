import React from "react";
import styled from "styled-components";
import { Panel, Box, Link } from "rebass";

const LinkContainer = styled.span``;

const Result = Panel.extend`
  em {
    font-weight: bold;
  }

  ${LinkContainer} + ${LinkContainer} {
    &:before {
      content: ', '
    }
  }
`;

const StyledResults = styled.div`
  ${Result} + ${Result} {
    margin-top: 20px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLink = Link.extend`
  color: white;
  text-decoration: none;
`;

function LineItem({ label, value, children }) {
  if (!value) return null;
  if (Array.isArray(value) && !value.length) return null;
  return (
    <li>
      {label}: {children(value)}
    </li>
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

export default function Results({ results }) {
  return (
    <StyledResults>
      {results.map(result => (
        <Result key={getRaw(result, "name")}>
          <Panel.Header color="white" bg="#7F7F7F">
            <StyledLink
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.npmjs.com/package/${getRaw(result, "name")}`}
              dangerouslySetInnerHTML={createMarkup(getSnippet(result, "name"))}
            />
          </Panel.Header>
          <Box p={3}>
            <List>
              <LineItem
                label="Description"
                value={getSnippet(result, "description")}
              >
                {value => (
                  <span dangerouslySetInnerHTML={createMarkup(value)} />
                )}
              </LineItem>
              <LineItem label="Version" value={getRaw(result, "version")}>
                {value => value}
              </LineItem>
              <LineItem label="Home Page" value={getRaw(result, "homepage")}>
                {value => (
                  <a target="_blank" href={getRaw(result, "homepage")}>
                    {value}
                  </a>
                )}
              </LineItem>
              <LineItem
                label="Dependencies"
                value={getRaw(result, "dependencies")}
              >
                {(
                  values //values.join(",")
                ) =>
                  values.map(value => (
                    <LinkContainer key={value}>
                      <a
                        target="_blank"
                        href={`https://www.npmjs.com/package/${value}`}
                      >
                        {value}
                      </a>
                    </LinkContainer>
                  ))
                }
              </LineItem>

              <LineItem label="Owners" value={getRaw(result, "owners")}>
                {value => value.join(", ")}
              </LineItem>
            </List>
          </Box>
        </Result>
      ))}
    </StyledResults>
  );
}
