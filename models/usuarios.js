const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const usuariosSchema = new mongoose.Schema({
    nombre: String,
    password: String,
    correo: String,
    salt: String,
})

usuariosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
    }
})

usuariosSchema.methods.encryptString = function (stringToEncrypt, salt) {
    return crypto
        .pbkdf2Sync(stringToEncrypt, salt, 10000, 512, "sha512")
        .toString("hex");
};

usuariosSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = this.encryptString(password, this.salt);
};

usuariosSchema.methods.verifyPassword = function (password) {
    return this.password === this.encryptString(password, this.salt);
};

usuariosSchema.methods.generateJWT = function () {
    return jwt.sign({ idUser: this._id, tipo: this.tipo }, process.env.SECRET);
};

usuariosSchema.methods.onSingGenerateJWT = function () {
    return {
        idUser: this._id,
        tipo: this.tipo,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Usuarios', usuariosSchema)