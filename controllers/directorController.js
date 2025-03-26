import Director from "../models/Director.js";

export const createDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
