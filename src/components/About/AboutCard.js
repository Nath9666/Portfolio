import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Bonjour à tous, je suis <span className="purple">Nathan Morel</span>
            <br />
            Je suis passionné par la création, qu'elle soit digitale ou manuelle.
            <br />
            J'adore les nouvelles technologies.
            <br />
            <br />
            En dehors du code, voici quelques activités que j'aime faire !
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Lego
            </li>
            <li className="about-activity">
              <ImPointRight /> Création d'objets en bois
            </li>
            <li className="about-activity">
              <ImPointRight /> Roller
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Si on veut, on peut. Sinon, on ne peut pas."{" "}
          </p>
          <footer className="blockquote-footer">Nathan Morel</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;