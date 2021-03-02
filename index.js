const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// cors allows a client connect to another server for resource exchange
const cors = require('cors')
require('dotenv').config({
    path:'variables.env'
})

// connect with mongo
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// create the server
const app = express()

// enable body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// definir dominios para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin,callback){
        // revisar si la peticion viene de la whitelist
        const existe = whitelist.some(dominio => dominio === origin)
        if(existe){
            callback(null,true)
        } else{
            callback(new Error('No permitido por cors'))
        }
    }
}

// enable cors
app.use(cors(corsOptions))

// app routes
app.use('/',routes())

// public files
app.use(express.static('uploads'))

// port
app.listen(5000)