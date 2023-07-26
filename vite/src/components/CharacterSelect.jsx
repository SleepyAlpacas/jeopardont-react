import React from 'react'
import CharacterPage from './CharacterPage';
import { nanoid } from 'nanoid';

export default function CharacterSelect(props) {
    const [currentPage, setCurrentPage] = React.useState(0);

    const charactersPerPage = 8;
    let characterPageData = []
    let characterPageElements = [];

    function prevPage(){
        setCurrentPage(oldPage => --oldPage);
    }

    function nextPage(){
        setCurrentPage(oldPage => ++oldPage);
    }

    for (let i = 0; i < props.characterData.length; i+= charactersPerPage){
        characterPageData.push(props.characterData.slice(i, i + charactersPerPage));
    }

    for (let i = 0; i < characterPageData.length; i++){
        characterPageElements.push(
            <CharacterPage key={nanoid()} characterPageData={characterPageData[i]} 
            prevPage = {prevPage} nextPage = {nextPage}
            prevPageExists={i != 0} nextPageExists={i != characterPageData.length - 1}
            setPlayerCharacter = {props.setPlayerCharacter} playerNum = {props.playerNum}/>
        )
    }



    return (
        <>
            {characterPageElements[currentPage]}
        </>
    )
}