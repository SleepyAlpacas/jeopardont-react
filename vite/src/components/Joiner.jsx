import React from 'react'
import { io } from 'socket.io-client'
import RoomMenu from './RoomMenu';

const socket = io('ws://localhost:8080')
export default function Joiner(){
    const [currentScreen, setCurrentScreen] = React.useState('room-menu');

    function joinRoom(roomId){
        socket.emit('join room', roomId);
    }

    socket.on('join fail', () => {
        console.log("we did it");
    })

    return (
        <>
            {currentScreen == 'room-menu' && <RoomMenu handleButton={joinRoom} host={false}/>}
        </>
    )
}