import React from 'react'

export default function Player(props){
    return (
    <div className="player">
        <div>
            <button onClick={() => props.correctOrIncorrectAnswer(props.playerNum, true)}>Yep</button>
            <button onClick={() => props.correctOrIncorrectAnswer(props.playerNum, false)}>Nope</button>
            {props.deletePlayerVisible && <button onClick={() => props.deletePlayer(props.playerNum)}>Banish</button>}
        </div>
        <h1 className="money" contentEditable="true">${props.money}</h1>
        <img className="player-icon" src={props.character.icon}></img>
    </div>
    )
}