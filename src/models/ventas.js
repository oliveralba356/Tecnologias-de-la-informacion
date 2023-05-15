const mongoose = require('mongoose')


const ventasModel = mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    descuento: {
        type: String,
        required: true
    },
    cant_desc: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model("ventas", ventasModel)