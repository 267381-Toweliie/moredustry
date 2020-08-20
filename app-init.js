const fs = require("fs");

const makeFolder = (path, mask, handler) => {
  if (typeof mask === 'function') {
    handler = mask;
    mask = "0777";
  }

  fs.mkdir(path, mask, error => {
    if (error) {
      if (error.code === "EEXIST") {
        handler(null);
      } else {
        handler(error);
      }
    } else {
      handler(null);
    }
  })
};

const folderStructure = {
  "bundles": null,
  "content": {
    "blocks": null,
    "items": null,
    "liquids": null,
    "mechs": null,
    "units": null,
    "zones": null
  },
  "maps": null,
  "scripts": null,
  "sounds": null,
  "sprites": {
    "blocks": {
      "conveyors": null,
      "drills": null,
      "environment": null,
      "turrets": null,
      "units": null
    },
    "items": null,
    "mechs": null,
    "units": null,
    "zones": null
  }
};

const mapStructure = (prefix, node) => {
  Object.keys(node).forEach(key => {
    const currentDir =`${prefix ? prefix : "."}/${key}`;

    makeFolder(currentDir, (error) => {
      if (error) {
        console.error(error);
      } else {
        if (node[key] !== null) {
          mapStructure(currentDir, node[key]);
        }
      }
    });
  });
};

mapStructure(null, folderStructure);