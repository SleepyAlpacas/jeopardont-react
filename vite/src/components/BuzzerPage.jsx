import React from 'react'
import BuzzerButton from './buzzerButton';
import { nanoid } from 'nanoid';

export default function BuzzerPage(props){
    const buzzerButtonElements = props.buzzerPageData.map(
        buzzer => <BuzzerButton setBuzzer = {props.setBuzzer}
         key={nanoid()} buzzerData={buzzer} playerNum = {props.playerNum}/>
    )

    return (
        <div className='menu-select buzzer-select'>
            {props.nextPageExists && 
            <button className="next-button" onClick={props.nextPage}><h1> › </h1></button>}
            {props.prevPageExists && 
            <button className="back-button" onClick={props.prevPage}><h1> ‹ </h1></button>}
            {props.playerNum >= 0 && <h1 className='buzzer-select-header'>Player {props.playerNum + 1} Select Your Buzzer</h1>}
            <div className='break'/>
            {buzzerButtonElements}
        </div>
    )
    
}