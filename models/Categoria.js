const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Categoria = new Schema({
    categoria:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria)