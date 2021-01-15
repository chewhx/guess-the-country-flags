import React from "react"

const Results = (props) => {

  const searchUrl = "http://www.google.com/search?q=" + props.prevAnswer

  console.log(props.r.pQ);

  return(
    <div className="card bg-light">
        <h5 className="card-title">Score: {props.r.score}/{props.round} </h5>
        <p>Previous answer: <strong>{props.r.pQ.answer}</strong></p>
        <p><img src={props.r.pQ.flag} alt="flag-img" style={{width: "60%"}} /></p>
        <a target="_blank" href={searchUrl}>{props.r.pQ.answer} &#8594;</a>
    </div>
  )
}

export default Results
