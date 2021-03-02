const Usuarios = require('../models/Usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarUsuario = async (req,res) => {
    const usuario = new Usuarios(req.body)
    usuario.password = await bcrypt.hash(req.body.password,12)

    try{    
        await usuario.save()
        res.json({mensaje:'Usuario creado correctamente'})
    }catch(e){
        console.log(e)
        res.json({mensaje:'Hubo un error'})
    }
}

exports.autenticarUsuario = async (req,res,next) => {
    const usuario = await Usuarios.findOne({email:req.body.email})

    if(!usuario){
        await res.status(401).json({mensaje:'Ese usuario no existe'})
        next()
    }else{
        if(!bcrypt.compareSync(req.body.password,usuario.password)){
            await res.status(401).json({mensaje:'password incorrecto'})
        }else{
            const token = jwt.sign({
                email: usuario.email,
                usuario: usuario.nombre,
                _id: usuario._id
            },'LLAVESECRETA',
            {
                expiresIn: '5h'
            })
            
            res.json({token})
        }
    }
}