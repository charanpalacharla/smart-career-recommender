import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Simple AI-like suggestion function
const suggestCareer = (skills = [], interests = "") => {
  const text = (skills.join(" ") + " " + interests).toLowerCase();

  if (text.match(/\b(html|css|javascript|react|frontend)\b/)) return "Frontend Developer 🌐";
  if (text.match(/\b(node|express|backend|api|server)\b/)) return "Backend Developer ⚙️";
  if (text.match(/\b(mongo|mysql|sql|database|nosql)\b/)) return "Database Engineer 🗄️";
  if (text.match(/\b(python|data|pandas|analysis)\b/)) return "Data Analyst 📊";
  if (text.match(/\b(ml|machine learning|ai|tensorflow)\b/)) return "Machine Learning Engineer 🤖";
  if (text.match(/\b(design|ui|ux|figma)\b/)) return "UI/UX Designer 🎨";
  if (text.match(/\b(cloud|aws|azure|devops)\b/)) return "Cloud / DevOps Engineer ☁️";
  return "Software Developer (General) 💻";
};

// POST /api/users/recommend — receives { name, email, skills[], interests }
router.post("/recommend", async (req, res) => {
  try {
    const { name, email = "", skills = [], interests = "" } = req.body;
    const career = suggestCareer(skills, interests);

    const user = new User({ name, email, skills, interests, career });
    await user.save();

    res.json({ name, recommendedCareer: career, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// optional: get last 50 entries
router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(50);
  res.json(users);
});

export default router;
