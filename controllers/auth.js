const authRouter = require('express').Router()
const Usuarios = require('../models/usuarios')

authRouter.post("/register", async (request, response) => {

    try {
        const { password } = request.body;
        delete request.body.password;

        const usuario = new Usuarios({
            ...request.body,
        });

        usuario.hashPassword(password)
        await usuario.save()

        return response.status(201).json({
            mensaje: "Usuario Registrado",
            detalles: {
                userId: usuario._id,
                token: usuario.generateJWT(),
            }
        })
    }
    catch (e) {
        console.log(e.message)
        return response.status(500).json({
            mensaje: "Error",
            detalles: "Error Register",
        })
    }
})

authRouter.post("/login", async (request, response) => {

    try {
        const { correo, password } = request.body
        const usuario = Usuarios.findOne({ correo })

        if (!usuario) {
            return response.status(404).json({
                mensaje: "Usuario no encontrado",
            })
        }

        if (usuario.verifyPassword(password)) {
            return response.status(200).json({
                mensaje: "Usuario Logeado",
                detalles: {
                    userId: usuario._id,
                    token: usuario.generateJWT(),
                }
            })
        }

        return response.status(400).json({
            mensaje: "Password Incorrecto",
        })
    }
    catch (e) {
        console.log(e.message)
        return response.status(500).json({
            mensaje: "Error",
            detalles: "Error Login",
        });
    }
})

module.exports = authRouter