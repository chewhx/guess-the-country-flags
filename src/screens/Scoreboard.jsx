import React from "react";
import { ListGroup, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { countryCodeEmoji } from "country-code-emoji";
import { useCookies } from "react-cookie";

const Scoreboard = () => {
  const [cookies] = useCookies();
  const [scores, setScores] = React.useState([]);

  React.useEffect(async () => {
    const { data, status } = await axios.get("/.netlify/functions/mongoFind");
    setScores(data);
  }, []);

  return (
    <Container className="mt-5">
      <h1>
        <strong>Scoreboard</strong>
      </h1>
      {scores.length < 1 ? (
        <div
          className="d-flex justify-content-center"
          style={{ height: "50vh" }}
        >
          <Spinner
            animation="border"
            size="lg"
            className="align-self-center"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ) : (
        <ListGroup variant="flush">
          {scores.map((each, idx) => (
            <ListGroup.Item
              key={`${each.name}-${each.country}-${idx}`}
              className={`my-1 py-md-4 ${
                each.cookie == cookies.guessflagv1 && "bg-warning"
              }`}
              style={{
                borderRadius: "15px",
              }}
            >
              <Row className="no-gutters">
                <Col xs={1}>
                  <strong>{idx + 1}</strong>
                </Col>
                <Col xs={1}>
                  {each.country == "" ? "✌️" : countryCodeEmoji(each.country)}{" "}
                </Col>
                <Col xs={6} md={4}>
                  <p className="overflow-hidden text-truncate m-0 ">
                    {each.name}
                  </p>
                </Col>
                <Col xs={4} md={2} className="text-right">
                  {each.correct || 0} / {each.attempts || 0}
                </Col>
                <Col xs={12} md={4} className="text-right text-muted">
                  <small>
                    {new Date(each.createdAt).toLocaleString("en-SG", {
                      dateStyle: "medium",
                    })}
                  </small>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Scoreboard;
