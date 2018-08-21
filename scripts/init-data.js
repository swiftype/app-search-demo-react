/*
  This initialization script is used to download the latest package information from npm.

  For this demo, we only need a small data set, so we are limiting the number of packages that we download to
  10,000.
*/

const fs = require("fs");
const path = require("path");
const ora = require("ora");
const spinner = ora("").start();
const registry = require("package-stream")();
const modules = [];

function handlePackage(pkg) {
  const name = pkg.name;
  if (name && name.length) modules.push(format(pkg));

  // You could uncomment this in order to download ALL npm packages (~650,000), but the process will take
  // significantly longer to run.
  if (modules.length >= 10000) handleUpToDate();
}

function format(pkg) {
  let {
    name,
    version,
    license,
    description,
    homepage,
    created,
    modified,
    preferGlobal,
    keywords,
    repository,
    owners,
    dependencies
  } = pkg;
  return {
    // Even if your document doesn't have a unique "id", it's a good idea to specify one when indexing documents.
    // If you send a document for re-indexing and it doesn't include an id, it will be seen as a new document.
    id: name,
    name,
    version,
    license: [].concat(license || []).map(l => (l && l.type ? l.type : l)),
    description,
    homepage,
    created,
    modified,
    preferGlobal,
    keywords: stringToArray(keywords),
    repository: [].concat(repository || []),
    owners: [].concat(owners || []).map(o => o.email),
    dependencies: Object.keys(dependencies || {})
  };
}

function stringToArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.replace(/\s+/g, ",").split(",");
}

function handleUpToDate() {
  const filename = path.join(__dirname, "../data/node-modules.json");

  fs.writeFileSync(filename, JSON.stringify(modules, null, 2));
  console.log(`\nwrote ${modules.length} packages to ${filename}`);
  process.exit();
}

registry.on("package", handlePackage).on("up-to-date", handleUpToDate);

setInterval(() => {
  spinner.text = `${modules.length} modules imported`;
}, 50);
