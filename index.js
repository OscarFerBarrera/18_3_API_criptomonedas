// Configuración del server
const express = require("express");
const { cryptoRouter } = require("./routes/crypto.routes.js");

// Conexión a la BBDD
const { connect } = require("./db.js");
connect();

// Configuracion del server
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// configurar routers
const router = express.Router();
// Ruta home
router.get("/", (req, res) => {
  res.send("Esta es la home de nuestra API crypto monedas");
});
// Manejo de cualquier ruta que no este definida
router.get("*", (req, res) => {
  res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
});

// Usamos las rutas
server.use("/crypto", cryptoRouter);
server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
