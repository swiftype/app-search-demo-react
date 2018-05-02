# React App Search Demo

Example of a React application using Swiftype App Search to build a search interface.

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
APP_SEARCH_HOST_KEY=
APP_SEARCH_API_KEY=
```

From within the Engine Dashbord, navigate to "Access > API Keys". Enter the "Account Host Key" and "api-key" values from that screen as values in the `.env` file, respectively.

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

This app primarily uses [swiftype-app-search-javascript](https://github.com/swiftype/swiftype-app-search-javascript) to query our new Engine and renders the results.
