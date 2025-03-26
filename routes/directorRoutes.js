import express from "express";
import Director from "../models/Director.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Directores
 *   description: Endpoints para la gestión de directores de cine
 */

/**
 * @swagger
 * /api/directors:
 *   get:
 *     summary: Obtener todos los directores
 *     tags: [Directores]
 *     responses:
 *       200:
 *         description: Lista de directores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Director'
 *       500:
 *         description: Error al obtener directores
 */
router.get("/", async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al obtener directores" });
  }
});

/**
 * @swagger
 * /api/directors/{id}:
 *   get:
 *     summary: Obtener un director por ID
 *     tags: [Directores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director a buscar
 *     responses:
 *       200:
 *         description: Datos del director obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 *       500:
 *         description: Error al buscar director
 */
router.get("/:id", async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al buscar director" });
  }
});

/**
 * @swagger
 * /api/directors:
 *   post:
 *     summary: Crear un nuevo director
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Director'
 *     responses:
 *       201:
 *         description: Director creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       400:
 *         description: Error en la creación del director
 *       500:
 *         description: Error del servidor
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al crear director" });
  }
});

/**
 * @swagger
 * /api/directors/{id}:
 *   put:
 *     summary: Actualizar un director por ID
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Director'
 *     responses:
 *       200:
 *         description: Director actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 *       400:
 *         description: Error en la actualización
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.json(director);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al actualizar director" });
  }
});

/**
 * @swagger
 * /api/directors/{id}:
 *   delete:
 *     summary: Eliminar un director por ID
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del director a eliminar
 *     responses:
 *       200:
 *         description: Director eliminado correctamente
 *       404:
 *         description: Director no encontrado
 *       500:
 *         description: Error al eliminar director
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director no encontrado" });
    }
    res.json({ message: "Director eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al eliminar director" });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Director:
 *       type: object
 *       required:
 *         - name
 *         - birthDate
 *       properties:
 *         id:
 *           type: string
 *           example: "6604f8c1e1b2a"
 *         name:
 *           type: string
 *           example: "Madeleine Fonseca"
 *         birthDate:
 *           type: string
 *           format: date
 *           example: "1970-07-30"
 */

export default router;
