require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

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