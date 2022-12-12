const Usuarios = require("../models/usuarios")

const register = async () => {
    const { nombre, correo, password } = req.body

}

const login = async (req, res) => {
    const { correo, password } = req.body

    try {
        const usuario = await Usuarios.findOne({ correo })

        if (!usuario) {
            return res.status(400).json({
                mensaje: "Usuario no encontrado",
            })
        }
        
        const validPassword = () => {
            return password === usuario.password
        }

        if (!validPassword) {
            return res.status(400).json({
                mensaje: "Password Incorrecto",
            })
        }

        res.json({
            mensaje: "Ok, usuario logeado"
        })


    } catch (error) {
        console.log(error)
    }
}