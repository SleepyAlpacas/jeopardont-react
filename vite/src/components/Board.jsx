import React from 'react'

export default function Board(props){

    const boardTitleElements = <div className='board-row' key={props.titles.rowId}> 
        {
            props.titles.titleData.map(column => 
                <div className='board-cell' key={column.id}> {column.title} </div>
            )
        }
    </div>; 

    let questionElements = [];

    for (const column of props.boardState){

        const questionColumn = column.questions.map(question => 
            question.answered? 
            <div className='board-cell' key={question.id}><img className='player-icon' src={question?.characterIcon}/></div>:
            <button onClick={() => props.showQuestion(column.columnId, question.id)} 
                className='board-cell' key={question.id}>${question.value}</button>

        )
        questionElements.push(<div className='board-column' key={column.columnId}> {questionColumn} </div>);
    }

    return (
        <div id="board">
            {boardTitleElements}
        <div className="board-questions">
            {questionElements}
        </div>
    </div>
    )
}