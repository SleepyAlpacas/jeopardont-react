import React from 'react'
import { io } from 'socket.io-client'

import characterData from '../../characterData'
import buzzerData from '../../buzzerData'

import RoomMenu from './RoomMenu'
import CharacterSelect from './CharacterSelect'
import BuzzerSelect from './BuzzerSelect'
import Controls from './Controls'
import JoinerFinalJeopardy from './JoinerFinalJeopardy'

const socket = io('ws://localhost:8080')
var room = "";
var buzzer;

export default function Joiner(){
    const [currentScreen, setCurrentScreen] = React.useState('room-menu');
    const [playerNum, setPlayerNum] = React.useState();
    const [selectedCharacterData, setSelectedCharacterData] = React.useState();
    const [buzzerDisabled, setBuzzerDisabled] = React.useState(true);
    const [powerDisabled, setPowerDisabled] = React.useState(true);
    const [money, setMoney] = React.useState(0);

    const playerNumRef = React.useRef();
    playerNumRef.current = playerNum;
    const selectedCharacterDataRef = React.useRef();
    selectedCharacterDataRef.current = selectedCharacterData;

    function joinRoom(room){
        socket.emit('join request', (room));
    }

    React.useEffect(() => {
        socket.on('join fail', () => {
            alert("room doesn't exist");
        });
        socket.on('room full', () => {
            alert('full room');
        });
        socket.on('join success', ({room: roomId, playerNum: newPlayerNum}) =>{
            socket.emit('join room', (roomId));
            room = roomId;
            setPlayerNum(newPlayerNum);
            setCurrentScreen('character-select')
        })

        socket.on('decrease powerUse', ({playerNum}) => {
            if (playerNum == playerNumRef.current){
                decreasePowerUse();
            }
        });
        socket.on('add money', ({moneyAmount, playerNum}) => {
            if (playerNum == playerNumRef.current){
                setMoney(oldMoney => oldMoney + moneyAmount);
            }
        })

        socket.on('disable buzzer', () => setBuzzerDisabled(true));
        socket.on('enable valid buzzer', (buzzedPlayers) => {
            if (buzzedPlayers.find(player => player.playerNum == playerNumRef.current)){
                setBuzzerDisabled(true);
            }
            else{
                setBuzzerDisabled(false);
            }
        })

        socket.on('send currentScreen', ({currentScreen}) => {
            console.log(currentScreen);
            checkPowerActivatable(currentScreen);

            if (currentScreen == 'wager'){
                setCurrentScreen('wager');
            }
        })
        
    }, []);


    console.log(selectedCharacterData);
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
        socket.emit('buzz', ({playerNum, buzzer, room}))
    }
    
    function activatePower(){
        socket.emit('power', ({playerNum, room}))
    }

    function decreasePowerUse(){
        setSelectedCharacterData(oldCharacterData => {
            return {
                ...oldCharacterData,
                powerUses: oldCharacterData.powerUses - 1
            }
        })
    }

    function checkPowerActivatable(gameScreen){
        console.log(selectedCharacterDataRef.current);
        if (selectedCharacterDataRef.current?.powerUses > 0 && selectedCharacterDataRef.current?.activatableOnScreen.includes(gameScreen)){
            setPowerDisabled(false);
        }
        else{
            setPowerDisabled(true);
        }
    }

    function submitWager(wager){
        const convertedWager = parseInt(wager);
        if (wager > money || convertedWager < 0 || isNaN(convertedWager)){
            alert('invalid wager');
        }
        else{
            socket.emit('submit wager', ({wagerAmount: convertedWager, playerNum, room}));
            setCurrentScreen();
        }

    }

    return (
        <>
            {currentScreen == 'room-menu' && <RoomMenu handleButton={joinRoom} host={false}/>}
            {currentScreen == 'character-select' && <CharacterSelect playerNum = {playerNum} characterData={characterData} setCharacter={setCharacter}/>}
            {currentScreen == 'buzzer-select' && <BuzzerSelect playerNum = {playerNum} buzzerData={buzzerData} setBuzzer={setBuzzer}/>}
            {currentScreen == 'controls' && <Controls buzz={buzz} activatePower={activatePower} powerUses={selectedCharacterData.powerUses}
                buzzerDisabled={buzzerDisabled} powerDisabled={powerDisabled}/>}
            {currentScreen == 'wager' && <JoinerFinalJeopardy submitWager={submitWager}/>}
            
            {!['room-menu', 'character-select', 'buzzer-select'].includes(currentScreen) && <h1 className='money'>${money}</h1>}
        </>
    )
}