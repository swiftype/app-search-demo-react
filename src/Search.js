import { Component } from "react";
import { debounce } from "lodash";
import queryString from "query-string";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_KEY,
  apiKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});

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
    license: { raw: {} },
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
  },
  facets: {
    license: {
      type: "value",
      size: 10
    }
  }
};

const FILTERS_WHITELIST = ["license"];

function getFiltersFromQueryState(queryState) {
  return FILTERS_WHITELIST.reduce((acc, filterName) => {
    const filterValue = queryState[filterName];
    if (!filterValue) return acc;
    return acc.concat({ [filterName]: filterValue });
  }, []);
}

/*
  A simple abstraction to centralize all App Search logic in one place. This uses the
  Render Props pattern (https://reactjs.org/docs/render-props.html) and hence makes no assumption
  about your view, it simply passes down handlers and data to the app.

  In your React app, you may choose to use something like Redux or Mobx to achieve this centralization,
  but for simplicity in this Demo, we've chosen to simply keep this in a top-level component.
*/
export default class Search extends Component {
  state = {
    facets: {},
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
    const { history } = this.props;
    history.push(
      "?" + queryString.stringify({ ...this.getQueryState(), page: newPage })
    );
  };

  updateFromQueryState = () => {
    let { q, page } = this.getQueryState();
    const filters = getFiltersFromQueryState(this.getQueryState());
    q = q || "";
    page = parseInt(page, 10);
    page = isNaN(page) ? 1 : page;
    this.updateResults({ query: q, page: parseInt(page, 10), filters });
  };

  updateResults = debounce(({ query, page = 1, filters }) => {
    client
      .search(query, {
        ...QUERY_OPTIONS,
        filters: {
          all: filters
        },
        page: {
          size: 10,
          current: page
        }
      })
      .then(
        resultList => {
          this.setState({
            facets: resultList.info.facets,
            pageState: {
              currentPage: resultList.info.meta.page.current,
              pageSize: resultList.info.meta.page.size,
              totalPages: resultList.info.meta.page.total_pages,
              totalResults: resultList.info.meta.page.total_results
            },
            results: resultList.results
          });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  }, 200);

  getQueryState = () => queryString.parse(this.props.location.search);

  componentDidMount() {
    this.updateFromQueryState();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.updateFromQueryState();
    }
  }

  render() {
    const { children } = this.props;
    const { facets, pageState, results } = this.state;
    const { q } = this.getQueryState();

    return children({
      facets,
      pageState,
      query: q,
      queryState: this.getQueryState(),
      results,
      updatePage: this.updatePage,
      updateQuery: this.updateQuery
    });
  }
}
