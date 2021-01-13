import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const start = (props) => {
    return (
        <>
        <ul className="text-start">
        <li>There are 196 flags.</li>
        <li>Options may repeat.</li>
        <li>Current optimised for mobile only.</li>
      </ul>
        <Link to="/game">
        <Button size="lg" block onClick={ ()=> props.start() }>Start</Button>
        </Link>
        </>
    )
};

export default start;