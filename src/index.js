
//Almacenar express dentro de la variable
const express = require('express');
//Almacenar mongoose dentro de la variable
const mongoose = require('mongoose');

//ejecutar express
const app = express();
require("dotenv").config();

//direccion de usuario
const usuarios = require("./routes/usuario")
//direccion de productos
const productos = require("./routes/productos")


const ventas = require("./routes/ventas")

const swaggerui = require("swagger-ui-express")
const swaggerjsdoc = require("swagger-jsdoc")
const path = require("path")


//Configurar el puerto (puede ser cualquier servidor)

const port = 5500;
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method' );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

})

const swaggerspec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion de servicios Rest Gameplay - Certus",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:5500"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}


app.get("/inicio", (req, res) => {
    res.send("Prueba de nodejs en el servidor");
})
//se agrega el Usuarios
app.use("/place", usuarios)

//se agrega el Productos
app.use("/place", productos)

//se agrega el ventas
app.use("/place", ventas)

//se agrega el swagger
app.use("/app-doc", swaggerui.serve, swaggerui.setup(swaggerjsdoc(swaggerspec)))



//conexion a mongo db atlas
mongoose.connect(process.env.mongodb_usuario)
    .then(() => console.log("Conexion a mongoAtlas satisfactorio"))
    //mostrar error
    .catch((error) => console.log(error))

//mostrar mensajes por consola
app.listen(port, () => console.log("Servidor esuchando en el puerto: ", port));