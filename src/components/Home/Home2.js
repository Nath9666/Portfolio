import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LAISSEZ-MOI <span className="purple"> ME PRÉSENTER </span>
            </h1>
            <p className="home-about-body">
              Passionné par la programmation, j'ai acquis une solide expérience
              dans ce domaine.
              <br />
              <br />
              Je maîtrise plusieurs langages de programmation, notamment
              <i>
                <b className="purple"> Python, JavaScript et C.</b>
              </i>
              <br />
              <br />
              Mes domaines d'expertise incluent la création de
              <i>
                <b className="purple">
                  {" "}
                  technologies et produits web innovants{" "}
                </b>
              </i>
              ainsi que le développement dans le secteur des
              <i>
                <b className="purple"> jeux vidéo.</b>
              </i>
              <br />
              <br />
              J'applique également ma passion pour le développement de produits
              en utilisant
              <i>
                <b className="purple"> Node.js et Unreal Engine </b>
              </i>
              ainsi que les
              <i>
                <b className="purple">
                  {" "}
                  bibliothèques et frameworks JavaScript modernes{" "}
                </b>
              </i>
              tels que
              <i>
                <b className="purple"> React.js et Next.js.</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>TROUVEZ MOI</h1>
            <p>
              N'hésitez pas à <span className="purple">me contacter</span>
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Nath9666"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/nathan-morel-4b993b1b7/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/nathan__morel/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
