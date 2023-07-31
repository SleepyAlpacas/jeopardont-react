import React from 'react'

export default function Player(props){
    const styles = {border: props.currentBuzzedPlayer? "5px solid red" : ""};
    return (
    <div style={styles} className="player">
        <div>
            <button onClick={() => props.correctAnswer(props.playerNum)}>Yep</button>
            <button onClick={() => props.incorrectAnswer(props.playerNum)}>Nope</button>
            {props.deletePlayerVisible && <button onClick={() => props.deletePlayer(props.playerNum)}>Banish</button>}
        </div>
        <h1 contentEditable="true">${props.money}</h1>
        <img className="player-icon" src={props.character.icon}></img>
    </div>
    )
}