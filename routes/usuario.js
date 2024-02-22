const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcrypt");

// Função para criar uma hash da senha
async function criarHashSenha(senha) {
    try {
      // Gere um salt aleatório com custo de processamento 10 (pode ser ajustado conforme necessário)
      const salt = await bcrypt.genSalt(10);
  
      // Crie uma hash para a senha usando o salt
      const hashSenha = await bcrypt.hash(senha, salt);
  
      return hashSenha;
    } catch (error) {
      console.error("Erro ao criar a hash da senha:", error);
    }
  }

router.post("/signin", async (req, res) => {
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

router.post("/signup", async (req, res) => {
  criarHashSenha(req.body.senha)
    .then(async (hash) => {
      const novoUsuario = new Usuario({
        nome: req.body.nome,
        senha: hash,
        email: req.body.email,
      });

      await Usuario.find({ email: req.body.email })
        .then(async (resultado) => {
          console.log(resultado);

          if (resultado.length > 0) {
            res.send({ erro: "Já existe um usuário com esse email!" });
          } else {
            await novoUsuario
              .save()
              .then(() => {
                res.send("Recebido com sucesso!");
              })
              .catch((erro) => {
                console.log(erro);
              });
          }
        })
        .catch((error) => {});
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
