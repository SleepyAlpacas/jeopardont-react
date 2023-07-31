import React from 'react'

export default function JoinerFinalJeopardy(props){
    return (
        <div className='joiner-final-jeopardy'>
            <h1>Enter your wager</h1>
            <div className="break"></div>
            <input id="final-jeopardy-input" type="text" />
            <input onClick={() => props.submitWager(document.getElementById('final-jeopardy-input').value)} 
                type="submit" value="Submit Wager" className="btn-success btn" />
        </div>
    )
}