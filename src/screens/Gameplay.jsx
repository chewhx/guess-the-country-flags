import React, { useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalProvider";

import Results from "../components/Results";

const Gameplay = () => {
  const {
    currentQuestion,
    initGameRound,
    guessTheAnswer,
    results,
    listOfCountries,
  } = useContext(GlobalContext);

  const [showResults, setShowResults] = React.useState(false);
  return (
    <>
      <Row>
        <Col
          md="6"
          className="mb-3 text-center"
          style={{
            position: "relative",
            paddingTop: "calc(1.5rem + env(safe-area-inset-top)",
          }}
        >
          <div
            hidden={!showResults}
            style={{
              position: "absolute",
              left: "35%",
              top: "0%",
              zIndex: "10",
            }}
          >
            <i
              style={{ fontSize: "5rem" }}
              className="bi bi-check-circle-fill text-success"
            ></i>
            <h3>ANSWER</h3>
          </div>

          <Image
            fluid
            style={
              showResults ? { filter: "grayscale(100%)", opacity: "30%" } : null
            }
            className="mb-4"
            src={currentQuestion.flagUrl}
          />

          {currentQuestion.options.map((option, idx) => (
            <Button
              block
              style={{ borderRadius: "10px" }}
              key={`option-${idx}`}
              variant="primary"
              size="lg"
              value={option}
              onClick={(e) => guessTheAnswer(e.target.value)}
            >
              {option.toUpperCase()}
            </Button>
          ))}
        </Col>
        <Col md="6" className="mb-3">
          <Button onClick={() => setShowResults((prev) => !prev)}>
            Show results
          </Button>
          <Results />
        </Col>
      </Row>
    </>
  );
};

export default Gameplay;
