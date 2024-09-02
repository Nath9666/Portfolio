import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiVercel,
  SiWindows,
  SiEpicgames,
  SiUnity,
  SiUnrealengine,
  SiNotion,
  SiTrello
} from "react-icons/si";

const tools = [
  SiWindows,
  SiVisualstudiocode,
  SiEpicgames,
  SiUnity,
  SiVercel,
  SiUnrealengine,
  SiNotion,
  SiTrello
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((Tool, index) => (
        <Col key={index} xs={4} md={2} className="tech-icons">
          <Tool />
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;