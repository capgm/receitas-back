const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  "https://receitas-front.onrender.com",
  "https://receitas-front.onrender.com:10000",
  "http://receitas-front.onrender.com",
  "http://receitas-front.onrender.com:10000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Verifica se a origem está na lista permitida ou se é uma solicitação sem origem (como requisições locais)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type, Authorization",
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV == "production") {
  mongoose.connect(
    "mongodb+srv://usuarioadmin:9u0TBnoFXmgqwttC@receita0.zjxxt2t.mongodb.net/?retryWrites=true&w=majority"
  );
} else {
  mongoose.connect("mongodb://localhost:27017/receita");
}

const receitaSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  ingredientes: String,
  modoPreparo: String,
  urlImgaem: String,
});

const categoriaSchema = new mongoose.Schema({
  categoria: String,
});

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  urlImagemProfile: String,
});

const Categoria = mongoose.model("categorias", categoriaSchema);
const Receita = mongoose.model("receitas", receitaSchema);
const Usuario = mongoose.model("usuarios", usuarioSchema);

app.get("/", async (req, res) => {
  res.json({
    sucesso: "sucesso",
  });
});

app.get("/signup", async (req, res) => {
  res.json({
    sucesso: "sucesso",
  });
});

app.get("/categorias", async (req, res) => {
  await Categoria.find()
    .then((categorias) => {
      res.json(categorias);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/receitas", async (req, res) => {
  const novaReceita = new Receita({
    nome: req.body.nome,
    categoria: req.body.categoria,
    ingredientes: req.body.ingredientes,
    modoPreparo: req.body.modoPreparo,
  });
  try {
    await novaReceita
      .save()
      .then(() => {
        res.send("Recebido com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
      });
  } catch (erro) {
    console.log(erro);
  }
});

app.post("/signin", async (req, res) => {
  const usuario = new Usuario({
    email: req.body.email,
    categoria: req.body.senha,
  });
  try {
    const email = usuario.email;
    const password = usuario.senha;
    console.log(usuario);
    await Usuario.find({ email: email, senha: password })
      .then((user) => {
        res.send(user);
      })
      .catch((erro) => {
        res.send({ islogado: false });
        console.log(erro);
      });
  } catch (erro) {
    res.send({ islogado: false });
    console.log(erro);
  }
});

app.post("/signup", async (req, res) => {
  const novoUsuario = new Usuario({
    nome: req.body.nome,
    senha: req.body.senha,
    email: req.body.email,
  });
  console.log(novoUsuario);
  try {
    await novoUsuario
      .save()
      .then(() => {
        res.send("Recebido com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
      });
  } catch (erro) {
    console.log(erro);
  }
});
app.get("/receitas", async (req, res) => {
  await Receita.find()
    .then((receitas) => {
      res.json(receitas);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

app.get("/receita/:id", async (req, res) => {
  await Receita.findById(req.params.id)
    .then((receita) => {
      res.json(receita);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

app.get("/receitas/consulta/:categoria", async (req, res) => {
  let categoria = req.params.categoria;

  await Receita.find({ categoria: categoria })
    .then((receitas) => {
      res.json(receitas);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

// Rota PUT para atualizar um item pelo ID
app.put("/receitas/:id", async (req, res) => {
  await Receita.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      console.log("alterou");
      res.json({ success: "success" });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Rota DELETE para excluir um item pelo ID
app.delete("/receitas/:id", async (req, res) => {
  const deletedItem = await Receita.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("excluiu com sucesso");
    })
    .catch((error) => {
      console.log(error);
    });
  res.json(deletedItem);
});

//app.use("/.netlify/functions/api", router);

//module.exports.handler =  serverless(app)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
