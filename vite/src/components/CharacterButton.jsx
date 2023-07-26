import React from "react";

/*        <button onclick="setPlayerCharacter(0)" class="character">
            
            <h1 class="character-name">Mr. Happy</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Mr._Happy.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">Can activate power to shower confetti onto the screen. Cooldown of 1 minute.</p>
                </div>
            </div>
        </button>*/

export default function CharacterButton(props){
    return(
        <button onClick={props.setPlayerCharacter && (() => props.setPlayerCharacter(props.characterData, props.playerNum))} className="character">
            <h1 className="character-name">{props.characterData.name}</h1>
            <img className="character-icon" src={props.characterData.icon} />
            <div className="character-info">
                <div>
                    <p className="character-info-text green-text">{props.characterData?.greenText}</p>
                    <p className="character-info-text yellow-text">{props.characterData?.yellowText}</p>
                    <p className="character-info-text red-text">{props.characterData?.redText}</p>
                </div>
            </div>
        </button>
    )
}