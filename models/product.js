const fs = require("fs");
const path = require("path");

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }

    try {
      const products = JSON.parse(data);
      cb(products);
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr);
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    ensureDirectoryExistence(p);

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    });
  }

  static fetchAll(cb) {
    ensureDirectoryExistence(p);
    getProductsFromFile(cb);
  }
};
