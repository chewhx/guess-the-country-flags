import React from 'react';

import { Container, Row, Col, Card, Image } from 'react-bootstrap'

const results = (props) => {

    const {r, pQ, score} = props.results

    const declare = r ? "CORRECT" : "WRONG"

    const variant = r ? "success" : "danger"

    return (
        <Container>
        <Row>
        <Col style={{textAlign: "center"}}>
            <h3>{declare}</h3>
            <p>The answer was {pQ.answer}</p>
            <Image rounded src={pQ.flag} alt="country-flag" style={{width: "50%", marginBottom: "20px"}} />
            <p>You guessed "{pQ.options[pQ.guess]}"</p>
        </Col>
        </Row>
        </Container>
    )

};

export default results;