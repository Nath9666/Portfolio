import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiCss3,
  SiCsharp,
  SiHtml5,
  SiFirebase,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiBlender,
  SiThreedotjs
} from "react-icons/si";

const techIcons = [
  CgCPlusPlus,
  SiBlender,
  DiJavascript1,
  SiMysql,
  DiNodejs,
  SiCss3,
  SiCsharp,
  SiHtml5,
  DiReact,
  DiMongodb,
  SiNextdotjs,
  DiGit,
  SiFirebase,
  SiThreedotjs,
  SiPostgresql,
  DiPython,
  DiJava,
];

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techIcons.map((Icon, index) => (
        <Col key={index} xs={4} md={2} className="tech-icons">
          <Icon />
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;