const mongoose = require('mongoose')


const productModel = mongoose.Schema ({
arcade: {
type: String,
required: true
},
accion: {
    type: String,
    required: true
    },
    aventura: {
        type: String,
        required: true
        },
        deportes: {
            type: String,
            required: true
            }, 
            estrategia: {
                type: String,
                required: true
                },   
                simulacion: {
                    type: String,
                    required: true
                    },
});

module.exports = mongoose.model("productos", productModel)