import React from 'react'

export default function QuestionAnswerScreen(props) {
    return (
        <div onClick={props.currentScreen == 'question'? props.showAnswer : props.showBoard} className='question-answer-screen'>
            {props.currentScreen == 'question'? props.question : props.answer}
        </div>
    )
}