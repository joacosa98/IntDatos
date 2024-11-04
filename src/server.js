const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const { eliminarTodo } = require("./redis");

app.use("/", routes);

app.listen(port, async () => {
  if (process.argv[2] === "wipe") {
    await eliminarTodo();
  }
  console.log(`Server is running on http://localhost:${port}`);
});
