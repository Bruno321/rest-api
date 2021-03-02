const Clientes = require('../models/Clientes')

// add a new client
exports.nuevoCliente = async (req,res,next) => {

    const cliente = new Clientes(req.body)

    try{
        // save the data
        await cliente.save()
        res.json({ mensaje: 'Se agrego un nuevo cliente' })

    } catch(error){
        console.log(error)
        next()
    }
}

// show all clients
exports.mostrarClientes = async (req,res,next)=>{
    try{
        const clientes = await Clientes.find({})
        res.json(clientes)

    } catch (error){
        console.log(error)
        next()
    }
}

// show one particular client (ID)
exports.mostrarCliente = async (req,res,next)=>{
    const cliente = await Clientes.findById(req.params.idCliente)

    if(!cliente){
        res.json({mensaje:'Ese cliente no existe'})
        next()
    }

    // show the client
    res.json(cliente)
}

// update client
exports.actualizarCliente = async (req,res,next)=>{
    try{
        const cliente = await Clientes.findOneAndUpdate({_id:req.params.idCliente},req.body,{
            new: true
        })
        // brings the updated info
        res.json(cliente)

    }catch(error){
        res.send(error)
        next()
    }
}

// delete client
exports.eliminarCliente = async (req,res,next)=>{
    try{
        await Clientes.findOneAndDelete({_id: req.params.idCliente})
        res.json({mensaje: 'El cliente ha sido eliminado'})
    } catch(error){
        res.send(error)
        next()
    }
}