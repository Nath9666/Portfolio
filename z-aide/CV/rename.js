const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

// Chemin du fichier PDF existant
const oldFilePath = path.join(__dirname, './pdf/certificate_20241028223140.pdf');

// Nouveau nom pour le titre du document PDF
const newTitle = 'ETS Global BV Certificate';

// Fonction pour renommer le titre du document PDF
const renamePDFTitle = async (oldPath, newTitle) => {
  try {
    // Lire le fichier PDF existant
    const existingPdfBytes = fs.readFileSync(oldPath);

    // Charger le document PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Renommer le titre du document PDF
    pdfDoc.setTitle(newTitle);

    // Sauvegarder le document PDF modifié
    const pdfBytes = await pdfDoc.save();

    // Écrire le fichier PDF modifié
    fs.writeFileSync(oldPath, pdfBytes);

    console.log(`Le titre du document PDF a été renommé en "${newTitle}"`);
  } catch (err) {
    console.error('Erreur lors du renommage du titre du document PDF:', err);
  }
};

// Appeler la fonction pour renommer le titre du document PDF
renamePDFTitle(oldFilePath, newTitle);