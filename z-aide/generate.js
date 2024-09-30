require('dotenv').config();
const { OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");

//? recuperer les entreprises qui ont besoin de stagiaires via json



//? demander à chat de generer
// une lettre de motivation suivant le model que l'on a fait
// le cv qui correspond au mieux
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


//? generer les json
// generer le json du cv
// generer le json de la lettre de motivation

//? mettre a jour le json entreprises