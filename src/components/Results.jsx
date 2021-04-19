import React, { useContext } from "react";
import { Card, Image, Button, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalProvider";

const Results = () => {
  const { results, listOfCountries } = useContext(GlobalContext);
  return (
    results.show && (
      <Card className="mx-auto" style={{ textAlign: "center" }}>
        <Card.Header>
          <Row className="mb-3">
            <Col md={6}>{`Flags left: ${listOfCountries.length}`} </Col>
            <Col md={6}>{`Score: ${results.score} / ${results.attempts}`} </Col>
          </Row>
          You previous attempt:
          <h3> {results.correct ? "CORRECT!" : "WRONG!"}</h3>
        </Card.Header>
        <Card.Body>
          <p>
            The answer was {"  "}
            <Button size="sm" variant="success">
              {results.previousQuestion.answer.toUpperCase()}
            </Button>
          </p>

          <Image
            style={{ maxWidth: "260px" }}
            fluid
            src={results.previousQuestion.flagUrl}
          />
        </Card.Body>
      </Card>
    )
  );
};

export default Results;
