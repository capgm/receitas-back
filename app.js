const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/receita");

const receitaSchema = new mongoose.Schema({
  nome: String,
  categoria: String,
  ingredientes: String,
  modoPreparo: String,
  urlImgaem : String
});

const categoriaSchema = new mongoose.Schema({
  categoria: String,
});

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  urlImagemProfile: String
});

const Categoria = mongoose.model("categorias", categoriaSchema);
const Receita = mongoose.model("receitas", receitaSchema);
const Usuario = mongoose.model("usuarios", usuarioSchema);

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
    categoria: req.body.senha
  });
  try {

    const email = usuario.email;
    const password = usuario.senha;
    console.log(usuario)
    await Usuario
      .find({email: email, senha: password})
      .then((user) => {
        res.send(user);
      })
      .catch((erro) => {
        res.send({islogado : false});
        console.log(erro);
      });
  } catch (erro) {
    res.send({islogado : false});
    console.log(erro);
  }
});

app.post("/signup", async (req, res) => {
  const novoUsuario = new Usuario({
    nome: req.body.nome,
    senha: req.body.senha,
    email: req.body.email
  });
  console.log(novoUsuario)
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

    await Receita.find({categoria: categoria})
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
