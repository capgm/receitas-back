const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Favorito");
const Favorito = mongoose.model("favoritos");

router.post("/favorito", async (req, res) => {
    const favorito = new Favorito({
        id_receita: req.body.id_receita,
        id_usuario: req.body.id_usuario,
    });
    try {
      const id_receita = favorito.id_receita;
      const id_usuario = favorito.id_usuario;

      await Favorito.find({ id_usuario: id_usuario, id_receita: id_receita })
        .then(async (favorito) => {
          
          if(favorito.length > 0){
            await Receita.findByIdAndDelete(favorito[0]._id)
          }else{
            await Favorito.save(favorito).then(()=>{

            }).catch((error)=>{

            })
          }            
        })
        .catch((erro) => {
          console.log(erro);
        });
    } catch (erro) {
      res.send({ islogado: false });
      console.log(erro);
    }
  });

module.exports = router;