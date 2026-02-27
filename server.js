import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Gemini API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🚀 Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;

    res.json({ reply: response.text() });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Root test
app.get("/", (req, res) => {
  res.send("AI Agent Running 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));