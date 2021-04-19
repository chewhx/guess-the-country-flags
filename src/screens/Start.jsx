import React, { useContext } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";

const Start = () => {
  const { initGameRound } = useContext(GlobalContext);
  return (
    <Container fluid className="text-center w-75">
      <Row>
        <Col md={6} className="my-4">
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
        </Col>
      </Row>
    </Container>
  );
};

export default Start;
