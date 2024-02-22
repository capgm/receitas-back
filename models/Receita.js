const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Receita = new Schema({
    nome:{
        type: String,
        required: true
    },
    id_categoria:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria',  required: true},
    ingredientes:{
        type: String,
        required: true
    },
    modoPreparo:{
        type: String,
        required: true
    },
    urlImgaem:{
        type: String,
        required: false
    },
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("receitas", Receita)