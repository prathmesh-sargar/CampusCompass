import { GoogleGenerativeAI } from '@google/generative-ai'

// 🔹 Compare AI Answer & User Answer for Feedback
export const generateAIAnalysis = async (question, aiAnswer, userAnswer) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY1);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Compare the correct answer: "${aiAnswer}" with the user's answer: "${userAnswer}". 
  Provide structured feedback in 2-3 sentences and a score out of 10.
  Response format: { "feedback": "...", "score": "..." }`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = result.response.text().trim();

    if (responseText.startsWith("```json")) {
      responseText = responseText.replace(/```json/, "").replace(/```/, "").trim();
    }

    let parsed = JSON.parse(responseText);

    // ✅ Sanitize score (handle formats like "8/10" or "Score: 7")
    let score = parsed.score;
    if (typeof score === "string") {
      const match = score.match(/\d+(\.\d+)?/); // extract numeric part
      score = match ? parseFloat(match[0]) : 0;
    }

    // Clamp between 0–10 for safety
    if (score > 10) score = 10;
    if (score < 0) score = 0;

    return { feedback: parsed.feedback, score };
  } catch (error) {
    console.error("Error generating AI feedback:", error);
    return { feedback: "AI feedback failed.", score: 0 };
  }
};



