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
  return (
    <>
      <Row>
        <Col md="6" className="mb-3 text-center">
          <Image fluid className="mb-4" src={currentQuestion.flagUrl} />
          {currentQuestion.options.map((option, idx) => (
            <Button
              block
              key={`option-${idx}`}
              variant="primary"
              value={option}
              onClick={(e) => guessTheAnswer(e.target.value)}
            >
              {option.toUpperCase()}
            </Button>
          ))}
        </Col>
        <Col md="6" className="mb-3">
          <Results />
        </Col>
      </Row>
    </>
  );
};

export default Gameplay;
