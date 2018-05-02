import { Component } from "react";
import { debounce } from "lodash";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

/*
  A simple abstraction to centralize all App Search logic in one place. This uses the
  Render Props pattern (https://reactjs.org/docs/render-props.html) and hence makes no assumption
  about your view, it simply passes down handlers and data to the app.

  In your React app, you may choose to use something like Redux or Mobx to achieve this centralization,
  but for simplicity in this Demo, we've chosen to simply keep this in a top-level component.
*/
export default class Search extends Component {
  state = {
    query: "",
    results: []
  };

  updateQuery = query => {
    this.setState({
      query
    });

    this.updateResults(query);
  };

  updateResults = debounce(query => {
    var client = SwiftypeAppSearch.createClient({
      accountHostKey: process.env.REACT_APP_HOST_KEY,
      apiKey: process.env.REACT_APP_API_KEY,
      engineName: "node-modules"
    });

    var options = {
      search_fields: {
        name: {},
        description: {},
        keywords: {},
        owners: {},
        dependencies: {}
      },
      result_fields: {
        id: { raw: {} },
        name: {
          raw: {},
          snippet: {
            size: 200,
            fallback: true
          }
        },
        version: { raw: {} },
        description: {
          snippet: {
            size: 200,
            fallback: true
          }
        },
        keywords: {
          raw: {},
          snippet: {
            size: 200,
            fallback: true
          }
        },
        repository: { raw: {} },
        owners: {
          raw: {},
          snippet: {
            size: 200,
            fallback: true
          }
        },
        dependencies: {
          raw: {},
          snippet: {
            size: 200,
            fallback: true
          }
        },
        homepage: { raw: {} }
      }
    };

    client
      .search(query, options)
      .then(resultList => {
        this.setState({
          results: resultList.results
        });
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  }, 200);

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  render() {
    const { children } = this.props;
    const { query, results } = this.state;
    return children({ query, results, updateQuery: this.updateQuery });
  }
}
