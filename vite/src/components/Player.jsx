import React from 'react'

export default function Player(props){
    return (
    <div className="player">
        <button onClick={() => props.correctOrIncorrectAnswer(props.playerNum, true)}>Yep</button>
        <button onClick={() => props.correctOrIncorrectAnswer(props.playerNum, false)}>Nope</button>
        <div className="break"></div>
        <h1 className="money" contentEditable="true">${props.money}</h1>
        <div className="break"></div>
        <img className="player-icon" src={props.character.icon}></img>
    </div>
    )
}