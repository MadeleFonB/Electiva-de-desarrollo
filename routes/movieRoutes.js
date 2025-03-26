import express from "express";
import Movie from "../models/Movie.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para la gestión de películas
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Obtener todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Error al obtener películas
 */
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("director");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al obtener películas" });
  }
});

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a buscar
 *     responses:
 *       200:
 *         description: Datos de la película obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error al buscar película
 */
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("director");
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al buscar película" });
  }
});

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Crear una nueva película
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Película creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Error en la creación de la película
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    const savedMovie = await Movie.findById(movie._id).populate("director");
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al crear película" });
  }
});

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Actualizar una película por ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Película actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Película no encontrada
 *       400:
 *         description: Error en la actualización
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("director");
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error al actualizar película" });
  }
});

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Eliminar una película por ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada correctamente
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error al eliminar película
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error al eliminar película" });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - releaseDate
 *         - director
 *       properties:
 *         id:
 *           type: string
 *           example: "6604f8c1e1b2a"
 *         title:
 *           type: string
 *           example: "Interstellar"
 *         releaseDate:
 *           type: string
 *           format: date
 *           example: "2014-11-07"
 *         director:
 *           type: string
 *           example: "6604f8c1e1b2b" 
 */

export default router;
