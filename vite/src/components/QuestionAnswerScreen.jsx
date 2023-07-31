import React from 'react'

export default function QuestionAnswerScreen(props) {
    return (
        <div onClick={(props.currentScreen == 'question' || props.currentScreen == 'final-jeopardy')? props.showAnswer : props.showBoard} className='question-answer-screen'>
            {(props.currentScreen == 'question' || props.currentScreen == 'final-jeopardy')? props.question : props.answer}
        </div>
    )
}