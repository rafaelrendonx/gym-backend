const mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    password: String,
    correo: String,
})

usuariosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
    }
})

module.exports = mongoose.model('Usuarios', usuariosSchema)