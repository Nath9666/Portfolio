const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

// Charger le fichier WOFF2 en tant que base64
const fontPath = path.join(__dirname, "./src/Assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath, "base64");

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
  doc.addFileToVFS("bahnschrift.woff2", fontData);
  doc.addFont("bahnschrift.woff2", "Bahnschrift", "normal");
  doc.setFont("Bahnschrift");

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
  doc.text("Nathan Morel", col1Width / 2, 20, { align: "center" });

  title(doc, "Coordonnées", col1Width / 2, 40, { align: "center" });
  doc.setFontSize(12);
  doc.text("Téléphone: 07 68 99 75 15", col1Width / 2 + 20, 50, { align: "right" });
  doc.text("Email: nathan.morel@efrei.net", col1Width / 2 + 30, 60, {
    align: "right",
  });

  doc.setFontSize(15);
  doc.text("Savoir-être", col1Width / 2, 80, { align: "center" });
  doc.setFontSize(12);
  doc.text("- Esprit d’équipe", col1Width / 2, 90, { align: "center" });
  doc.text("- Capacité d’adaptation", col1Width / 2, 100, { align: "center" });
  doc.text("- Créatif et curieux", col1Width / 2, 110, { align: "center" });
  doc.text("- Responsable", col1Width / 2, 120, { align: "center" });
  doc.text("- Pédagogue", col1Width / 2, 130, { align: "center" });

  doc.setFontSize(15);
  doc.text("Langues", col1Width / 2, 150, { align: "center" });
  doc.setFontSize(12);
  doc.text("- Français (langue maternelle)", col1Width / 2, 160, {
    align: "center",
  });
  doc.text("- Anglais (550 au TOEIC)", col1Width / 2, 170, { align: "center" });
  doc.text("- Espagnol", col1Width / 2, 180, { align: "center" });

  doc.setFontSize(15);
  doc.text("Passions", col1Width / 2, 200, { align: "center" });
  doc.setFontSize(12);
  doc.text("- Sports", col1Width / 2, 210, { align: "center" });
  doc.text("- Lego", col1Width / 2, 220, { align: "center" });

  // Ajouter le contenu de la deuxième colonne
  doc.setTextColor("black");
  doc.setFontSize(16);
  doc.text("Expérience Professionnelle", col1Width + 10, 20);
  // Ajoutez ici les détails de l'expérience professionnelle

  doc.text("Formation", col1Width + 10, 100);
  // Ajoutez ici les détails de la formation

  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./src/Assets/NathanMorel.pdf");

  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
