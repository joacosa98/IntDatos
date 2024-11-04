const express = require("express");
const { getProductos, scrapeAndParseDevoto2 } = require("../scraper");
const { obtenerProducto } = require("../redis");
const router = express.Router();

router.get("/", async (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.json({ productos: [] });
    return;
  }

  const productos = await getProductos(name);

  res.json({ productos });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const producto = await obtenerProducto(id);

  res.json({ producto });
});

module.exports = router;
