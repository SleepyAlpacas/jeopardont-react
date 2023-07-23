import React from 'react'
import questionsData from '../questionsData'
import { nanoid } from 'nanoid';

export default function Board(){
    const questionsArray = questionsData['board-data'];
    const boardTitleElements = <div className='board-row'> 
        {
            questionsArray.map(column => 
                <div className='board-cell' key={nanoid()}> {column.title} </div>
            )
        }
    </div>; 

    let questionElements = [];

    for (const column of questionsArray){
        const questionColumn = column['column-questions'].map(question => 
            <button className='board-cell'>${question.value}</button>
        )
        questionElements.push(<div className='board-column'> {questionColumn} </div>);
    }

    console.log(questionElements);


    return (
        <div id="board">
            {boardTitleElements}
        <div className="board-questions">
            {questionElements}
        </div>
    </div>
    )
}