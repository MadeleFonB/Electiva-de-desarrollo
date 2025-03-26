import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  genre: { 
    type: String, 
    required: true 
  },
  releaseYear: { 
    type: Number, 
    required: true 
  },
  director: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Director" 
  }
});

export default mongoose.model("Movie", movieSchema);
