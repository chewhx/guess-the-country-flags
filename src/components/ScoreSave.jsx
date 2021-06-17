require("dotenv").config();
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import countries from "../data/countries.json";


const ScoreSave = ({ show, setShow, stats, reset, setGameMode }) => {
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const percentageScore = parseFloat(
    parseInt(stats.correct) / parseInt(stats.attempts)
  ).toFixed(2);

  const resetForm = () => {
    setName("");
    setCountry("");
  };

  const postToMongo = async () => {
    const body = {
      name,
      country,
      correct: stats.correct,
      attempts: stats.attempts,
      createdAt: new Date(),
      updatedAt: new Date(),
      _v: 1,
    };

    flags
      .insertOne(body)
      .then((res) => {
        console.log(res);

        resetForm();
        setShow(false);
        reset();
        setGameMode(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="h2 p-3">
              <strong>Save my score to the board!</strong>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className="h4 font-weight-bold">
            Hi. My name is
            <Form.Control
              className="my-3"
              type="text"
              size="lg"
              value={name}
              placeholder="eg. Chanandler Bong"
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p className="h4 font-weight-bold">
            I'm from
            <Form.Control
              className="my-3"
              as="select"
              size="lg"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((each, idx) => (
                <option
                  key={`${each.code}-${idx}`}
                  value={each.code}
                >{`${each.emoji}  ${each.name}`}</option>
              ))}
            </Form.Control>
          </p>
          <p className="h3 font-weight-bold">
            I scored &nbsp;
            {stats.correct} / {stats.attempts}
            &nbsp;
            <span>
              {percentageScore < 0.2 && stats.attempts < 20 && "😅"}
              {percentageScore >= 0.5 && stats.attempts < 20 && "😅"}
              {percentageScore >= 0.5 && stats.attempts > 30 && "🥵"}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Try Again
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            disabled={stats.correct == 0 || stats.attempts == 0}
            onClick={() => postToMongo()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoreSave;
