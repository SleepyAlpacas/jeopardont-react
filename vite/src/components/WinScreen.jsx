import React from "react";
import { nanoid } from "nanoid";

export default function WinScreen(props){
    const winnerElements = props.winners.map(player => <img className="winner-icon" src={player.character.icon} key={nanoid()}/>)
    return(
        <div className="win-screen">
            <h1>Winner!</h1>

            <div>
            {winnerElements}
            </div>
        </div>
    )
}