import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ScrollToTop from "./ScrollToTop";
import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";
import Facets from "./Facets";

import packageIcon from "./icons/icon-package.svg";
import poweredBy from "./images/powered-by@2x.png";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Route>
            {({ location, history }) => (
              <Search location={location} history={history}>
                {({
                  query,
                  queryState,
                  queryClass,
                  searchActions,
                  searchResults
                }) => (
                  <div>
                    <div className="site-background" />
                    <div className={`search-demo live-filtering ${queryClass}`}>
                      <div className="search-demo__content">
                        <div className="search-demo__header">
                          <div className="search-demo__headings">
                            <div className="search-demo__icon-wrap">
                              <img
                                src={packageIcon}
                                alt="Dog Icon"
                                className="search-demo__icon"
                              />
                            </div>
                            <h1 className="search-demo__title">
                              Package Search
                            </h1>
                            <h3 className="search-demo__sub-heading powered-by">
                              <img src={poweredBy} alt="Powered by Swiftype" />
                            </h3>
                          </div>
                          <div className="search-demo__input-wrapper">
                            <input
                              className="search-demo__text-input"
                              placeholder="Search node packages&#8230;"
                              value={query}
                              onChange={e =>
                                searchActions.updateQuery(e.target.value)
                              }
                            />
                            <input
                              type="submit"
                              value="Search"
                              className="button search-demo__submit"
                            />
                          </div>
                        </div>

                        <div className="search-demo__body">
                          <div className="search-results">
                            <Facets
                              facets={searchResults.facets}
                              filters={searchResults.filters}
                              queryState={queryState}
                            />
                            <div className="results">
                              <div className="results__header">
                                <Totals {...searchResults.pageState} />
                                <div className="results__powered-by powered-by">
                                  <img
                                    src="https://app.swiftype.com/assets/embed/powered-by@2x.png"
                                    alt="Powered by Swiftype"
                                  />
                                </div>
                              </div>
                              <div className="results__body">
                                <Results
                                  results={searchResults.results}
                                  queryState={queryState}
                                  trackClick={searchActions.trackClick}
                                />
                              </div>
                              <div className="results__footer">
                                <Pagination
                                  {...searchResults.pageState}
                                  onPage={searchActions.updatePage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Search>
            )}
          </Route>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
