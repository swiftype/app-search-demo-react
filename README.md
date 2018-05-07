# App Search React Example

This example demonstrates how to build a React based search interface using Swiftype's App Search.

This README is broken down into the follow sections:

* [Setup](#setup) - Follow these instructions to run the Example search app.
* [React Quick Start](#react-quick-start) - Build your own basic React app in a few simple steps.
* [Topics](#topics) - Considerations when building a React based search app.

## Setup

To get started, simply clone this repository and run yarn to install dependencies.

```
# Clone the repository
git clone git@github.com:JasonStoltz/react-app-search-demo.git
cd react-app-search-demo

# Install dependencies
yarn
```

### Create an Engine in App Search

Before setting up this project, you will need to create a new Engine on [Swiftype App Search](https://swiftype.com/app-search). Name it `node-modules` (this is important).

You'll then need to configure this project to point to your newly created Engine, so create a `.env` file at the root of this project using the following format:

```
REACT_APP_HOST_KEY=
REACT_APP_API_KEY=
REACT_APP_SEARCH_KEY=
```

From within the Engine Dashbord, navigate to "Access > API Keys". Enter the "Account Host Key", "api-key", and "search-key" values from that screen as values in the `.env` file, respectively.

### Push data to the `node-modules` Engine

This project doesn't have a backend API or database as many projects would. Instead, it simply pulls documents from a JSON file, and indexes them directly into App Search
using the [swiftype-app-search-node](https://github.com/swiftype/swiftype-app-search-node) client. This JSON file doesn't
exist yet, so the first thing to do is download that data file.

```
yarn run init-data
```

If that ran succesfully, a `data/node-modules.json` file should now exist. Now index the data you've downloaded into your App Search Engine:

```
yarn run index-data
```

If you return to your Engine's Dashboard, you should now see the indexed documents. Once there, you'll need define types for your Schema. By default, everything should be Text, which is correct for the most part. The only thing you'll need to is change the two date fields, `created` and `modified`, to `Date` types.

### Run the search app

At this point, your engine is ready and all that is left to do is run the app.

```
yarn start
```

## React Quick Start

Getting a React-based front-end up and running for App Search is dead simple. Here are a few quick steps to create a basic front-end of your own:

1.  Set up and populate an Engine. To do so, just pull this repo down and follow the instructions in [Setup](#setup).

2.  Create a new app with `create-react-app`

```bash
yarn global add create-react-app
create-react-app node-module-search
```

3.  Add the App Search Javascript Search Client:

```bash
cd node-module-search/
yarn add swiftype-app-search-javascript
```

4.  Configure your app with your App Search credentials. The steps are listed in [Setup](#setup). The same `.env` file will work here, but note that since we're only querying, not indexing, you won't need your write-privledged API key, just the Host and read-only Search key will do.

```bash
# .env

REACT_APP_HOST_KEY=<key goes here>
REACT_APP_SEARCH_KEY=<key goes here>
```

4.  Replace `App.js` with the following:

```javascript
// src/App.js

import React, { Component } from "react";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

const client = SwiftypeAppSearch.createClient({
  accountHostKey: process.env.REACT_APP_HOST_KEY,
  apiKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: "node-modules"
});

class App extends Component {
  state = {
    query: "",
    results: null
  };

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  handleChange = e => {
    const query = e.target.value;
    this.setState(
      {
        query
      },
      () => {
        this.updateResults(query);
      }
    );
  };

  updateResults = query => {
    client
      .search(query, {
        search_fields: {
          name: {},
          description: {}
        },
        result_fields: {
          id: { raw: {} },
          name: {
            raw: {}
          },
          description: {
            raw: {}
          }
        }
      })
      .then(
        resultList => {
          this.setState({
            results: resultList
          });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
  };

  render() {
    const { query, results } = this.state;
    if (!results) return null;
    return (
      <div className="App">
        <input type="text" value={query} onChange={this.handleChange} />
        {results.results.map(result => (
          <div key={result.getRaw("id")}>
            <h3>{result.getRaw("name")}</h3>
            <div>{result.getRaw("description")}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
```

5.  Run your new search app

```
yarn start
```

At this point, you should have a fully functioning, ableit simple, React based interface for your App Search Engine. Huzzah!

![Create Engine Screenshot](readme_images/basic.png)

Don't stop there though. This app is super simple and it won't get your very far. Review the example code and some of the [Topics](#topics) listed below to scale this up to meet your needs.

## Topics

### Indexing your data

Generally speaking, indexing data (i.e. the process of populating your Engine with documents, or data) is outside the purview of a React App. You'll likely implement that as part of your backend API. However, you can see an example of how this might be accomplished using the [Node.js client](https://github.com/swiftype/swiftype-app-search-node) in this example's [index-data.js](./scripts/index-data.js) script.

For more information, visit the Swiftype App Search [documentation](https://swiftype.com/documentation/app-search/guides/indexing-documents).

### Accessing your data

You effectively have two options for accessing data from a React app.

1.  Access the data through your own API, which queries your Engine on the backend.
2.  Access the data through Swiftype's API, querying data directly in the front end using the [swiftype-app-search-javascript](https://github.com/swiftype/swiftype-app-search-javascript) client.

Typically, you'll want to go with option 2, and query Swiftype's API directly from the front-end. Swiftype's App Search API
is highly optimized, so querying directly should give you the fastest search experience. This example app takes that approach.

#### Configuring your search app with API credentials

In order to use the Javascript clieht, you'll need to configure it with credentials. Here are a few approaches you might consider:

1.  Configuration at build time

    This is the approach this example application uses. It reads the API credentials you provide at build time from `.env`, and
    includes them as part of the built Javascript bundle. This is convenient as `create-react-app` has a mechanism built in for that, [out of the box](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables). The drawback of this approach is that the build bundle becomes environment specific, you couldn't use the same bundle in multiple environments.

2.  Configuration at run time

    An alternate approach would be configuring these environment variables as part of your host application, server side, and then passing them in through data attributes in the DOM:

    ```
    <div data-host-key="your_key_here" data-search-key="your_key_here" id="search" />
    ```

3.  Configuration through proxy

    This approach would involve proxying API requests through your own API, which adds the appropriate authentication Headers. This would typically be implemented in order to hide your API key from public view, however, as long as you are using a read-only API key, it is often unnecessary to implement this.

### State Management

#### Managing URL State

### Searching

### Showing Results

### Paging

### Filtering

### Click through tracking

### Testing

```

```
