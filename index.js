const app = require("./server/express");
require('./server/mongoDb')
app.listen(app.get("port"), () => {
  console.log(`Pagina prendida`);
});
