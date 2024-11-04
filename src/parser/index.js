const Fuse = require("fuse.js");

function fuzzySearchProducts(searchTerm, products, threshold = 0.6, limit = 5) {
  const options = {
    keys: ["nombre"],
    threshold,
    limit,
  };

  const fuse = new Fuse(products, options);
  const results = fuse.search(searchTerm);

  // Devuelve solo los elementos encontrados
  return results.map((result) => result.item);
}

module.exports = { fuzzySearchProducts };
