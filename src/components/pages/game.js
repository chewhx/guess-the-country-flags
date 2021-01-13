import React from 'react';
import Question from '../sections/question'
import Results from '../containers/results'

const game = (props) => {


    return (
        <>
        <h3 style={{textAlign: "center"}}> {props.r.score} of {props.index}</h3>
        <Question 
            q={props.q}
            choose={props.choose}
            check={props.check} />
        {props.r.show && <Results results={props.r} />}
        </>
    )
};

export default game;