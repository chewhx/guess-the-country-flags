require("dotenv").config();
import React from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import countries from "../data/countries.json";
import axios from "axios";
import { useHistory } from "react-router";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";

const ScoreSave = ({ show, setShow, stats, reset, setGameMode }) => {
  const history = useHistory();

  const [cookies, setCookie] = useCookies();
  const [validated, setValidated] = React.useState(false);

  React.useEffect(() => {
    if (!cookies.guessflagv1) {
      setCookie("guessflagv1", uuidv4(), {
        expires: new Date("2025,01,01"),
      });
    }
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = React.useState();
  const [country, setCountry] = React.useState();
  const percentageScore = parseFloat(
    parseInt(stats.correct) / parseInt(stats.attempts)
  ).toFixed(2);

  const resetForm = () => {
    setName("");
    setCountry("");
  };

  const postToMongo = async () => {
    try {
      if (name === null || name === "") return;
      const newItem = {
        name,
        country,
        correct: stats.correct,
        attempts: stats.attempts,
        createdAt: new Date(),
        updatedAt: new Date(),
        cookie: cookies.guessflagv1,
      };

      const { status } = await axios.post(
        "/.netlify/functions/mongoInsert",
        newItem
      );

      if (status === 201) {
        resetForm();
        setShow(false);
        reset();
        setGameMode(false);
        history.push(`/scoreboard`);
      }
    } catch (err) {
      console.error(err);
    }
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body className="p-4">
            <p className="h4 font-weight-bold">
              Hi. My name is
              <Form.Control
                required
                className="my-3"
                type="text"
                size="lg"
                value={name}
                placeholder="eg. Chanandler Bong"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Hello...blank?
              </Form.Control.Feedback>
            </p>
            <div className="h4 font-weight-bold">
              I'm from
              <Form.Control
                required
                className="my-3"
                as="select"
                size="lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">{`Select country`}</option>
                {countries.map((each, idx) => (
                  <option
                    key={`${each.code}-${idx}`}
                    value={each.code}
                  >{`${each.name} ${each.emoji} `}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                We're interested to know.
              </Form.Control.Feedback>
            </div>
            <div className="h3 font-weight-bold">
              I scored &nbsp;
              {stats.correct} / {stats.attempts}
              &nbsp;
              <span>
                {percentageScore < 0.2 && stats.attempts < 20 && "😅"}
                {percentageScore >= 0.5 && stats.attempts < 20 && "😅"}
                {percentageScore >= 0.5 && stats.attempts > 30 && "🥵"}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {(stats.correct == 0 || stats.attempts == 0) && (
              <p className="text-muted">
                You'll need at least 1 point to submit score
              </p>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Try harder
            </Button>
            {/* <Button
            variant="primary"
            onClick={handleClose}
            disabled={stats.correct == 0 || stats.attempts == 0}
            onClick={() => {
              postToMongo()
            }}
            >
            Submit
          </Button> */}
            <Button
              type="submit"
              disabled={stats.correct == 0 || stats.attempts == 0}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ScoreSave;
