import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "" },
  skills: { type: [String], default: [] },
  interests: { type: String, required: true },
  career: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
