const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// Charger le fichier WOFF2 en tant que base64
const fontPath = path.join(__dirname, "./src/Assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath, "base64");

// Charger et parser le fichier JSON
const jsonPath = path.join(__dirname, "./generate.json");
const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const title = (doc, text, x, y, option) => {
  doc.setFontSize(15);
  doc.text(text, x, y, option);
};

const text = (doc, text, x, y, option) => {
  doc.setFontSize(12);
  doc.text(text, x, y, option);
};

const generatePDF = () => {
  const doc = new jsPDF();

  // Ajouter la police personnalisée
  doc.addFileToVFS("Roboto-Regular.ttf", fontData);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  // Définir les dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const col1Width = pageWidth / 3;
  const col2Width = (pageWidth / 3) * 2;

  // Définir les couleurs
  const blueColor = "#87CEFA";
  const whiteColor = "#FFFFFF";

  // Dessiner les rectangles de fond
  doc.setFillColor(blueColor);
  doc.rect(0, 0, col1Width, pageHeight, "F");

  doc.setFillColor(whiteColor);
  doc.rect(col1Width, 0, col2Width, pageHeight, "F");

  // Ajouter le contenu de la première colonne
  doc.setTextColor(whiteColor);
  doc.setFontSize(24);
  doc.text(jsonData.nom, col1Width / 2, 20, { align: "center" });

  title(doc, "Coordonnées", col1Width / 2, 40, { align: "center" });
  text(doc, `Téléphone: ${jsonData.telephone}`, 10, 50, { align: "left" });
  text(doc, `Email: ${jsonData.email}`, 10, 60, { align: "left" });

  title(doc, "Savoir-être", col1Width / 2, 75, { align: "center" });
  jsonData["savoir-etre"].forEach((item, index) => {
    text(doc, `- ${item}`, 10, 85 + index * 10, { align: "left" });
  });

  title(doc, "Langues", col1Width / 2, 145, { align: "center" });
  jsonData.langues.forEach((langue, index) => {
    text(doc, `- ${langue.langue} (${langue.niveau})`, 10, 155 + index * 10, {
      align: "left",
    });
  });

  title(doc, "Passions", col1Width / 2, 195, { align: "center" });
  jsonData.passions.forEach((passion, index) => {
    text(doc, `- ${passion}`, 10, 205 + index * 10, { align: "left" });
  });

  title(doc, "Sports", col1Width / 2, 265, { align: "center" });
  jsonData.sport.forEach((sport, index) => {
    text(doc, `- ${sport}`, 10, 275 + index * 10, { align: "left" });
  });

  // Ajouter le contenu de la deuxième colonne
  doc.setTextColor("black");
  title(doc, "Expériences Professionnelles", col1Width + 10, 20, {
    align: "left",
  });
  // Ajoutez ici les détails de l'expérience professionnelle

  title(doc, "Formation", col1Width + 10, 100, { align: "left" });
  // Ajoutez ici les détails de la formation

  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./src/Assets/NathanMorel.pdf");

  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
