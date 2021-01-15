import React from 'react'; 
import Flag from '../components/flag'
import Option from '../components/option'
import Result from '../components/results'

const game = (props) => { 


     return (
        <div className="container"> 
            <Flag flag={props.q.flag} />
            <Option check={props.check} q={props.q} />
            {props.r.show ? <Result round={props.round} r={props.r}/> : null}
        </div>
     )
} 


export default game;