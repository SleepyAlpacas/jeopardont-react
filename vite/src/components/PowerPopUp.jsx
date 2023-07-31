import React from 'react'

export default function PowerPopUp(props){
    return (
        <div className='power-used'>
            <img src={props.playerData.character.icon} className='player-icon'/>
            <h1>Player {props.playerData.playerNum + 1} has activated a power!</h1>
        </div>
    )
}