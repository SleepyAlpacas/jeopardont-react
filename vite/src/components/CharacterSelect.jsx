import React from 'react'
import CharacterPage from './CharacterPage';
import { nanoid } from 'nanoid';

export default function CharacterSelect(props) {
    const charactersPerPage = 8;
    let characterPageData = []
    let characterPageElements = [];

    for (let i = 0; i < props.characterData.length; i+= charactersPerPage){
        characterPageData.push(props.characterData.slice(i, i + charactersPerPage));
    }

    for (let i = 0; i < characterPageData.length; i++){
        characterPageElements.push(
            <CharacterPage key={nanoid()} characterPageData={characterPageData[i]} 
            prevPage={i != 0} nextPage={i != characterPageData.length - 1}
            setPlayerCharacter = {props.setPlayerCharacter}/>
        )
    }



    return (
        <>
            {characterPageElements}
        </>
    )
}