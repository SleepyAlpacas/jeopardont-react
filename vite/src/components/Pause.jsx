import React from "react";
import pauseImage from "../assets/images/a8f.jpg"

export default function Pause(){
    return (
    <div className="win-screen">
        <h1>PAUSED</h1>
        <img src={pauseImage}/>
    </div>
    )
}