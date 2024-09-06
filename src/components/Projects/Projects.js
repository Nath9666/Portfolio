import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import belote from "../../Assets/Projects/regles-valeur-carte.webp";
import dOpject from "../../Assets/Projects/3dObject.webp";
import sogetronic from "../../Assets/Projects/soge.png";

const projects = [
  {
    imgPath: dOpject,
    title: "3D Objects",
    description: "Ce project recense plein de mini-projet incluant des objets 3D aisi que des images les montrants",
    ghLink: "https://github.com/Nath9666/3D-Objects",
    blog : false,
    demoLink: ""
  },
  {
    imgPath: null,
    title: "Email Management",
    description: "Ce projet est inspiré des boites mails tel que Outlook ou Gmail. L'utilisateur doit avoir le choix de se connecter soit via Microsoft Outlook, soit via un compte Google. Une fois connecté, l'utilisateur doit pouvoir ajouter (c'est-à-dire s'envoyer), modifier, supprimer et consulter ses emails actuels. La liste des emails est initialement vide, puis elle est mise à jour progressivement.",
    ghLink: "https://github.com/Nath9666/EmailManagement/",
    blog : false,
    demoLink: ""
  },
  {
    imgPath: sogetronic,
    title: "Sogetronic VR",
    description: "Ce projet vise à refaire les projecteurs laser de Sogetronic pour faciliter le travail des commerciaux.",
    ghLink: "https://github.com/Nath9666/VRGame-5.3",
    blog : false,
    demoLink: ""
  },
  {
    imgPath: belote,
    title: "Concour Belote",
    description: "L'objectif est de faciliter la détection de feuille de marquage de belote en utilisant des algorithmes de traitement d'image.",
    ghLink: "https://github.com/Nath9666/ConcourBelote",
    blog : false,
    demoLink: ""
  },
  {
    imgPath: null,
    title: "Melo graph",
    description: "Site web d'organisation et de gestion des différentes commandes d'une designeuse de dessin",
    blog : true,
    ghLink: "https://nath9666.github.io/melo-graph/",
    demoLink: "https://nath9666.github.io/melo-graph/"
  }
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Mes <strong className="purple">Projets Récents</strong>
        </h1>
        <p style={{ color: "white" }}>
          Voici quelques projets sur lesquels j'ai travaillé récemment.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, index) => (
            <Col key={index} md={4} className="project-card">
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={project.blog}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;