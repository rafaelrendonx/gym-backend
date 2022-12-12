const mongoose = require('mongoose')

const calisteniaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
})

calisteniaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Calistenia', calisteniaSchema)