import React, { useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";
import useQuiz from "../hook/useQuiz";
import data from "../data/data.json";

const Start = () => {
  const { initGameRound } = useContext(GlobalContext);

  const {
    stats,
    nextQuestion,
    previousQuestion,
    checkAnswer,
    questions,
    index,
    prevIndex,
    nextIndex,
  } = useQuiz(data);
  console.log(window.navigator.standalone);
  return (
    <Container fluid className="text-center w-75">
      <Row>
        <Col md={6} className="my-4">
          <p>{window.navigator.standalone}</p>
          <h3>Welcome to Guess The Flag</h3>
          <p>There are 195 flags.</p>
          <p>Your progress is not saved, currently.</p>
          Flags images from <a href="https://flagpedia.net/">Flagpedia</a>
        </Col>
        <Col md={6} className="my-auto">
          <Link to={"/start"}>
            <Button
              block
              size="lg"
              variant="primary"
              onClick={() => initGameRound()}
            >
              {`Start Game`}
            </Button>
          </Link>
          <Button
            block
            size="lg"
            variant="primary"
            onClick={() => previousQuestion()}
          >
            Previous
          </Button>
          <Button
            block
            size="lg"
            variant="primary"
            onClick={() => nextQuestion()}
          >
            Next
          </Button>
          <Button
            block
            size="lg"
            variant="primary"
            onClick={() => console.log(checkAnswer(3))}
          >
            Check
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h2>previous index</h2>
          <p>{JSON.stringify(prevIndex)}</p>
          <h2>index</h2>
          <p>{JSON.stringify(index)}</p>
          <h2>next index</h2>
          <p>{JSON.stringify(nextIndex)}</p>
        </Col>
        <Col xs={12}>
          <h2>Prev</h2>
          <p>{JSON.stringify(questions.previous)}</p>
        </Col>
        <Col xs={12}>
          <h2>Current</h2>
          <p>{JSON.stringify(questions.current)}</p>
        </Col>
        <Col xs={12}>
          <h2>Next</h2>
          <p>{JSON.stringify(questions.next)}</p>
        </Col>
        <Col xs={12}>
          <p>
            hasNext:
            {JSON.stringify(questions.hasNext)}
          </p>
          <p>
            hasPrevious:
            {JSON.stringify(questions.hasPrevious)}
          </p>
          <p>
            remaining:
            {JSON.stringify(questions.remaining)}
          </p>
          <p>
            total:
            {JSON.stringify(questions.total)}
          </p>
          <p>
            stats:
            {JSON.stringify(stats)}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Start;
