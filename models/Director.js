import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  birthYear: { 
    type: Number, 
    required: true 
  },
  nationality: { 
    type: String, 
    required: true 
  }
});

export default mongoose.model("Director", directorSchema);
