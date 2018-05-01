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

  //We'll just grab the first 10k packages, for this demo.
  if (modules.length >= 10000) handleUpToDate();
}

function format(pkg) {
  let {
    name,
    version,
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
    id: name, // It needs a unique "id", otherwise when we re-index a new record will be created.
    name,
    version,
    description,
    homepage,
    created,
    modified,
    preferGlobal,
    keywords,
    repository,
    owners: (owners || []).map(o => o.email),
    dependencies: Object.keys(dependencies || {})
  };
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
