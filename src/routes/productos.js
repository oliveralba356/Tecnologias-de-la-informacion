const express = require("express");
const router = express.Router();
const productModel = require("../models/productos")

/** 
 * @swagger
 * components:
 *  schemas:
 *      product:
 *          type: object
 *          properties:
 *              arcade:
 *                  type: String
 *                  description: Juego de arcade
 *              accion:
 *                  type: String
 *                  description: Juego accion
 *              aventura:
 *                  type: tring
 *                  description: Juego aventura
 *              deportes:
 *                  type: String
 *                  description: Juego deportes
 *              estrategia:
 *                  type: String
 *                  description: Juego Estrategia
 *              simulacion:
 *                  type: String
 *                  description: Juego Simulacion
 *          required:
 *              - arcade
 *              - accion
 *              - aventura
 *              - deportes
 *              - estrategia
 *              - simulacion
 *          example:
 *              arcade: Mario
 *              accion: Left 4 dead
 *              aventura: Buscaminas
 *              deportes: Fifa
 *              estrategia: Dota 2
 *              simulacion: Realidad Virtual
 *              
 * 
*/

/**
 * @swagger
 * /place/productos:
 *  post:
 *      summary: Guardar informacion de Productos
 *      tags: [product]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/product'
 *      responses:
 *          200:
 *              description: Operacion correcta
 *          201:
 *              description: El objeto producto fue creado correctamente
 *          404:
 *              description: Objeto Inexistente
 *          500:
 *              description: Error en el servidor
 * 
 * 
 * 
 * 
 */





router.post("/productos", (req, res) => {
    const productos = productModel(req.body);

    productos.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))


});
/**
 * @swagger
 * /place/productos:
 *  get:
 *      summary: Listar productos disponibles
 *      tags: [product]
 *      responses:
 *        200:
 *          description: Se listan todos los productos
 *        500:
 *          description: Error en el servidor
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/product'
 *       
 * 
 * 
 * 
 */


router.get("/productos", (req, res) => {
    // const { id } = req.params;
    productModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/productos/{id}:
 *  get:
 *      summary: Listar productos disponibles
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID del Producto
 *      responses:
 *          200:
 *             description: Se lista el producto buscado
 *          404:
 *             description: El producto buscado no existe
 *             content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/product'
 * 
 * 
 * 
 * 
 */
router.get("/productos/:id", (req, res) => {
    const { id } = req.params;
    productModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/productos/{id}:
 *  put:
 *      summary: Actualizar productos
 *      description: Esta api esta siendo usada con datos de MongoDB
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID del Producto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/product'
 *          responses:
 *              200:
 *                  description: Actualizacion correcta
 *                  content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/product'
 *                      
 *     
 *            
 * 
 * 
 * 
 * 
 */

router.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { arcade, accion, aventura, deportes, estrategia, simulacion } = req.body;

    productModel
        .updateOne({ _id: id }, { $set: { arcade, accion, aventura, deportes, estrategia, simulacion } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/productos/{id}:
 *  delete:
 *      summary: Eliminar Productos
 *      tags: [product]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID del producto a eliminar
 *      responses:
 *          200:
 *              description: Producto Eliminado
 *          404:
 *              description: No se encontro el producto
 * 
 * 
 */
router.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    productModel.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))

});


module.exports = router;