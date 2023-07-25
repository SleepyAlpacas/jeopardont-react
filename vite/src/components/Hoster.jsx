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

const socket = io('ws://localhost:8080');


function Hoster() {
  const [boardState, setBoardState] = React.useState(initBoard());
  const [currentScreen, setCurrentScreen] = React.useState('room-menu');
  const titles = initTitles();

  const [playerData, setPlayerData] = React.useState(initPlayers());



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


  function initPlayers(){
    const playerCount = 4;
    let players = [];
    for (let i = 0; i < playerCount; i++){
      players.push(
        {
          playerNum: i,
          character: "",
          money: 0,
          buzzed: false,
          powerUses: 0,
          id: nanoid()
        }
      )
    }

    return players;
  }

  function createRoom(roomId){
    socket.emit('create room', roomId);
  }

  socket.on('create fail', () => {
    alert('invalid room code');
  });

  socket.on('create success', () => {
    setCurrentScreen('character-select'); 
  });

  function setPlayerCharacter(playerNum, characterData){
    let newPlayerData = [...playerData]
    const targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
    targetPlayer.character = characterData;
    setPlayerData(newPlayerData);
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
  }
  
  function showAnswer(){
    setCurrentScreen('answer');
  }

  function showBoard(){
    setCurrentScreen('board');
    greyOutQuestion()
  }

  function correctOrIncorrectAnswer(playerNum, correct){
    let newPlayerData = [...playerData];
    let correctPlayer = newPlayerData.find(player => player.playerNum == playerNum);
    correct? correctPlayer.money += currentQuestion.value : correctPlayer.money -= currentQuestion.value;
    setPlayerData(newPlayerData);

    correct && showAnswer();
  }


  return (
    <>
      {currentScreen == 'room-menu' && <RoomMenu handleButton={createRoom} host={true}/>}
      {currentScreen == 'character-select' && <CharacterSelect characterData={characterData} setPlayerCharacter={setPlayerCharacter}/>}
      {currentScreen == 'board' && <Board boardState = {boardState} titles={titles} showQuestion={showQuestion}/>}
      {(currentScreen == 'question' || currentScreen == 'answer') && 
        <QuestionAnswerScreen currentScreen = {currentScreen} showAnswer={showAnswer} showBoard={showBoard}
        question={currentQuestion.question} answer={currentQuestion.answer}/>}
      {currentScreen == 'wager' && <Wager />}
      {currentScreen != 'room-menu' && <PlayerPanel playerData={playerData} correctOrIncorrectAnswer={correctOrIncorrectAnswer}/>}
    </>
  )
}

export default Hoster
