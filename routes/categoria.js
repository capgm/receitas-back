const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

router.get("/categorias", async (req, res) => {
  await Categoria.find()
    .then((categorias) => {
      res.json(categorias);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
