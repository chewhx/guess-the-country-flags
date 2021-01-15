import React from "react"

const Begin = (props) => {
  return (
    <div className="container">

      <h1>GUESS THE FLAG</h1>

      <div className="row justify-content-center">
      <div className="col-auto">
      <ul className="list-unstyled">
        <li>There are 196 flags.</li>
        <li>Refresh to restart.</li>
        <li>Progress is not saved.</li>
        <li>Options may repeat.</li>
        <li>Currently optimised for mobile only.</li>
        <li>Flags from <a href="https://flagpedia.net/">Flagpedia</a></li>
      </ul>
      </div>
      </div>

      <input type="button" onClick={() => props.start()} className="btn btn-danger btn-lg" value="START" />
    </div>
  )
}

export default Begin
