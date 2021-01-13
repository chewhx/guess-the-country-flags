import React from 'react';

import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const options = (props) => {

    return (
        <>
        <ToggleButtonGroup type="radio" name="options" vertical="true" style={{width: "100%", marginBottom: "20px"}}>
            {props.options ? props.options.map((e, i) => 
            <Button 
                key={i} 
                value={i}
                checked={false} 
                size="lg"
                variant="outline-primary"
                onClick={()=>props.choose(i)} >{e}</Button>) : null }
        </ToggleButtonGroup><br />
        <Button variant="success" size="lg" block type="button" onClick={()=>props.check()} >Submit</Button>
        </>
    )
};

export default options;