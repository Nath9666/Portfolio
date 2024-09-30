const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// Charger le fichier WOFF2 en tant que base64
const fontPath = path.join(__dirname, "../../src/Assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath, "base64");
const fontPathBold = path.join(__dirname, "../../src/Assets/Roboto-Bold.ttf");
const fontDataBold = fs.readFileSync(fontPathBold, "base64");
const fontPathItalic = path.join(__dirname, "../../src/Assets/Roboto-Italic.ttf");
const fontDataItalic = fs.readFileSync(fontPathItalic, "base64");

// Charger et parser le fichier JSON
const jsonPath = path.join(__dirname, "./json/general.json");
const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const title = (doc, text, x, y, option) => {
  doc.setFontSize(15);
  doc.text(text, x, y, option);
};

const text = (doc, text, x, y, option, fontSize = 12) => {
  doc.setFontSize(fontSize);
  doc.text(text, x, y, option);
};

const generatePDF = () => {
  const doc = new jsPDF();

  // Ajouter la police personnalisée
  doc.addFileToVFS("Roboto-Regular.ttf", fontData);
  doc.addFileToVFS("Roboto-Bold.ttf", fontDataBold);
  doc.addFileToVFS("Roboto-Italic.ttf", fontDataItalic);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFont("Roboto-Bold.ttf", "Robot", "bold");
  doc.addFont("Roboto-Italic.ttf", "Robo", "italic");

  doc.setFont("Roboto");

  // Définir les dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const mid = pageWidth / 2;
  console.log(pageWidth, pageHeight, mid);

  // Définir les couleurs
  const primary = "#1d1950";
  const secondary = "#5f90f8";
  const whiteColor = "#FFFFFF";
  const blackColor = "#000000";
  const greyColor = "#808080";

  // Définir les marges
  const pageMarginLeft = 5;
  const pageMarginTop = 20;
  const pageMarginBottom = 20;
  const paragraphMargin = 20;
  const lineMargin = 8;

  // Ajouter le contenu de la première colonne
  doc.setTextColor(blackColor);
  doc.text(jsonData.nom, pageMarginLeft, pageMarginTop, { align: "left" });

  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./pdf/LM.pdf");

  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
