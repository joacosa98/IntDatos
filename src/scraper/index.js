const unirest = require("unirest");
const cheerio = require("cheerio");
const crypto = require("crypto");
const puppeteer = require("puppeteer");
const { obtenerProductosPorNombre, agregarProducto } = require("../redis");
const { fuzzySearchProducts } = require("../parser");

async function scraper(scraping_url) {
  let res;
  try {
    res = await unirest.get(scraping_url);
    return { body: res.body, status: 200 };
  } catch (err) {
    return { body: "Something went wrong", status: 400 };
  }
}

const scrape = async (url) => {
  try {
    const res = await scraper(url);
    return res.body;
  } catch (err) {
    console.log(err);
    return "Something went wrong";
  }
};

const scrapeAndParseDevoto = async (name) => {
  const productos = [];

  let response;
  await (async () => {
    // Initiate the browser
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Go to the target website
    await page.goto(`https://www.devoto.com.uy/${encodeURIComponent(name)}`, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // Get pages HTML content
    response = await page.content();

    // Closes the browser and all of its pages
    await browser.close();
  })();

  const $ = cheerio.load(response);

  const nombresuper = "devoto";

  $("#gallery-layout-container .devotouy-search-result-3-x-galleryItem").each(
    (i, elem) => {
      const nombre = $(elem)
        .find(".vtex-product-summary-2-x-productBrand")
        .text()
        .trim();
      const precio = $(elem)
        .find(".devotouy-products-components-0-x-sellingPrice")
        .text()
        .replace("$", "")
        .trim();
      const imagenUrl = $(elem)
        .find(".vtex-product-summary-2-x-imageNormal")
        .attr("src");

      const id = crypto
        .createHash("sha1")
        .update(nombre + nombresuper)
        .digest("hex");
      productos.push({
        id,
        nombre,
        precio,
        imagenUrl,
        nombresuper,
        fecha: new Date(),
      });
    }
  );

  return productos;
};

const scrapeAndParseTata = async (name) => {
  const productos = [];

  let response;
  await (async () => {
    // Initiate the browser
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Go to the target website
    await page.goto(`https://www.tata.com.uy/s/?q=${name}&sort=score_desc`, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // Get pages HTML content
    response = await page.content();

    // Closes the browser and all of its pages
    await browser.close();
  })();

  const $ = cheerio.load(response);

  const nombresuper = "tata";

  $('[class^="product-card-module--fs-product-card"]').each((i, elem) => {
    const nombre = $(elem).find(".link-module--fs-link--5aae5").text().trim();
    const imagenUrl = $(elem)
      .find(".link-module--fs-link--5aae5 img")
      .attr("src");
    const precio = $(elem)
      .find(".price-module--fs-price--9b997")
      .text()
      .replace("$", "")
      .trim();
    const id = crypto
      .createHash("sha1")
      .update(nombre + nombresuper)
      .digest("hex");
    productos.push({
      id,
      nombre,
      precio,
      imagenUrl,
      nombresuper: "tata",
      fecha: new Date(),
    });
  });

  return productos;
};

const scrapeAndParseDisco = async (name) => {
  const productos = [];

  let response;
  await (async () => {
    // Initiate the browser
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Go to the target website
    await page.goto(`https://www.disco.com.uy/${encodeURIComponent(name)}`, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // Get pages HTML content
    response = await page.content();

    // Closes the browser and all of its pages
    await browser.close();
  })();

  const $ = cheerio.load(response);

  const nombresuper = "disco";

  $("#gallery-layout-container .devotouy-search-result-3-x-galleryItem").each(
    (i, elem) => {
      const nombre = $(elem)
        .find(".vtex-product-summary-2-x-productBrand")
        .text()
        .trim();
      const precio = $(elem)
        .find(".devotouy-products-components-0-x-sellingPrice")
        .text()
        .replace("$", "")
        .trim();
      const imagenUrl = $(elem)
        .find(".vtex-product-summary-2-x-imageNormal")
        .attr("src");

      const id = crypto
        .createHash("sha1")
        .update(nombre + nombresuper)
        .digest("hex");
      productos.push({
        id,
        nombre,
        precio,
        imagenUrl,
        nombresuper,
        fecha: new Date(),
      });
    }
  );

  return productos;
};

const scrapeAndParseGeant = async (name) => {
  const productos = [];

  let response;
  await (async () => {
    // Initiate the browser
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Go to the target website
    await page.goto(`https://www.geant.com.uy/${encodeURIComponent(name)}`, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // Get pages HTML content
    response = await page.content();

    // Closes the browser and all of its pages
    await browser.close();
  })();

  const $ = cheerio.load(response);

  const nombresuper = "geant";

  $("#gallery-layout-container .devotouy-search-result-3-x-galleryItem").each(
    (i, elem) => {
      const nombre = $(elem)
        .find(".vtex-product-summary-2-x-productBrand")
        .text()
        .trim();
      const precio = $(elem)
        .find(".devotouy-products-components-0-x-sellingPrice")
        .text()
        .replace("$", "")
        .trim();
      const imagenUrl = $(elem)
        .find(".vtex-product-summary-2-x-imageNormal")
        .attr("src");

      const id = crypto
        .createHash("sha1")
        .update(nombre + nombresuper)
        .digest("hex");
      productos.push({
        id,
        nombre,
        precio,
        imagenUrl,
        nombresuper,
        fecha: new Date(),
      });
    }
  );

  return productos;
};

const getProductos = async (nombre) => {
  let productosDevoto = await obtenerProductosPorNombre("devoto", nombre);
  let productosGeant = await obtenerProductosPorNombre("geant", nombre);
  let productosDisco = await obtenerProductosPorNombre("disco", nombre);
  let productosTata = await obtenerProductosPorNombre("tata", nombre);

  if (!productosDevoto.length) {
    const productosDevotoScrate = await scrapeAndParseDevoto(nombre);

    productosDevoto = fuzzySearchProducts(nombre, productosDevotoScrate);

    await Promise.all(
      productosDevoto.map((producto) =>
        agregarProducto(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.imagenUrl,
          producto.fecha,
          "devoto"
        )
      )
    );
  }

  if (!productosGeant.length) {
    const productosGeantScrate = await scrapeAndParseGeant(nombre);

    productosGeant = fuzzySearchProducts(nombre, productosGeantScrate);

    await Promise.all(
      productosGeant.map((producto) =>
        agregarProducto(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.imagenUrl,
          producto.fecha,
          "geant"
        )
      )
    );
  }

  if (!productosDisco.length) {
    const productosDiscoScrate = await scrapeAndParseDisco(nombre);

    productosDisco = fuzzySearchProducts(nombre, productosDiscoScrate);

    await Promise.all(
      productosDisco.map((producto) =>
        agregarProducto(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.imagenUrl,
          producto.fecha,
          "disco"
        )
      )
    );
  }

  if (!productosTata.length) {
    const productosTataScrate = await scrapeAndParseTata(nombre);

    productosTata = fuzzySearchProducts(nombre, productosTataScrate);

    await Promise.all(
      productosTata.map((producto) =>
        agregarProducto(
          producto.id,
          producto.nombre,
          producto.precio,
          producto.imagenUrl,
          producto.fecha,
          "tata"
        )
      )
    );
  }

  return fuzzySearchProducts(nombre, [
    ...productosDevoto,
    ...productosGeant,
    ...productosDisco,
    ...productosTata,
  ]);
};

module.exports = { scrape, getProductos };
