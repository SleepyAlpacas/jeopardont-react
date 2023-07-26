import React from "react";

export default function BuzzerButton(props){
    return(
        <button onClick={() => props.setBuzzer(props.buzzerData, props.playerNum)} className="buzzer-item">
            <h1 className="character-name">{props.buzzerData.name}</h1>
        </button>
    )
}