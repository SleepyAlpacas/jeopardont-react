import React from 'react'
import {Happy}from '../src/assets/images/index.js'

export default function Player(props){
    return (
    <div className="player">
        <div className="break"></div>
        <h1 className="money" contentEditable="true">$0</h1>
        <div className="break"></div>
        <img className="player-icon" src={Happy}></img>
    </div>
    )
}