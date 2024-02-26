const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Receita");
require("../models/Categoria");
const Receita = mongoose.model("receitas");

router.post("/receitas", async (req, res) => {
  const novaReceita = new Receita({
    nome: req.body.nome,
    id_usuario: req.body.id_usuario,
    id_categoria: req.body.id_categoria,
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
    .then( async (receita) => {
      console.log(receita )
      res.json(receita);
    })
    .catch((erro) => {
      res.json({ error: erro });
    });
});

router.get("/receitas/consulta/:id_categoria/:nome", async (req, res) => {
  let id_categoria = req.params.id_categoria;
  let nome = req.params.nome;

  let objFiltro = new Object();

  if(id_categoria != -1 ){    
    objFiltro.id_categoria = id_categoria;
  }

  if(nome !=  ""){

    if(nome.length > 4){
      objFiltro.nome = { $regex: startWithTerm, $options: 'i' };
    }else{
      objFiltro.nome = nome;
    }    
  }

 await Receita.find(objFiltro)
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
