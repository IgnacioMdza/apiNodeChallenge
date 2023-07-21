const express = require("express");
const app = express();
const cors = require("cors");

// Router
const routerUser = require("./routes/user.route");
const routerPost = require("./routes/post.route");
const routerAuth = require("./routes/auth.route");

// Middlewares para toda nuestra Api
app.use(cors()); // para liberar bloqueos por diferencia de ip entre backend y frontend
app.use(express.json());

// Middlewares de rutas
app.use("/users", routerUser);
app.use("/posts", routerPost);
app.use("/auth", routerAuth);

/*
-> Aqui se ponen los middlewares (ejecución)
-> Endpoint de home
-> Rutear
*/

app.get("/", (req, res) => {
  res.json("Nuestra Api sirve");
});

// Exportar
// common js
module.exports = app;
