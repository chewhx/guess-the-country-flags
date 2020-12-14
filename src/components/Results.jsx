import React, {useState, useEffect} from "react"
import Flag from "./Flag"


const Results = (props) => {


  const [data, setData] = useState([])

  async function fetchData () {
  await fetch(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${props.prevAnswer}&namespace=0&limit=3`)
  .then (res => res.json())
  .then (json => {
    setData(json)
  })
  .catch(console.error)
  }

  const searchUrl = "http://www.google.com/search?q=" + props.prevAnswer

  return(
    <div className="card bg-light">
        <h5 className="card-title">Score: {props.score}/{props.attempts} </h5>
        <p>Previous Attempt: <strong>{props.attemptResult}</strong></p>
        <p><Flag url={props.PrevAnswerFlagUrl} width="40%" setMargin="0px" /></p>
        <a target="_blank" href={searchUrl}>{props.prevAnswer} &#8594;</a>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>fetchData()}>
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{props.prevAnswer}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {data}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Results
