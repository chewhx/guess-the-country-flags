import React from "react"

const Start = (props) => {
  return (
    <div className="container">

      <h1><span className="title">GUESS THE FLAG</span></h1>

      <div className="row justify-content-md-center">
      <div className="col-md-auto">
      <ul className="text-start">
        <li>Refresh to restart.</li>
        <li>No limits on number of rounds.</li>
        <li>Flags and options may repeat.</li>
        <li>Current optimised for mobile only.</li>
      </ul>
      </div>
      </div>

      <input type="button" onClick={props.functions} className="btn btn-danger btn-lg" value="START" />
    </div>
  )
}

export default Start
