import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate("director");
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("director");
    if (!movie) return res.status(404).json({ message: "Película no encontrada" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Película eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
