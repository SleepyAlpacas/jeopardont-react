import React from 'react'
import { io } from 'socket.io-client'

import characterData from '../../characterData';

import RoomMenu from './RoomMenu';
import CharacterSelect from './CharacterSelect';

const socket = io('ws://localhost:8080')
var room = "";


export default function Joiner(){
    const [currentScreen, setCurrentScreen] = React.useState('room-menu');
    const [playerNum, setPlayerNum] = React.useState();

    function joinRoom(room){
        socket.emit('join room', room);
    }

    socket.on('join fail', () => {
        alert('invalid room id');
    });

    socket.on('join success', ({room: roomId, player}) =>{
        room = roomId;
        setPlayerNum(player-1);
        setCurrentScreen('character-select')

    })

    function setPlayerCharacter(characterChoiceData, playerNum){

        socket.emit('character select', ({characterChoiceData, playerNum, room}));
        console.log(characterChoiceData);
    }
    


    return (
        <>
            {currentScreen == 'room-menu' && <RoomMenu handleButton={joinRoom} host={false}/>}
            {currentScreen == 'character-select' && <CharacterSelect playerNum = {playerNum} characterData={characterData} setPlayerCharacter={setPlayerCharacter}/>}
        </>
    )
}