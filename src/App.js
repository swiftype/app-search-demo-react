import React, { Component } from "react";
import { Input, Provider } from "rebass";
import styled from "styled-components";

import Results from "./Results";

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
  padding-top: 20px;
  font-family: "Roboto", sans-serif;
`;

const BodyInner = styled.div`
  width: 100%;
  max-width: 1024px;
`;

class App extends Component {
  render() {
    return (
      <Provider
        theme={{
          fonts: {
            sans: '"Roboto", sans-serif'
          }
        }}
      >
        <div className="App">
          <HeaderBar>
            <HeaderBarInner>
              <Title>Node Module Search</Title>
              <StyledInput />
            </HeaderBarInner>
          </HeaderBar>
          <Body>
            <BodyInner>
              <Results />
            </BodyInner>
          </Body>
        </div>
      </Provider>
    );
  }
}

export default App;
