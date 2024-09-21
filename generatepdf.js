const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

// Charger le fichier WOFF2 en tant que base64
const fontPath = path.join(__dirname, "./src/Assets/Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath, "base64");
const fontPathBold = path.join(__dirname, "./src/Assets/Roboto-Bold.ttf");
const fontDataBold = fs.readFileSync(fontPathBold, "base64");
const fontPathItalic = path.join(__dirname, "./src/Assets/Roboto-Italic.ttf");
const fontDataItalic = fs.readFileSync(fontPathItalic, "base64");

// Charger et parser le fichier JSON
const jsonPath = path.join(__dirname, "./generate.json");
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
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  doc.addFont("Roboto-Italic.ttf", "Roboto", "italic");

  doc.setFont("Roboto");

  // Définir les dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const col1Width = pageWidth / 3;
  const col2Width = (pageWidth / 3) * 2;
  console.log(pageWidth, pageHeight, col1Width, col2Width);

  // Définir les couleurs
  const primary = "#87CEFA";
  const secondary = "#86a8b3";
  const whiteColor = "#FFFFFF";
  const blackColor = "#000000";
  const greyColor = "#808080";

  // Définir les marges
  const pageMarginLeft = 5;
  const pageMarginTop = 20;
  const pageMarginBottom = 20;
  const paragraphMargin = 20;
  const lineMargin = 8;

  //Definir les variables de liste
  const number = jsonData["savoir-etre"].length;
  const number2 = jsonData.langues.length;
  const number3 = jsonData.passions.length;
  const number4 = jsonData.sport.length;

  //! Vérifier si la taille de la page est suffisante pour le contenu
  if (
    pageMarginTop +
      5 * paragraphMargin +
      (3 + number + number2 + number3 + number4) * lineMargin +
      pageMarginBottom >
    pageHeight
  ) {
    console.error("La taille de la page est trop petite pour le contenu");
    exit();
  }

  // Dessiner les rectangles de fond
  doc.setFillColor(primary);
  doc.rect(0, 0, col1Width, pageHeight, "F");
  doc.setFillColor(whiteColor);
  doc.rect(col1Width, 0, col2Width, pageHeight, "F");

  // Ajouter le contenu de la première colonne
  doc.setTextColor(whiteColor);
  doc.setFontSize(24);
  doc.text(jsonData.nom, col1Width / 2, pageMarginTop, { align: "center" });

  title(doc, "Coordonnées", col1Width / 2, pageMarginTop + paragraphMargin, {
    align: "center",
  });
  text(
    doc,
    `Téléphone: ${jsonData.telephone}`,
    pageMarginLeft,
    pageMarginTop + paragraphMargin + lineMargin,
    { align: "left" }
  );
  text(
    doc,
    `Email: ${jsonData.email}`,
    pageMarginLeft,
    pageMarginTop + paragraphMargin + 2 * lineMargin,
    { align: "left" }
  );

  title(
    doc,
    "Savoir-être",
    col1Width / 2,
    pageMarginTop + 2 * paragraphMargin + 2 * lineMargin,
    { align: "center" }
  );
  jsonData["savoir-etre"].forEach((item, index) => {
    text(
      doc,
      `- ${item}`,
      pageMarginLeft,
      pageMarginTop + 2 * paragraphMargin + 3 * lineMargin + index * lineMargin,
      { align: "left" }
    );
  });

  title(
    doc,
    "Langues",
    col1Width / 2,
    pageMarginTop + 3 * paragraphMargin + (3 + number - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.langues.forEach((langue, index) => {
    text(
      doc,
      `- ${langue.langue} (${langue.niveau})`,
      pageMarginLeft,
      pageMarginTop +
        3 * paragraphMargin +
        (3 + number) * lineMargin +
        index * lineMargin,
      {
        align: "left",
      }
    );
  });

  title(
    doc,
    "Passions",
    col1Width / 2,
    pageMarginTop +
      4 * paragraphMargin +
      (3 + number + number2 - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.passions.forEach((passion, index) => {
    text(
      doc,
      `- ${passion}`,
      pageMarginLeft,
      pageMarginTop +
        4 * paragraphMargin +
        (3 + number + number2) * lineMargin +
        index * lineMargin,
      {
        align: "left",
      }
    );
  });

  title(
    doc,
    "Sports",
    col1Width / 2,
    pageMarginTop +
      5 * paragraphMargin +
      (3 + number + number2 + number3 - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.sport.forEach((sport, index) => {
    text(
      doc,
      `- ${sport}`,
      pageMarginLeft,
      pageMarginTop +
        5 * paragraphMargin +
        (3 + number + number2 + number3) * lineMargin +
        index * lineMargin,
      {
        align: "left",
      }
    );
  });

  //? Ajouter le contenu de la deuxième colonne
  doc.setTextColor(primary);
  title(
    doc,
    "Expérience Professionnelle",
    col2Width / 2 + pageMarginLeft,
    pageMarginTop + paragraphMargin / 2,
    {
      align: "left",
    }
  );
  let espace = 0;
  let index = 0;
  jsonData.experiences.forEach((experience, expIndex) => {
    doc.setTextColor(secondary);
    if (experience.afficher) {
      // Entreprise en gras
      doc.setFont("Roboto", "bold");
      text(
        doc,
        `${experience.entreprise}`,
        col2Width / 2 + pageMarginLeft,
        pageMarginTop +
          (2 * paragraphMargin) / 2 +
          (index * paragraphMargin) / 2 +
          espace,
        {
          align: "left",
        }
      );
      console.log(index, experience.entreprise);
      console.log(
        pageMarginTop +
          (2 * paragraphMargin) / 2 +
          (index * paragraphMargin) / 2 +
          espace
      );
      console.log(espace);

      doc.setTextColor(blackColor);
      // Intitulé en plus petit et en italique
      doc.setFont("Roboto", "italic");
      text(
        doc,
        `${experience.intitule}`,
        col2Width / 2 + pageMarginLeft,
        pageMarginTop +
          (2 * paragraphMargin) / 2 +
          (index * paragraphMargin) / 2 +
          espace +
          lineMargin,
        {
          align: "left",
        },
        10
      );

      // Date en police normale
      doc.setFont("Roboto", "normal");
      text(
        doc,
        `${experience.date}`,
        col2Width / 2 + pageMarginLeft,
        pageMarginTop +
          (2 * paragraphMargin) / 2 +
          (index * paragraphMargin) / 2 +
          espace +
          2 * lineMargin,
        {
          align: "left",
        }
      );

      doc.setTextColor(greyColor);
      // Description en bullet points
      experience.description.forEach((desc, descIndex) => {
        text(
          doc,
          `- ${desc}`,
          col2Width / 2 + pageMarginLeft,
          pageMarginTop +
            (2 * paragraphMargin) / 2 +
            (index * paragraphMargin) / 2 +
            espace +
            3 * lineMargin +
            descIndex * lineMargin/2,
          { align: "left" }, 10
        );
      });
      index += 1;
      espace = lineMargin/1.4 * (2 + experience.description.length) + espace;
    }
  });

  title(doc, "Formation", col2Width / 2 + pageMarginLeft, 300, {
    align: "center",
  });
  jsonData.formation.forEach((formation, formIndex) => {
    if (formation.afficher) {
      text(
        doc,
        `${formation.date}`,
        col2Width / 2 + pageMarginLeft,
        310 + formIndex * 50,
        {
          align: "left",
        }
      );
      text(
        doc,
        `${formation.intitule}`,
        col2Width / 2 + pageMarginLeft,
        320 + formIndex * 50,
        {
          align: "left",
        }
      );
      text(
        doc,
        `${formation.ecole}`,
        col2Width / 2 + pageMarginLeft,
        330 + formIndex * 50,
        {
          align: "left",
        }
      );
      text(
        doc,
        `${formation.ville}`,
        col2Width / 2 + pageMarginLeft,
        340 + formIndex * 50,
        {
          align: "left",
        }
      );
      formation.description.forEach((desc, descIndex) => {
        text(
          doc,
          `- ${desc}`,
          col2Width / 2 + pageMarginLeft,
          350 + formIndex * 50 + descIndex * 11,
          { align: "left" }
        );
      });
    }
  });

  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./src/Assets/NathanMorel.pdf");

  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
