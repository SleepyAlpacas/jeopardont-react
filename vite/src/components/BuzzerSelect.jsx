import React from 'react'
import BuzzerPage from './BuzzerPage'
import { nanoid } from 'nanoid';

export default function BuzzerSelect(props) {
    const [currentPage, setCurrentPage] = React.useState(0);

    const buzzersPerPage = 8;
    let buzzerPageData = []
    let buzzerPageElements = [];

    function prevPage(){
        setCurrentPage(oldPage => --oldPage);
    }

    function nextPage(){
        setCurrentPage(oldPage => ++oldPage);
    }

    for (let i = 0; i < props.buzzerData.length; i+= buzzersPerPage){
        buzzerPageData.push(props.buzzerData.slice(i, i + buzzersPerPage));
    }

    for (let i = 0; i < buzzerPageData.length; i++){
        buzzerPageElements.push(
            <BuzzerPage key={nanoid()} buzzerPageData={buzzerPageData[i]} 
            prevPage = {prevPage} nextPage = {nextPage}
            prevPageExists={i != 0} nextPageExists={i != buzzerPageData.length - 1}
            setBuzzer = {props.setBuzzer} playerNum = {props.playerNum}/>
        )
    }



    return (
        <>
            {buzzerPageElements[currentPage]}
        </>
    )
}