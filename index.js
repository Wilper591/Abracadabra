const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const usuarios = [
  { id: "1", nombre: "Jorge" },
  { id: "2", nombre: "Samanta" },
  { id: "3", nombre: "Daniela" },
  { id: "4", nombre: "Alfonso" },
];

//Devolver un json
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({ usuarios });
});

// Autenticación de usuario
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const Usuario = req.params.usuario;
  const usuariosAuth = usuarios.some(
    (usuario) => usuario.id === Usuario
  );

  usuariosAuth
    ? res.sendFile(__dirname + "/public/abracadabra.html")
    : res.send('<img src="/assets/img/who.jpeg">');
});

// Ruta que compara el parametro n con el elegido
app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = Math.floor(Math.random() * 4) + 1;
  const numero = Number(req.params.n);

  numero === n
    ? res.sendFile(__dirname + "/public/assets/img/conejito.jpg")
    : res.sendFile(__dirname + "/public/assets/img/voldemort.jpg");
});

// Ruta genérica
app.get("*", (req, res) => {
  res.send("Esta página no existe");
});

app.listen(port, () => {
  console.log(`Aplicación conectada al puerto ${port}`);
});
