import React, { Component } from "react";
import { Input, Provider as ThemeProvider } from "rebass";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";
import Facets from "./Facets";

const HeaderBar = styled.div`
  color: rgb(255, 255, 255);
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1em;
`;

const HeaderBarInner = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
`;

const StyledInput = Input.extend`
  background-color: white;
  flex: 1;
  color: black;
`;

const Title = styled.div`
  margin-right: 20px;
  font-size: 2em;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  padding: 20px;
`;

const BodyInner = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
`;

const LeftColumn = styled.div`
  width: 250px;
  margin-right: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
`;

const RightColumn = styled.div`
  flex: 1;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider
        theme={{
          fonts: {
            sans: '"Roboto", sans-serif'
          }
        }}
      >
        <Router>
          <Route>
            {({ location, history }) => (
              <Search location={location} history={history}>
                {({
                  facets,
                  filters,
                  pageState,
                  query,
                  queryState,
                  results,
                  updatePage,
                  updateQuery
                }) => (
                  <div className="App">
                    <HeaderBar>
                      <HeaderBarInner>
                        <Logo src={logo} alt="logo" />
                        <Title>Module Search</Title>
                        <StyledInput
                          value={query}
                          onChange={e => updateQuery(e.target.value)}
                        />
                      </HeaderBarInner>
                    </HeaderBar>
                    <Body>
                      <BodyInner>
                        <LeftColumn>
                          <Facets
                            facets={facets}
                            filters={filters}
                            queryState={queryState}
                          />
                        </LeftColumn>
                        <RightColumn>
                          <Totals {...pageState} />
                          <Results results={results} queryState={queryState} />
                          <Pagination {...pageState} onPage={updatePage} />
                        </RightColumn>
                      </BodyInner>
                    </Body>
                  </div>
                )}
              </Search>
            )}
          </Route>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
