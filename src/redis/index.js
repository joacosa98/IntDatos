const Redis = require("ioredis");
const { fuzzySearchProducts } = require("../parser");

// Conectar a Redis
const redis = new Redis();

// Función para agregar productos
async function agregarProducto(id, nombre, precio, imagenUrl, nombreSuper) {
  await redis.hset(
    `producto:${id}`,
    "nombre",
    nombre,
    "precio",
    precio,
    "imagenUrl",
    imagenUrl,
    "nombreSuper",
    nombreSuper
  );

  console.log(`Producto ${id} agregado: ${nombre} a ${precio}`);
}

// Función para obtener un producto
async function obtenerProducto(id) {
  const producto = await redis.hgetall(`producto:${id}`);
  console.log(`Producto ${id}:`, producto);

  return producto;
}

// Función para obtener productos que matcheen con un string
async function obtenerProductosPorNombre(nombreSuper, nombre) {
  const productos = [];
  let cursor = "0";
  do {
    // Escanear todas las claves que coincidan con el patrón
    const result = await redis.scan(
      cursor,
      "MATCH",
      `producto:*`,
      "COUNT",
      100
    );
    cursor = result[0];
    const keys = result[1];

    for (const key of keys) {
      const producto = await redis.hgetall(key);
      productos.push({ ...producto, id: key.split(":")[1], nombreSuper });
    }
  } while (cursor !== "0"); // Continuar hasta que el cursor sea 0

  return fuzzySearchProducts(nombre, productos);
}

// Función para eliminar todo de Redis
async function eliminarTodo() {
  await redis.flushall();
  console.log("Todos los datos han sido eliminados de Redis");
}

module.exports = {
  agregarProducto,
  obtenerProducto,
  obtenerProductosPorNombre,
  eliminarTodo,
};
