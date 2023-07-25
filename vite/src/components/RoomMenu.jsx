import React from "react";

export default function RoomMenu(props){
    function sendRoomId(){
        const roomId = document.getElementById('roomId').value;
        props.handleButton(roomId);
    }
    return(
        <div className="room-menu">
            <input id="roomId" maxLength="5" placeholder="Room ID" />
            <button onClick={sendRoomId} className="btn btn-success">{props.host? "Create" : "Join"} Room</button>
        </div>
    )
}