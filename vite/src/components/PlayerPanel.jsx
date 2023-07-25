import React from 'react'
import Player from './Player'

export default function PlayerPanel(props){
    const playerElements = props.playerData.map(player => 
            <Player character={player.character} key={player.id} money={player.money}
                playerNum={player.playerNum} correctOrIncorrectAnswer = {props.correctOrIncorrectAnswer}/>
        )
    return (
        <div id="player-panel">
            {playerElements}
        </div>
    )
}