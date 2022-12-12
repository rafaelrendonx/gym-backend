const mongoose = require('mongoose')

const pesasSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
})

pesasSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Pesas', pesasSchema)