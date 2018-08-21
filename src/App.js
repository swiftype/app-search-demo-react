import React, { Component } from "react";
import { debounce } from "lodash";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import "./App.css";

const client = SwiftypeAppSearch.createClient({
  accountHostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});

class App extends Component {
  // requestSequence is used to generate sequential requestIds
  requestSequence = 0;

  state = {
    lastCompleted: 0, // A new state property to track the last completed requestId
    queryString: "",
    response: null
  };

  componentDidMount() {
    this.performQuery(this.state.queryString);
  }

  updateQuery = e => {
    const queryString = e.target.value;
    this.setState(
      {
        queryString
      },
      () => {
        this.performQuery(queryString);
      }
    );
  };

  performQuery = debounce(queryString => {
    // Assigning a requestId tp each new request
    const requestId = ++this.requestSequence;

    client.search(queryString, {}).then(
      response => {
        // Early exit check to avoid rendering old responses
        if (requestId < this.state.lastCompleted) return;
        this.setState({
          // Storing the last completed requestId
          lastCompleted: requestId,
          response
        });
      },
      error => {
        console.log(`error: ${error}`);
      }
    );
  }, 200);

  render() {
    const {response, queryString} = this.state;
    if (!response) return null;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Module Search</h1>
        </header>
        <input
          className="App-search-box"
          type="text"
          placeholder="Enter a search term here"
          value={queryString}
          onChange={this.updateQuery}
        />
        <h2>{response.info.meta.page.total_results} Results</h2>
        {response.results.map(result => (
          <div key={result.getRaw("id")}>
            <p>Name: {result.getRaw("name")}</p>
            <p>Description: {result.getRaw("description")}</p>
            <br />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
