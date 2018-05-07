import { Component } from "react";
import { debounce } from "lodash";
import queryString from "query-string";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

const QUERY_OPTIONS = {
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

/*
  A simple abstraction to centralize all App Search logic in one place. This uses the
  Render Props pattern (https://reactjs.org/docs/render-props.html) and hence makes no assumption
  about your view, it simply passes down handlers and data to the app.

  In your React app, you may choose to use something like Redux or Mobx to achieve this centralization,
  but for simplicity in this Demo, we've chosen to simply keep this in a top-level component.
*/
export default class Search extends Component {
  state = {
    pageState: {
      currentPage: 0,
      pageSize: 0,
      totalPages: 0,
      totalResults: 0
    },
    results: []
  };

  updateQuery = query => {
    const { history } = this.props;
    history.push("?" + queryString.stringify({ q: query }));
  };

  updatePage = newPage => {
    const { q } = this.getQueryState();
    this.updateResults(q, newPage);
  };

  updateResults = debounce((query, page) => {
    console.log("updating");
    var client = SwiftypeAppSearch.createClient({
      accountHostKey: process.env.REACT_APP_HOST_KEY,
      apiKey: process.env.REACT_APP_API_KEY,
      engineName: "node-modules"
    });

    client
      .search(query, {
        ...QUERY_OPTIONS,
        page: {
          size: 10,
          current: page
        }
      })
      .then(
        resultList => {
          this.setState({
            results: resultList.results,
            pageState: {
              currentPage: resultList.info.meta.page.current,
              pageSize: resultList.info.meta.page.size,
              totalPages: resultList.info.meta.page.total_pages,
              totalResults: resultList.info.meta.page.total_results
            }
          });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  }, 200);

  getQueryState = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    const { q } = this.getQueryState();
    this.updateResults(q);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const { q } = this.getQueryState();
      this.updateResults(q);
    }
  }

  render() {
    const { children } = this.props;
    const { pageState, results } = this.state;
    const { q } = this.getQueryState();

    return children({
      pageState,
      query: q,
      results,
      updatePage: this.updatePage,
      updateQuery: this.updateQuery
    });
  }
}
