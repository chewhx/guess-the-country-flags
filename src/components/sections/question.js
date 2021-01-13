import React from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap'

import Options from '../containers/options'

const question = (props) => {

    const q = props.q

    return (
        <Container>
            <Row>
                <Col xs="12">
                    <Image rounded src={q.flag} alt="country-flag" style={{width: "100%", marginBottom: "20px"}} />
                </Col>
                <Col xs="12">
                    <Options 
                    choose={props.choose} 
                    options={q.options} 
                    check={props.check} />
                </Col>
            </Row>
           

        </Container>
        
    )
};

export default question;