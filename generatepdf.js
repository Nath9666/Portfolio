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
  doc.addFont("Roboto-Bold.ttf", "Robot", "bold");
  doc.addFont("Roboto-Italic.ttf", "Robo", "italic");

  doc.setFont("Roboto");

  //? Definir Variables
  const maxRow = 4;

  // Définir les dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const col1Width = pageWidth / 3;
  const col2Width = (pageWidth / 3) * 2;
  console.log(pageWidth, pageHeight, col1Width, col2Width);

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

  //Definir les variables de liste
  const number = jsonData["savoir-etre"].length;
  const number2 = jsonData.langues.length;
  const number3 = jsonData.passions.length;
  const number4 = jsonData.sport.length;

  //! Vérifier si la taille de la page est suffisante pour le contenu gauche
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
  // Ajouter un lien pour l'email
  doc.link(
    0,
    pageMarginTop + paragraphMargin + 2 * lineMargin - 6,
    col1Width,
    10,
    { url: `mailto:${jsonData.email}` }
  );
  text(
    doc,
    `Site: ${jsonData.site}`,
    pageMarginLeft,
    pageMarginTop + paragraphMargin + 3 * lineMargin,
    { align: "left" },
    10
  );
  doc.link(
    0,
    pageMarginTop + paragraphMargin + 3 * lineMargin - 6,
    col1Width,
    10,
    { url: `${jsonData.site}` }
  );

  title(
    doc,
    "Savoir-être",
    col1Width / 2,
    pageMarginTop + 2 * paragraphMargin + 3 * lineMargin,
    { align: "center" }
  );
  jsonData["savoir-etre"].forEach((item, index) => {
    text(
      doc,
      `- ${item}`,
      pageMarginLeft,
      pageMarginTop + 2 * paragraphMargin + 4 * lineMargin + index * lineMargin,
      { align: "left" }
    );
  });

  title(
    doc,
    "Langues",
    col1Width / 2,
    pageMarginTop + 3 * paragraphMargin + (4 + number - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.langues.forEach((langue, index) => {
    text(
      doc,
      `- ${langue.langue} (${langue.niveau})`,
      pageMarginLeft,
      pageMarginTop +
        3 * paragraphMargin +
        (4 + number) * lineMargin +
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
      (4 + number + number2 - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.passions.forEach((passion, index) => {
    text(
      doc,
      `- ${passion}`,
      pageMarginLeft,
      pageMarginTop +
        4 * paragraphMargin +
        (4 + number + number2) * lineMargin +
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
      (4 + number + number2 + number3 - 1) * lineMargin,
    { align: "center" }
  );
  jsonData.sport.forEach((sport, index) => {
    text(
      doc,
      `- ${sport}`,
      pageMarginLeft,
      pageMarginTop +
        5 * paragraphMargin +
        (4 + number + number2 + number3) * lineMargin +
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
    "Expériences Professionnelles",
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
      doc.setFont("Robot", "bold");
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
      doc.setFont("Robo", "italic");
      text(
        doc,
        `${experience.intitule}`,
        col2Width / 2 + pageMarginLeft,
        pageMarginTop +
          (2 * paragraphMargin) / 2 +
          (index * paragraphMargin) / 2 +
          espace +
          lineMargin / 1.5,
        {
          align: "left",
        }
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
          (2 * lineMargin) / 1.5,
        {
          align: "left",
        },
        10
      );

      doc.setTextColor(greyColor);
      // Description en bullet points
      for (let i = 0; i < experience.description.length; i++) {
        if (i < maxRow) {
          text(
            doc,
            `- ${experience.description[i]}`,
            col2Width / 2 + pageMarginLeft,
            pageMarginTop +
              (2 * paragraphMargin) / 2 +
              (index * paragraphMargin) / 2 +
              espace +
              (3 * lineMargin) / 1.5 +
              (i * lineMargin) / 2,
            { align: "left" },
            10
          );
        }
      }

      index += 1;
      espace =
        (lineMargin / 1.4) * (2 + experience.description.length) + espace;
    }
  });

  const espaceFormation =
    pageMarginTop +
    paragraphMargin / 2 +
    ((index - 1) * paragraphMargin) / 2 +
    espace +
    3 * lineMargin;

  doc.setTextColor(primary);
  title(
    doc,
    "Formation",
    col2Width / 2 + pageMarginLeft,
    espaceFormation - lineMargin / 2,
    {
      align: "left",
    }
  );
  let indexFormation = 0;
  let espace2 = 0;
  jsonData.formation.forEach((formation, formIndex) => {
    if (formation.afficher) {
      // Date en police normale
      doc.setTextColor(blackColor);
      text(
        doc,
        `${formation.date}`,
        col2Width / 2 + pageMarginLeft,
        espaceFormation +
          lineMargin / 1.5 +
          (indexFormation * paragraphMargin) / 2 +
          espace2,
        {
          align: "left",
        }
      );

      // Intitulé en plus gras et plus gros
      doc.setFont("Robot", "bold");
      doc.setTextColor(secondary);
      text(
        doc,
        `${formation.intitule}`,
        col2Width / 2 + pageMarginLeft,
        espaceFormation +
          (2 * lineMargin) / 1.5 +
          (indexFormation * paragraphMargin) / 2 +
          espace2,
        {
          align: "left",
        }
      );

      // Ecole et Ville en police italique et gris
      doc.setFont("Robo", "italic");
      doc.setTextColor(greyColor);
      text(
        doc,
        `${formation.ecole}`,
        col2Width / 2 + pageMarginLeft,
        espaceFormation +
          (3 * lineMargin) / 1.5 +
          (indexFormation * paragraphMargin) / 2 +
          espace2,
        {
          align: "left",
        },
        10
      );
      text(
        doc,
        `${formation.ville}`,
        col2Width / 2 + pageMarginLeft,
        espaceFormation +
          (4 * lineMargin) / 1.5 +
          (indexFormation * paragraphMargin) / 2 +
          espace2,
        {
          align: "left",
        },
        10
      );

      // Description en bullet points grisée
      for (let descIndex = 0; descIndex < formation.description.length; descIndex++) {
        if (descIndex < maxRow) {
          text(
            doc,
            `- ${formation.description[descIndex]}`,
            col2Width / 2 + pageMarginLeft,
            espaceFormation +
              (5 * lineMargin) / 1.5 +
              (indexFormation * paragraphMargin) / 2 +
              espace2 +
              (descIndex * lineMargin) / 2,
            { align: "left" },
            10
          );
        }
      }
      indexFormation += 1;
      espace2 = lineMargin * (2 + formation.description.length) + espace2;
    }
  });

  // Spécifiez le chemin où vous voulez enregistrer le fichier PDF
  const filePath = path.join(__dirname, "./src/Assets/NathanMorel.pdf");

  // Enregistrez le fichier PDF
  fs.writeFileSync(filePath, doc.output());
};

generatePDF();
