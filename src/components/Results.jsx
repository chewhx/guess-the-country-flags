import React from "react"
import Flag from "./Flag"


const Results = (props) => {

  const searchUrl = "http://www.google.com/search?q=" + props.prevAnswer

  return(
    <div className="card bg-light">
        <h5 className="card-title">Score: {props.score}/{props.attempts} </h5>
        <p>Previous Attempt: <strong>{props.attemptResult}</strong></p>
        <p><Flag url={props.PrevAnswerFlagUrl} width="40%" setMargin="0px" /></p>
        <a target="_blank" href={searchUrl}>{props.prevAnswer} &#8594;</a>
    </div>
  )
}

export default Results
