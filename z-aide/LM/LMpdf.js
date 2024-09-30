const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Charger le fichier WOFF2 en tant que base64
const fontPath = path.join(__dirname, "../../src/Assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath, "base64");
const fontPathBold = path.join(__dirname, "../../src/Assets/Roboto-Bold.ttf");
const fontDataBold = fs.readFileSync(fontPathBold, "base64");
const fontPathItalic = path.join(
  __dirname,
  "../../src/Assets/Roboto-Italic.ttf"
);
const fontDataItalic = fs.readFileSync(fontPathItalic, "base64");

// Charger et parser le fichier JSON
const jsonPath = path.join(__dirname, "./json/general.json");
const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const jsonPathLettre = path.join(__dirname, "./json/LM1.json");
const jsonDataLettre = JSON.parse(fs.readFileSync(jsonPathLettre, "utf8"));

// Définir les variables
const indexAdresse = 1;
const indexMail = "efrei";
const internationnal = false;

const text = (doc, text, x, y, option, fontSize = 12) => {
  doc.setFontSize(fontSize);
  doc.text(text, x, y, option);
};

const addParagraph = (doc, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";
  let testLine = "";
  let lineArray = [];
  let testWidth = 0;
  doc.setFontSize(12);

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + " ";
    testWidth = doc.getTextWidth(testLine);
    if (testWidth > maxWidth && n > 0) {
      lineArray.push(line);
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lineArray.push(line);

  for (let k = 0; k < lineArray.length; k++) {
    doc.text(lineArray[k], x, y + k * lineHeight, { align: "justify" });
  }

  return y + lineArray.length * lineHeight;
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
  const blackColor = "#000000";

  // Définir les marges
  const pageMarginLeft = 25;
  const pageMarginTop = 25;
  const pageMarginBottom = 25;
  const paragraphMargin = 15;
  const lineMargin = 6;

  //? Ajouter le header
  // Ajout de mes informations
  doc.setTextColor(blackColor);
  text(doc, jsonData.nom, pageMarginLeft, pageMarginTop, { align: "left" });
  // Ajout de mon adresse
  text(
    doc,
    jsonData.adresse[indexAdresse].numero +
      " " +
      jsonData.adresse[indexAdresse].rue,
    pageMarginLeft,
    pageMarginTop + lineMargin,
    { align: "left" }
  );
  text(
    doc,
    jsonData.adresse[indexAdresse].codePostal +
      " " +
      jsonData.adresse[indexAdresse].ville,
    pageMarginLeft,
    pageMarginTop + 2 * lineMargin,
    { align: "left" }
  );
  // Ajout de mon numéro de téléphone
  let telephone = jsonData.telephone[0];
  if (internationnal) {
    telephone = jsonData.telephone[1];
  }
  text(
    doc,
    "Téléphone: " + telephone,
    pageMarginLeft,
    pageMarginTop + 3 * lineMargin,
    {
      align: "left",
    }
  );
  // Ajout de mon adresse mail
  text(
    doc,
    "Mail: " + jsonData.email[indexMail],
    pageMarginLeft,
    pageMarginTop + 4 * lineMargin,
    { align: "left" }
  );

  //? Ajout du destinataire
  // Ajout du poste du destinataire
  const textDestinataire =
    "A l'intention de la " +
    jsonDataLettre.poste +
    " chez " +
    jsonDataLettre.entreprise;
  let startY = pageMarginTop + 5 * lineMargin;
  const maxWidth = pageWidth - 2 * pageMarginLeft;
  let temp = addParagraph(
    doc,
    textDestinataire,
    pageMarginLeft + mid,
    startY,
    maxWidth - mid,
    lineMargin
  );

  //? Ajout du corps de la lettre
  // Objet de la lettre
  let textObjet =
    "Objet: Recherche d'un " +
    jsonData.recherche.type +
    " d'une durée de " +
    jsonData.recherche.duree +
    " à compté de " +
    jsonData.recherche.dateDebut;
  if (jsonData.recherche.convention) {
    textObjet += ", conventionné";
  }
  startY = temp + paragraphMargin;
  temp = addParagraph(
    doc,
    textObjet,
    pageMarginLeft,
    startY,
    maxWidth,
    lineMargin
  );

  // Ajouter un paragraphe
  const paragraphText = jsonData.paragrapheMoi;
  startY = temp + paragraphMargin;

  temp = addParagraph(
    doc,
    paragraphText,
    pageMarginLeft,
    startY,
    maxWidth,
    lineMargin
  );

  //? enregistrement du fichier
  if (temp > pageHeight - pageMarginBottom) {
    console.error("La lettre est trop longue");
    exit();
  }
  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./pdf/LM.pdf");
  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
