import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Pagination from "./Pagination";
import Results from "./Results";
import Search from "./Search";
import Totals from "./Totals";
import Facets from "./Facets";

import appSearchIcon from "./icons/icon-app-search-bb.svg";
import packageIcon from "./icons/icon-package.svg";
import poweredBy from "./images/powered-by@2x.png";
import poweredByWhite from "./images/powered-by--white@2x.png";

class App extends Component {
  render() {
    return (
      <Router>
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
                <div className={`search-demo live-filtering ${queryClass}`}>
                  <div className="search-demo__content">
                    <div className="search-demo__background" />
                    <div class="search-demo__header">
                      <div class="search-demo__headings">
                        <div className="search-demo__icon-wrap">
                          <img
                            src={packageIcon}
                            alt="Dog Icon"
                            class="search-demo__icon"
                          />
                        </div>
                        <h1 class="search-demo__title">Package Search</h1>
                        <h3 class="search-demo__sub-heading powered-by">
                          <img src={poweredBy} alt="Powered by Swiftype" />
                        </h3>
                      </div>
                      <div class="search-demo__input-wrapper">
                        <input
                          class="search-demo__text-input"
                          placeholder="Search node packages&#8230;"
                          value={query}
                          onChange={e =>
                            searchActions.updateQuery(e.target.value)
                          }
                        />
                        <input
                          type="submit"
                          value="Search"
                          class="button search-demo__submit"
                        />
                      </div>
                    </div>

                    <div class="search-demo__body">
                      <div class="search-results">
                        <Facets
                          facets={searchResults.facets}
                          filters={searchResults.filters}
                          queryState={queryState}
                        />
                        <div class="results">
                          <div class="results__header">
                            <Totals {...searchResults.pageState} />
                            <div class="results__powered-by powered-by">
                              <img
                                src="https://app.swiftype.com/assets/embed/powered-by@2x.png"
                                alt="Powered by Swiftype"
                              />
                            </div>
                          </div>
                          <div class="results__body">
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
              )}
            </Search>
          )}
        </Route>
      </Router>
    );
  }
}

export default App;
