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