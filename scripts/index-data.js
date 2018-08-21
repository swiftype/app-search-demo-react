const ora = require("ora");
const spinner = ora("").start();
require("dotenv").config();

let documents;
try {
  documents = require("../data/node-modules.json");
} catch (e) {
  console.error(
    "No data/node-modules.json file was found, be sure to run `yarn run-init`"
  );
  process.exit(1);
}

const getUrlFunction = () => {
  if (process.env.REACT_APP_STATIC_SEARCH_HOST) {
    return accountHostKey => {
      return `${process.env.REACT_APP_STATIC_SEARCH_HOST}/api/as/v1/`;
    };
  }
};
const SwiftypeAppSearchClient = require("swiftype-app-search-node");
const accountHostKey = process.env.REACT_APP_HOST_IDENTIFIER;
const apiKey = process.env.REACT_APP_API_KEY;
const client = new SwiftypeAppSearchClient(
  accountHostKey,
  apiKey,
  getUrlFunction()
);

/*
  `client.indexDocuments` will only accept 100 documents at a time, so we index
  our data set in batches. The following is a very simple batching function, which
  allows for has a configurable `concurrency` variable, which allows for faster
  indexing.
*/
function indexDocumentsInBatches(client, engineName, documents) {
  const concurrency = 20;
  const size = 100;
  let start = 0;
  let end = start + size;
  let recordsIndexed = 0;

  function nextBatch() {
    const batch = documents.slice(start, end);
    start += size;
    end += size;
    return batch;
  }

  async function batchChain() {
    let batch = nextBatch();
    await client.indexDocuments(engineName, batch);
    recordsIndexed += batch.length;
    if (start < documents.length) {
      return batchChain();
    }
  }

  for (let i = 0; i < concurrency; i++) {
    batchChain();
  }

  let exitOnNextTick = false;
  setInterval(() => {
    spinner.text = `Indexed ${recordsIndexed} of ${documents.length}`;
    if (exitOnNextTick === true) {
      console.log(`\nFinished indexing ${recordsIndexed} records.`);
      process.exit();
    }
    if (recordsIndexed >= documents.length) exitOnNextTick = true;
  }, 500);
}

indexDocumentsInBatches(client, "node-modules", documents);
