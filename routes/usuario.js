const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcryptjs");

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
  });
  const email = usuario.email;

  await Usuario.find({ email: email })
    .then((user) => {
      const { senha } = user[0];
      bcrypt.compare(req.body.senha, senha, (err, result) => {
        if (err) {
          console.error("Erro ao comparar as senhas", err);
          return;
        }

        if (result) {
          
          user[0].senha = "";

          const retorno = {
            mensagem : "",
            islogado: true,
            user: user[0],
          };

          res.send(retorno);
        } else {
          const retorno = {
            mensagem : "A senha está incorreta.",
            islogado: false,
            user: "",
          };
        }
      });
    })
    .catch((erro) => {
      res.send({ islogado: false });
      console.log(erro);
    });
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
            res.send({ msg: "Já existe um usuário com esse email!", sucesso : false });
          } else {
            await novoUsuario
              .save()
              .then(() => {
                res.send( { msg: "Usuario cadastrado com sucesso!",  sucesso : true });
              })
              .catch((erro) => {
                console.log(erro);
                res.send( { msg: "Ocorreu um erro na inclusão!", sucesso : false });
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
