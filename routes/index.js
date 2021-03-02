const express = require('express')
const router = express.Router()

const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

const auth = require('../middleware/auth')

module.exports = function(){
    
    // add new client by POST
    router.post('/clientes',
        auth,
        clienteController.nuevoCliente
    )

    // get all clients
    router.get('/clientes',
        auth,
        clienteController.mostrarClientes
    )

    // show one particular client (ID)
    router.get('/clientes/:idCliente', 
        auth,
        clienteController.mostrarCliente
    )

    // update client
    router.put('/clientes/:idCliente',
        auth,
        clienteController.actualizarCliente
    )

    // delete client
    router.delete('/clientes/:idCliente',
        auth,
        clienteController.eliminarCliente
    )

    // create a new product
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto
    )

    // show all the products
    router.get('/productos',
        auth,
        productosController.mostrarProductos
    )

    // show one particular product (ID)
    router.get('/productos/:idProducto',
        auth,
        productosController.mostrarProducto
    )

    // update a product
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto
    )

    // delete a product
    router.delete('/productos/:idProducto',auth,productosController.eliminarProducto)

    // search a product
    router.post('/productos/busqueda/:query',auth,productosController.buscarProducto)

    // add a new order
    router.post('/pedidos/nuevo/:idUsuario',auth,pedidosController.nuevoPedido)

    // show all the orders
    router.get('/pedidos',auth,pedidosController.mostrarPedidos)

    // show an order by id
    router.get('/pedidos/:idPedido',auth,pedidosController.mostrarPedido)

    // update order
    router.put('/pedidos/:idPedido',auth,pedidosController.actualizarPedido)

    // delete order
    router.delete('/pedidos/:idPedido',auth,pedidosController.eliminarPedido)

    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    )

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    )

    return router
}