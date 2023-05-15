const express = require("express");
const router = express.Router();
const ventasModel = require("../models/ventas")
/** 
 * @swagger
 * components:
 *  schemas:
 *      ventas:
 *          type: object
 *          properties:
 *              producto:
 *                  type: String
 *                  description: Nombre del producto
 *              cantidad:
 *                  type: integer
 *                  description: Cantidad de productos
 *              descuento:
 *                  type: double
 *                  description: Descuento a recibir
 *              cant_descuento:
 *                  type: double
 *                  description: Cantidad con el descuento
 *              precio:
 *                  type: double
 *                  description: Precio total
 *          required:
 *              - producto
 *              - cantidad
 *              - descuento
 *              - cant_descuento
 *              - precio
 *          example:
 *              producto: Play Station 4 
 *              cantidad: 2
 *              descuento: 30.00
 *              cant_descuento: 10.00
 *              precio: 4000.00
 *              
 * 
*/
/**
 * @swagger
 * /place/ventas:
 *  post:
 *      summary: Guardar informacion de las ventas
 *      tags: [ventas]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#components/schemas/ventas'
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
router.post("/ventas", (req, res) => {
    const ventas = ventasModel(req.body);

    ventas.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))


});
/**
 * @swagger
 * /place/ventas:
 *  get:
 *      summary: Listar ventas disponibles
 *      tags: [ventas]
 *      responses:
 *        200:
 *          description: Se listan todos las ventas hechas
 *        500:
 *          description: Error en el servidor
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/ventas'
 *       
 * 
 * 
 * 
 */
router.get("/ventas", (req, res) => {
    ventasModel.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/ventas/{id}:
 *  get:
 *      summary: Listar ventas disponibles
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID de la venta
 *      responses:
 *          200:
 *             description: Se lista las ventas solicitadas
 *          404:
 *             description: La venta solicitada no existe
 *             content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/ventas'
 * 
 * 
 * 
 * 
 */
router.get("/ventas/:id", (req, res) => {
    const { id } = req.params;
    ventasModel.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});
/**
 * @swagger
 * /place/ventas/{id}:
 *  put:
 *      summary: Actualizar ventas
 *      description: Esta api esta siendo usada con datos de MongoDB
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: String
 *            require: true
 *            description: ID de la venta
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/ventas'
 *          responses:
 *              200:
 *                  description: Actualizacion correcta
 *                  content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/ventas'
 *                      
 *     
 *            
 * 
 * 
 * 
 * 
 */
router.put("/ventas/:id", (req, res) => {
    const { id } = req.params;
    const { producto, cantidad, descuento, cant_desc, precio } = req.body;

    ventasModel
        .updateOne({ _id: id }, { $set: { producto, cantidad, descuento, cant_desc, precio } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
        console.log("funcionando")
});
/**
 * @swagger
 * /place/ventas/{id}:
 *  delete:
 *      summary: Eliminar ventas
 *      tags: [ventas]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: ID de la venta a eliminar
 *      responses:
 *          200:
 *              description: Venta Eliminada
 *          404:
 *              description: No se encontro la venta solicitada
 * 
 * 
 */

router.delete("/ventas/:id", (req, res) => {
    const { id } = req.params;
    ventasModel.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))

});


module.exports = router;