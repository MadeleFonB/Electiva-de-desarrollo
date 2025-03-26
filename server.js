import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger.js";


dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/movies", movieRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/auth", authRoutes);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
console.log("Esta documentación esta disponible en http://localhost:5001/docs");


app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("💥 Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error al conectar MongoDB:", err);
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
