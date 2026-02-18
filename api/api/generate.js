import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { title, theme } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    You are a professional social media designer.

    Create a visually powerful Instagram Reel thumbnail concept.

    Title: ${title}
    Theme: ${theme}

    Include:
    - Bold headline style
    - Color palette
    - Font suggestion
    - Layout positioning for 1080x1920 (9:16)
    - CTA suggestion
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({ result: text });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
