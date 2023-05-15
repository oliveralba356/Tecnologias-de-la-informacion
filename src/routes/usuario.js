const express = require("express");
const router = express.Router();
const userModel = require("../models/usuario")


/** 
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: String
 *                  description: Nombre Usuario
 *              apellido:
 *                  type: String
 *                  description: Apellido Usuario
 *              correo:
 *                  type: tring
 *                  description: Correo Usuario
 *              edad:
 *                  type: String
 *                  description: Edad Usuario
 *              password:
 *                  type: String
 *                  description: Contraseña Usuario
 *          required:
 *              - nombre
 *              - apellido
 *              - correo
 *              - edad
 *              - password
 *          example:
 *              nombre: Julio Cesar
 *              apellido: Alegre
 *              correo: Unknow@certus.edu.pe
 *              edad: 19
 *              password: pass2022
 *              
 * 
*/

/**
 * @swagger
 * /place/usuarios:
 *  post:
 *      summary: Guardar informacion de Usuarios
 *      tags: [user]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/user'
 *      responses:
 *          200:
 *              description: Operacion correcta
 *          201:
 *              description: El usuario fue creado correctamente
 *          404:
 *              description: Usuario Inexistente
 *          500:
 *              description: Error en el servidor
 * 
 * 
 * 
 * 
 */

router.post("/usuarios", (req, res) => {
    const usuario = userModel(req.body);

    usuario.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

    /**
     * @swagger
     * /place/usuarios:
     *  get:
     *      summary: Listar usuarios disponibles
     *      tags: [user]
     *      responses:
     *        200:
     *          description: Se listan todos los usuarios
     *        500:
     *          description: Error en el servidor
     *          content: 
     *              application/json:
     *                  schema:
     *                      type: array
     *                      items:
     *                          $ref: '#components/schemas/user'
     *       
     * 
     * 
     * 
     */
});

router.get("/usuarios", (req, res) => {
    // const { id } = req.params;
    userModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /place/usuarios/{id}:
 *  get:
 *      summary: Listar usuarios disponibles
 *      tags: [user]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID del Usuario
 *      responses:
 *          200:
 *             description: Se lista el usuario buscado
 *          404:
 *             description: El usuario buscado no existe
 *             content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/user'
 * 
 * 
 * 
 * 
 */

router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    userModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

/**
 * @swagger
 * /place/usuarios/{id}:
 *  put:
 *      summary: Actualizar Usuarios
 *      description: Esta api esta siendo usada con datos de MongoDB
 *      tags: [user]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID del Usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/user'
 *          responses:
 *              200:
 *                  description: Actualizacion correcta
 *                  content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/user'
 *                      
 *     
 *            
 * 
 * 
 * 
 * 
 */

router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, edad, password } = req.body;

    userModel
        .updateOne({ _id: id }, { $set: { nombre, apellido, correo, edad, password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/usuarios/{id}:
 *  delete:
 *      summary: Eliminar Usuarios
 *      tags: [user]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID del Usuario a eliminar
 *      responses:
 *          200:
 *              description: Usuario Eliminado
 *          404:
 *              description: No se encontro el Usuario
 * 
 * 
 */
router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    userModel.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

});


module.exports = router;