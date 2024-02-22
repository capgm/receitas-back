const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Receita");
const Receita = mongoose.model("receitas");

router.post("/receitas", async (req, res) => {
  const novaReceita = new Receita({
    nome: req.body.nome,
    id_usuario: req.body.id_categoria,
    id_categoria: req.body.id_categoria,
    ingredientes: req.body.ingredientes,
    modoPreparo: req.body.modoPreparo,
  });

  console.log(novaReceita);

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

router.get("/receitas", async (req, res) => {
  await Receita.find()
    .then((receitas) => {
      res.json(receitas);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

router.get("/receita/:id", async (req, res) => {
  await Receita.findById(req.params.id)
    .then((receita) => {
      res.json(receita);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

router.get("/receitas/consulta/:categoria", async (req, res) => {
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
router.put("/receitas/:id", async (req, res) => {
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
router.delete("/receitas/:id", async (req, res) => {
  const deletedItem = await Receita.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("excluiu com sucesso");
    })
    .catch((error) => {
      console.log(error);
    });
  res.json(deletedItem);
});

module.exports = router;
