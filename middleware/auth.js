const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const authHeader = req.get('Authorization')

    if(!authHeader){
        const error = new Error('No autenticado, ho hay jwt')
        error.statusCode = 401
        throw error
    }

    const token = authHeader.split(' ')[1]
    let revisarToken

    try{
        revisarToken = jwt.verify(token,'LLAVESECRETA')

    }catch(e){
        e.statusCode = 500
        throw e
    }

    if(!revisarToken){
        const error = new Error('No autenticado')
        error.statusCode = 401;
        throw error
    }

    next()
}