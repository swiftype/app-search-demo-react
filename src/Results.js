import React from "react";
import styled from "styled-components";
import { Panel, Box } from "rebass";

const Result = Panel.extend``;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export default function Results(props) {
  return (
    <div>
      <Result>
        <Panel.Header color="white" bg="#7F7F7F">
          Module Name
        </Panel.Header>
        <Box p={3}>
          <List>
            <li>Thing 1</li>
            <li>Thing 1</li>
            <li>Thing 1</li>
          </List>
        </Box>
      </Result>
    </div>
  );
}
