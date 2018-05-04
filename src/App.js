import React, { Component } from "react";
import { Input, Provider as ThemeProvider } from "rebass";
import styled from "styled-components";

import logo from "./logo.svg";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";

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
        <Search>
          {({ query, results, pageState, updateQuery }) => (
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
                  <Totals {...pageState} />
                  <Results results={results} />
                </BodyInner>
              </Body>
            </div>
          )}
        </Search>
      </ThemeProvider>
    );
  }
}

export default App;
