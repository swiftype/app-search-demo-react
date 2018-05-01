# React App Search Demo

Example of a React application using Swiftype App Search to build a search interface.

## Setup

Before setting this project up, you will need to create a new Engine on Swiftype App Search called
`node-modules`.

After creating the engine, navigate to "Access > API Keys". Create a `.env` file at the root of this project with the "Account Host Key" and "api-key" values from that screen.

```
# In /.env

APP_SEARCH_HOST_KEY=host-1212121
APP_SEARCH_API_KEY=api-12121212121211212
```

### Running the app

```
# Clone the repository
git clone git@github.com:JasonStoltz/react-app-search-demo.git
cd react-app-search-demo

# Install dependencies
yarn

# Download a dump of all npm packages, in order to index inside
# of our new App Search Engine, written to `data/node-modules.json`.
yarn run init-data

# Index the data you've downloaded into your App Search Engine.
yarn run index-data
```

After you've indexed all of your data, you'll need to go into the Admin panel in App Search and define types for your Schema. The only changes we'll need to is change our two data fields, `created` and `modified` to "Date" types.
