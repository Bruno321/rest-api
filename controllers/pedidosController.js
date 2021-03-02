const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req,res,next)=>{

    console.log(req.body)

    const pedido = new Pedidos(req.body)

    console.log(pedido)

    try{
        await pedido.save()
        res.json({mensaje:'Se agrego tu pedido'})
    }catch(e){  
        console.log(e)
        next()
    }
}

// show all the orders
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// show an order by id
exports.mostrarPedido = async (req,res,next)=>{
    try{
        const pedido = await Pedidos.findById(req.params.idPedido)
        res.json(pedido)
    }catch(e){
        res.json({mensaje:'Ese pedido no existe'})
        next()
    }
}

// update order
exports.actualizarPedido = async (req,res,next)=>{
    try{
        let pedido = await Pedidos.findOneAndUpdate({_id:req.params.idPedido}, req.body,{
            new: true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model: 'Productos'
        })
        res.json(pedido)
    }catch(e){
        console.log(e)
        next()
    }
}

// delete order
exports.eliminarPedido = async (req,res,next)=>{
    try{
        await Pedidos.findOneAndDelete({_id:req.params.idPedido})
        res.json({mensaje:'El pedido se ha eliminado'})
    }catch(e){
        console.log(e)
        next()
    }
}
   