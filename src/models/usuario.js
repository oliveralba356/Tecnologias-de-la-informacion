const mongoose = require('mongoose')


const userModel = mongoose.Schema ({
nombre: {
type: String,
required: true
},
apellido: {
    type: String,
    required: true
    },
    correo: {                                           
        type: String,
        required: true
        },
        edad: {
            type: Number,
            required: true
            },
            password: {
                type: String,
                required: true
            },

});

module.exports = mongoose.model("usuario", userModel)