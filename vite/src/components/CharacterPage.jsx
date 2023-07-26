import React from 'react'
import CharacterButton from './CharacterButton'
import { nanoid } from 'nanoid';

export default function CharacterPage(props){
    const characterButtonElements = props.characterPageData.map(
        character => <CharacterButton setPlayerCharacter = {props.setPlayerCharacter}
         key={nanoid()} characterData={character} playerNum = {props.playerNum}/>
    )

    return (
        <div className='menu-select character-select'>
            {props.nextPageExists && 
            <button className="next-button" onClick={props.nextPage}><h1> › </h1></button>}
            {props.prevPageExists && 
            <button className="back-button" onClick={props.prevPage}><h1> ‹ </h1></button>}
            {props.playerNum >= 0 && <h1 className='character-select-header'>Player {props.playerNum + 1} Select Your Character</h1>}
            <div className='break'/>
            {characterButtonElements}
        </div>
    )
    
}