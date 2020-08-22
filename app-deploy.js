const fs = require("fs");
const archiver = require("archiver");
const moment = require("moment");

const OUTPUT_BASE_FILE_NAME = "more-dustry.zip";

const FOLDERS_TO_ZIP = [
  "bundles",
  "content",
  "maps",
  "scripts",
  "sounds",
  "sprites"
];

const FILES_TO_ZIP = [
  "mod.hjson"
];

const genFileName = () => {
  return `${OUTPUT_BASE_FILE_NAME}-${new moment(new Date()).format("DD-MM-YYYY-hh-mm-ss")}.zip`;
};

const output = fs.createWriteStream(`./builds/${genFileName()}`);

const archive = archiver("zip", {
  zlib: { level: 7 }
});

output.on("close", () => {
  console.log(`${archive.pointer()} total bytes compressed.`);
  console.log("Archiver has been finalized and the output file description has been closed.");
});

output.on("end", () => {
  console.log("All data has been drained");
});

archive.on("warning", err => {
  if (err.code === "ENOENT") {
    console.warn("Warning!", err)
  } else {
    throw err;
  }
});

archive.on("error", err => {
  throw err;
});

archive.pipe(output);

FOLDERS_TO_ZIP.forEach(folder => {
  archive.directory(`./${folder}`, `more-dustry/${folder}`);
});

FILES_TO_ZIP.forEach(file => {
  archive.file(`./${file}`, { name : `more-dustry/${file}`});
});

archive.finalize();
