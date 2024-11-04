const Fuse = require("fuse.js");

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function fuzzySearchProducts(searchTerm, products, threshold = 0.6, limit = 5) {
  const options = {
    keys: ["nombre"],
    threshold,
    limit,
  };

  const splitSearchTerm = searchTerm.split(" ");
  const preFilteredProducts = products.filter((product) => {
    const productName = product.nombre;

    return splitSearchTerm.every((term) => {
      let regex = "\\b";
      regex += escapeRegExp(term);
      regex += "\\b";
      return new RegExp(regex, "i").test(productName);
    });
  });

  const fuse = new Fuse(preFilteredProducts, options);
  const results = fuse.search(searchTerm);

  // Devuelve solo los elementos encontrados
  return results.map((result) => result.item);
}

module.exports = { fuzzySearchProducts };
