if(process.env.NODE_ENV == 'production'){
    module.exports = { mongoURI : "mongodb+srv://usuarioadmin:9u0TBnoFXmgqwttC@receita0.zjxxt2t.mongodb.net/?retryWrites=true&w=majority"}
}else{
    module.exports = { mongoURI : "mongodb://localhost:27017/receita"}
}