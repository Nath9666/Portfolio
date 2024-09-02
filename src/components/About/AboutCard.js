import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Bonjour, je suis <span className="purple">Nathan Morel</span>.
            <br />
            Passionné par la création, qu'elle soit digitale ou artisanale, je
            suis constamment à la recherche de nouvelles technologies et de
            méthodes innovantes pour donner vie à mes idées.
            <br />
            <br />
            En dehors de mon travail de développeur, voici quelques activités
            qui nourrissent ma créativité :
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Construction de modèles Lego
            </li>
            <li className="about-activity">
              <ImPointRight /> Fabrication d'objets en bois
            </li>
            <li className="about-activity">
              <ImPointRight /> Pratique du roller
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Si la solution n'existe pas, créez-la. Sinon, améliorez-la."
          </p>
          <footer className="blockquote-footer">Nathan Morel</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
