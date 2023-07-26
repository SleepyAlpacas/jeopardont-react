import React from 'react'
import { io } from 'socket.io-client'

import characterData from '../../characterData'
import buzzerData from '../../buzzerData'

import RoomMenu from './RoomMenu'
import CharacterSelect from './CharacterSelect'
import BuzzerSelect from './BuzzerSelect'
import Controls from './Controls'

const socket = io('ws://localhost:8080')
var room = "";
var buzzer;

export default function Joiner(){
    const [currentScreen, setCurrentScreen] = React.useState('room-menu');
    const [playerNum, setPlayerNum] = React.useState();
    const [selectedCharacterData, setSelectedCharacterData] = React.useState();

    function joinRoom(room){
        socket.emit('join request', room);
    }

    socket.on('join fail', () => {
        alert('invalid room id');
    });

    socket.on('room full', () => {
        alert('full room');
    });

    socket.on('join success', ({room: roomId, playerNum: newPlayerNum}) =>{
        room = roomId;
        setPlayerNum(newPlayerNum);
        setCurrentScreen('character-select')
        console.log(playerNum);
    })

    function setCharacter(characterChoiceData, playerNum){
        socket.emit('character select', ({characterChoiceData, playerNum, room}));
        setSelectedCharacterData(characterChoiceData);
        setCurrentScreen('buzzer-select');
    }

    function setBuzzer (buzzerChoiceData){
        buzzer = buzzerChoiceData.sound;
        setCurrentScreen('controls');
    }

    function buzz(){

    }
    
    function activatePower(){

    }


    return (
        <>
            {currentScreen == 'room-menu' && <RoomMenu handleButton={joinRoom} host={false}/>}
            {currentScreen == 'character-select' && <CharacterSelect playerNum = {playerNum} characterData={characterData} setCharacter={setCharacter}/>}
            {currentScreen == 'buzzer-select' && <BuzzerSelect playerNum = {playerNum} buzzerData={buzzerData} setBuzzer={setBuzzer}/>}
            {currentScreen == 'controls' && <Controls buzz={buzz} activatePower={activatePower} powerUses={selectedCharacterData.powerUses}/>}
        </>
    )
}