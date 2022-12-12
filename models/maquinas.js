const mongoose = require('mongoose')

const maquinasSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
})

maquinasSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Maquinas', maquinasSchema)