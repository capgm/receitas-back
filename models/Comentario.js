const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Favorito = new Schema({
    id_usuario:{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',  required: true},
    id_receita: { type: mongoose.Schema.Types.ObjectId, ref: 'Receita', required: true },
    comentario: { type: String, required : true},
    rating : {type: Number},
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("favoritos", Favorito)