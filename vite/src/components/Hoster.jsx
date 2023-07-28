import React from 'react'
import { io } from 'socket.io-client'
import { nanoid } from 'nanoid';

import questionsData from '../../questionsData.jsx'
import characterData from '../../characterData.js'


import Board from './Board.jsx'
import PlayerPanel from './PlayerPanel.jsx'
import QuestionAnswerScreen from './QuestionAnswerScreen.jsx'
import RoomMenu from './RoomMenu.jsx';
import CharacterSelect from './CharacterSelect.jsx'


var currentQuestion;
var currentQuestionId;
var questionsLeft = questionsData.rows * questionsData.columns;
var playerCount = 2;
var room = ""

//http://localhost:5173/
//ws://localhost:8080
const socket = io('ws://localhost:8080');


function Hoster() {
  const [boardState, setBoardState] = React.useState(initBoard());
  const [currentScreen, setCurrentScreen] = React.useState('room-menu');
  const [playerData, setPlayerData] = React.useState([]);
  const [currentBuzzedPlayer, setCurrentBuzzedPlayer] = React.useState();

  const playerDataRef = React.useRef();
  playerDataRef.current = playerData;

  const titles = initTitles();



  //initialize boardState to array of objects of column arrays of question objects
  function initBoard(){
      let initializedBoard = [];
      for (const column of questionsData['board-data']){
        let boardColumn = column.map(question => {
            return {
              ...question,
              answered: false,
              playerAnswered: undefined,
              characterAnswered: undefined,
              id: nanoid()
            }
          })
  
        initializedBoard.push({questions: boardColumn, columnId: nanoid()});
      }
      
      return initializedBoard;
  }
  
  function initTitles(){
    let initializedTitles = [];
    for (const entry of questionsData['titles']){
      initializedTitles.push({
        title: entry,
        id: nanoid()
      });
    }
    return {titleData: initializedTitles, rowId: nanoid()};
  }


  function addPlayer(playerNum){

    setPlayerData(oldPlayerData => 
      [...oldPlayerData,
        {
          playerNum: playerNum,
          character: "",
          money: 0,
          buzzed: false,
          powerUses: 0,
          id: nanoid()
        }
      ]
    )

  }


  function createRoom(roomId){
    socket.emit('create room', roomId);
  }

  React.useEffect(() =>{
    socket.on('create fail', () => {
      alert('invalid room code');
    });

    socket.on('create success', (roomId) => {
      room = roomId;
      setCurrentScreen('character-select'); 
    });

    socket.on('character select', ({characterChoiceData, playerNum}) => {
      setPlayerCharacter(playerNum, characterChoiceData);

    });

    socket.on('join request', ({socketId}) => {
      if (checkRoomFull()){
        socket.emit('room full', (socketId));
      }
      else{
        const playerNum = findOpenPlayerSlot();
        socket.emit('join success', ({socketId, playerNum, room}));
        addPlayer(playerNum);
      }
    });
    
    socket.on('buzz', ({playerNum, buzzer}) => {

      setCurrentBuzzedPlayer(playerNum);
      setBuzzedPlayer(playerNum);
      socket.emit('disable buzzer', (room));
      let snd = new Audio(buzzer);
      snd.play();

    });
    
  }, [])

  function setPlayerCharacter(playerNum, characterData){

    setPlayerData(oldPlayerData => {
      let newPlayerData = [...oldPlayerData]
      const targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.character = characterData;
      return newPlayerData;
    })

    if (checkPlayersReady()){
      setCurrentScreen('board');
    }
  }



  function checkRoomFull(){
    return playerData.length == playerCount;
  }

  function findOpenPlayerSlot(){
    for (let i = 0; i < playerCount; i++){
      let playerExists = playerDataRef.current.find(player => player.playerNum == i);
      if (!playerExists){
        return i;
      }
    }
  }


  function deletePlayer(playerNum){
    const newPlayerData = [...playerData];
    for (let i = 0; i < playerCount; i++){
      if (newPlayerData[i].playerNum == playerNum){
        newPlayerData.splice(i,1);
        setPlayerData(newPlayerData);
        return;
      }
    }

  }  



  function checkPlayersReady(){
    console.log(playerDataRef.current);
    const readyPlayers = playerDataRef.current.filter(player => player.character);
    console.log(readyPlayers)
    return readyPlayers.length + 1 == playerCount;
  }

  
  function setBuzzedPlayer(playerNum){

    setPlayerData(oldPlayerData => {
      const newPlayerData = [...oldPlayerData];
      const targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.buzzed = true;
      return newPlayerData;
    })

  }



  function getBuzzedPlayers(){
    return playerDataRef.current.filter(player => player.buzzed == true);
  }

  function unbuzzPlayers(){
    setPlayerData(oldPlayerData => {
      return oldPlayerData.map(player => ({...player, buzzed: false}));
    })
  }



  function greyOutQuestion(){
    setBoardState(oldBoardState => {
      let newBoardState = [...oldBoardState];
      let greyedOutQuestion = findQuestion(currentQuestionId[0], currentQuestionId[1], newBoardState);
      greyedOutQuestion.answered = true;
      return newBoardState;
    })

    questionsLeft--;

  }

  function findQuestion(columnId, questionId, boardArray){
    const targetColumn = boardArray.find(column => column.columnId == columnId).questions;
    const targetQuestion = targetColumn.find(question => question.id == questionId);
    return targetQuestion;
  }

  function showQuestion(columnId, questionId){
    currentQuestion = findQuestion(columnId, questionId, boardState);
    currentQuestionId = [columnId, questionId];
    setCurrentScreen('question');
    socket.emit('enable valid buzzer', ({room, buzzedPlayers: []}))
  }
  
  function showAnswer(){
    socket.emit('disable buzzer', (room));
    unbuzzPlayers();
    setCurrentBuzzedPlayer();
    setCurrentScreen('answer');
  }

  function showBoard(){
    setCurrentScreen('board');
    greyOutQuestion()
  }



  function correctAnswer(playerNum){
    setPlayerData(oldPlayerData => {
      let newPlayerData = [...oldPlayerData];
      let targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.money += currentQuestion.value;
      return newPlayerData;
    });

    showAnswer();
  }

  function incorrectAnswer(playerNum){
    setPlayerData(oldPlayerData => {
      let newPlayerData = [...oldPlayerData];
      let targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.money -= currentQuestion.value;
      return newPlayerData;
    });

    setCurrentBuzzedPlayer();
    const buzzedPlayers = getBuzzedPlayers();
    console.log(`BUZZED PLAYERS:`);
    console.log(buzzedPlayers)
    socket.emit('enable valid buzzer', ({room, buzzedPlayers}));
  }

  return (
    <>
      {currentScreen == 'room-menu' && <RoomMenu handleButton={createRoom} host={true}/>}
      {currentScreen == 'character-select' && <CharacterSelect characterData={characterData}/>}
      {currentScreen == 'board' && <Board boardState = {boardState} titles={titles} showQuestion={showQuestion}/>}
      {(currentScreen == 'question' || currentScreen == 'answer') && 
        <QuestionAnswerScreen currentScreen = {currentScreen} showAnswer={showAnswer} showBoard={showBoard}
        question={currentQuestion.question} answer={currentQuestion.answer}/>}
      {currentScreen == 'wager' && <Wager />}
      {currentScreen != 'room-menu' && <PlayerPanel deletePlayer = {deletePlayer} deletePlayerVisible = {currentScreen == "character-select"}
       playerData={playerData} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} currentBuzzedPlayer={currentBuzzedPlayer}/>}
    </>
  )
}

export default Hoster
