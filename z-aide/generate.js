require('dotenv').config();
const { OpenAI } = require("openai");

console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCompletion() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es un etudiant en étude d'ingénerie informatique spé en IRV, cherchant stage de 6 mois pour debut mars 2024" },
        { role: "user", content: "" },
      ],
    });

    console.log(completion.choices[0].message);
  } catch (error) {
    console.error("Erreur lors de la génération de la complétion:", error);
  }
}

generateCompletion();
