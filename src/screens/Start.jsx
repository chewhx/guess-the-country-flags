import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Card,
  ListGroup,
} from "react-bootstrap";
import useQuiz from "../hook/useQuiz";
import data from "../data/data.json";
import questions_ from "../data/questions.json";
import optionsArray from "../data/optionsArray.json";
import QuizImage from "../components/QuizImage";
import QuizOptions from "../components/QuizOptions";

const Start = ({ gameMode, quizInstance }) => {
  const {
    index,
    prevIndex,
    nextIndex,
    questions,
    stats,
    populateOptions,
    nextQuestion,
    checkAnswer,
    results,
  } = quizInstance;

  React.useEffect(() => {
    populateOptions(4);
  }, []);

  return questions.current === null ? (
    "loading"
  ) : (
    <Container>
      <Row className="mt-5">
        <Col md={6} className="px-2 text-center">
          <QuizImage
            src={questions.current.question}
            showAnswer={questions.current.hasOwnProperty("correct")}
            correctAnswer={questions.current.correct}
          />
          <QuizOptions
            hidden={!gameMode}
            options={questions.current.options}
            checkAnswer={checkAnswer}
            nextQuestion={nextQuestion}
          />
          <QuizImage
            hidden
            src={questions.next.question}
            showAnswer={questions.next.hasOwnProperty("correct")}
            correctAnswer={questions.next.correct}
          />
          <QuizOptions
            hidden
            checkAnswer={checkAnswer}
            nextQuestion={nextQuestion}
          />
        </Col>
        <Col md={6} className="px-2">
          <Card border="light" style={{ height: "50vh", overflowY: "scroll" }}>
            <ListGroup variant="flush" className="d-flex">
              {results.length >= 1 ? (
                results.map((each, idx) => (
                  <ListGroup.Item
                    key={`results-list-${idx}`}
                    as="li"
                    action
                    className="p-3 alight-content-center"
                  >
                    <Row>
                      <Col xs={2}>
                        {each.correct ? (
                          <i
                            className="bi bi-check-circle-fill text-success "
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                        ) : (
                          <i
                            className="bi bi-x-circle-fill text-danger "
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                        )}
                      </Col>
                      <Col xs={3}>
                        <Image fluid src={each.question} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <Card.Body className="text-center">
                  <p className="h2">
                    <strong>Guess The Flags</strong>
                  </p>
                  <p className="h4">How many do you know?</p>
                  <hr />
                  <strong> Credits</strong>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi quas vero dolor unde quod obcaecati quidem ducimus
                    dicta ullam repellendus, excepturi, adipisci odio. Quos
                    tempore pariatur dicta, delectus excepturi perspiciatis.
                  </p>
                </Card.Body>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Start;
