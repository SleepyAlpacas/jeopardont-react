import React from "react";

export default function Controls (props){
    return(
        <div className="button-menu">
            <button onClick={props.buzz} id="buzzer" className="big-button" disabled>BZZT</button>
            {props.powerUses > 0 && 
            <div id="power-div">
                <button onClick={props.activatePower} id="power-button" className="big-button" disabled>UNLEASH THE POWER</button>
                <h1 id="power-uses">{`Uses: ${props.powerUses}`}</h1>
            </div>
            }
        </div>
    )
}