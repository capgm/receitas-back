const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoria = require("./routes/categoria");
const receita = require("./routes/receita");
const usuario = require("./routes/usuario");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

let uri = "";
if (process.env.NODE_ENV == "production") {
  uri =
    "mongodb+srv://usuarioadmin:9u0TBnoFXmgqwttC@receita0.zjxxt2t.mongodb.net/?retryWrites=true&w=majority";
} else {
  uri = "mongodb://localhost:27017/receita";
}

/// Conectar ao banco de dados MongoDB mLab
mongoose.connect(uri);
const db = mongoose.connection;

// Lidar com eventos de conexão ao banco de dados
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao banco de dados MongoDB");
});

app.use("/", categoria);
app.use("/", receita);
app.use("/", usuario);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
