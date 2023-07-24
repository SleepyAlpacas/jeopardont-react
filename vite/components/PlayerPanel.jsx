import React from 'react'

export default function PlayerPanel(){
    return (
        <div id="player-panel">
            <div className="player">
                <div className="buttons">
                    <button type="button" onclick="correctAnswer(0)" className="btn btn-success">Yep</button>
                    <button type="button" onclick="incorrectAnswer(0)" className="btn btn-danger">Nope</button>
                    
                </div>
                <div className="break"></div>
                <h1 className="money" contentEditable="true">$0</h1>
                <div className="break"></div>
                <img className="player-icon"></img>
            </div>
            <div className="player">

                <div className="buttons">
                    <button type="button" onclick="correctAnswer(1)" className="btn btn-success">Yep</button>
                    <button type="button" onclick="incorrectAnswer(1)" className="btn btn-danger">Nope</button>
                </div>
                <div className="break"></div>
                <h1 className="money" contentEditable="true">$0</h1>
                <div className="break"></div>
                <img className="player-icon"></img>
            </div>
            <div className="player">

                <div className="buttons">
                    <button type="button" onclick="correctAnswer(2)" className="btn btn-success">Yep</button>
                    <button type="button" onclick="incorrectAnswer(2)" className="btn btn-danger">Nope</button>
                    
                </div>
                <div className="break"></div>
                <h1 className="money" contentEditable="true">$0</h1>
                <div className="break"></div>
                <img className="player-icon"></img>
            </div>
            <div className="player">

                <div className="buttons">
                    <button type="button" onclick="correctAnswer(3)" className="btn btn-success">Yep</button>
                    <button type="button" onclick="incorrectAnswer(3)" className="btn btn-danger">Nope</button>
                    
                </div>
                <div className="break"></div>
                <h1 className="money" contentEditable="true">$0</h1>
                <div className="break"></div>
                <img className="player-icon"></img>
            </div>
        
        </div>
    )
}