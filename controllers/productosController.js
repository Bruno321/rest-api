const Productos = require('../models/Productos')

const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,__dirname+'../../uploads/')
        },
        filename:(req,file,cb)=>{
            const extension = file.mimetype.split('/')[1]
            cb(null,`${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        } else {
            cb(new Error('Formato no valido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen')

// uploads a file
exports.subirArchivo = (req,res,next)=>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next()
    })
}

// add new products
exports.nuevoProducto = async (req,res,next)=>{
    const producto = new Productos(req.body)

    try{
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje:'Se agrego un nuevo producto'})
    }catch (e){
        console.log(e)
        next()
    }
}

// show all the products
exports.mostrarProductos = async (req,res,next)=>{
    try{
        const productos = await Productos.find({})
        res.json(productos)
    }catch(e){
        console.log(e)
        next()
    }
}

// show one particular product (ID)
exports.mostrarProducto = async (req,res,next)=>{
    try{
        const producto = await Productos.findById(req.params.idProducto)
        res.json(producto)

    }catch(e){
        res.json({mensaje:'Ese producto no existe'})
        return next()
    }
}

// update product
exports.actualizarProducto = async (req,res,next)=>{
    try{

        let nuevoProducto = req.body

        if(req.file){
            nuevoProducto.imagen = req.file.filename
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen
        }

        let producto = await Productos.findOneAndUpdate({_id:req.params.idProducto},
        nuevoProducto,{
            new: true,
        })

        res.json(producto)

    }catch(e){
        console.log(e)
        next()
    }
}

// delete a product
exports.eliminarProducto = async (req,res,next)=>{
    try{
        await Productos.findOneAndDelete({_id:req.params.idProducto})
        res.json({mensaje:'El producto se a eliminado'})
    }catch(e){
        console.log(e)
        next()
    }
}

exports.buscarProducto = async(req,res,next)=>{
    
    try{

        const {query} = req.params
        const producto = await Productos.find({nombre:new RegExp(query,'i')})

        res.json(producto)
    }catch(e){
        console.log(e)
        next()
    }
}