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
import PowerPopUp from './PowerPopUp.jsx';
import HosterWager from './HosterWager.jsx';
import WinScreen from './WinScreen.jsx';

var currentQuestion;
var currentQuestionId;
var questionsLeft = 2;
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
  const [currentPowerPlayer, setCurrentPowerPlayer] = React.useState();

  const playerDataRef = React.useRef();
  playerDataRef.current = playerData;

  const titles = initTitles();



  //initialize boardState to array of objects of column arrays of question objects
  function initBoard(){
      let initializedBoard = [];
      let columnNum = 0;
      for (const column of questionsData['board-data']){
        let boardColumn = column.map((question, index) => {
            return {
              ...question,
              answered: false,
              playerAnswered: undefined,
              characterIcon: undefined,
              rowNum: index,
              id: nanoid()
            }
          })
        initializedBoard.push({questions: boardColumn, columnId: nanoid(), columnNum: columnNum});
        columnNum++;
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
          wager: undefined,
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
    
    socket.on('power', ({playerNum}) => {
      console.log("POWER RECEIVED")
      activatePower(playerNum);
    
      socket.emit('decrease powerUse', ({playerNum, room}))
    })

    socket.on('submit wager', ({wagerAmount, playerNum}) => {
      setWager(wagerAmount, playerNum);
      if (checkWagersFull()){
        currentQuestion = questionsData['final-jeopardy'];
        setCurrentScreen('final-jeopardy');
      }
    })

  }, [])

  React.useEffect(() => {
    socket.emit('send currentScreen', ({currentScreen, room}));
  }, [currentScreen]);

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

  function decreasePowerUse(playerNum){
    setPlayerData(oldPlayerData => {
      const newPlayerData = [...oldPlayerData];
      const targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.character.powerUses--;
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



  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function createPowerPopUp(playerNum){
    setCurrentPowerPlayer(playerNum);
    await sleep(3000);
    setCurrentPowerPlayer();
  }

  async function activatePower(playerNum){
    const powerPlayer = playerDataRef.current.find(player => player.playerNum == playerNum);
    switch(powerPlayer.character.name){
      case "Mr. Happy":
        //add Confetti
        break;
      case "Mr. Bump":
        const random = Math.random();
        const playerMoney = powerPlayer.money;
        if (random < 50){
          addMoney(playerNum, playerMoney);
        }
        else if (random < 90){
          addMoney(playerNum , -playerMoney);
        }
        else{
          const dividedMoney = Math.floor(playerMoney/playerCount);
          addMoney(playerNum, -playerMoney);
          for (let i = 0; i < playerCount; i++){
            addMoney(playerNum, dividedMoney);
          }
        }
        break;
      
        case "Michigan J. Frog":
          addMoney(playerNum, -powerPlayer.money);
          break;
        case "Rocko":
          //add rocko code
        
        case "Stimpy":
          //add stimpy code
        
        case "Pompompurin":
          //add purin code
        
        case "Christopher Nolan":
          //add pause 
    }

    if (powerPlayer.name != "Mr. Happy"){
      await createPowerPopUp(playerNum);
    }

    decreasePowerUse(playerNum);
  }

  function checkPowerOnCorrectAnswer(playerNum){
    const powerPlayer = playerData.find(player => player.playerNum == playerNum);
    switch (powerPlayer.character.name){
      case "Mr. Clever":
        powerPlayer.character.correctAnswerBonus += 50;
        break;
      case "Little Miss Lucky":
        powerPlayer.character.correctAnswerBonus = Math.floor(Math.random() * 8 - 2) * 100
        break;
      case "Little Miss Twins":
        const questionColumn = boardState.find(column => column.columnId == currentQuestionId[0]);
        if (questionColumn.columnNum == currentQuestion.rowNum){
          //check for downward diagonal bingo
          
        }
        //bingo code
        break;
      case "Speedy Gonzales":
        if (playerDataRef.current.filter(player => player.buzzed).length == 1){
          powerPlayer.character.correctAnswerBonus = 50;
        }
        else {
          powerPlayer.character.correctAnswerBonus = 0;
        }
        break;
      case "Slowpoke Rodriguez":
        if (playerDataRef.current.filter(player => player.buzzed).length == 1){
          powerPlayer.character.correctAnswerBonus = 0;
        }
        else {
          powerPlayer.character.correctAnswerBonus = 100;
        }
        break;
      case "Porky Pig":
        if (powerPlayer.character.correctAnswerBonus == 0){
          for (const column of boardState){
            const answeredQuestion = column.questions.find(question => question.playerAnswered == playerNum);
            if (!answeredQuestion){
              break;
            }
          }
          powerPlayer.character.correctAnswerBonus = 100;
        }
        break;
        //pig code
      
    }    
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

  function setCorrectQuestion (correctPlayerNum){
    setBoardState(oldBoardState => {
      let newBoardState = [...oldBoardState];
      let greyedOutQuestion = findQuestion(currentQuestionId[0], currentQuestionId[1], newBoardState);

      let correctPlayer = playerData.find(player => player.playerNum == correctPlayerNum);
      console.log(correctPlayer);
      greyedOutQuestion.playerAnswered = correctPlayerNum;
      greyedOutQuestion.characterIcon = correctPlayer.character.icon;
      return newBoardState;
    })
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
    greyOutQuestion()
    setCurrentBuzzedPlayer();
    setCurrentScreen('answer');
  }

  function showBoard(){
    if (checkWagersFull()){
      setCurrentScreen('win-screen');
    }
    else{
      setCurrentScreen('board');
      checkShowWager();
    }
  }

  function checkShowWager(){
    if (questionsLeft <= 0){
      setCurrentScreen('wager');
    }
  }



  function setWager(wagerAmount, playerNum){
    setPlayerData(oldPlayerData => {
      const newPlayerData = [... oldPlayerData];
      const targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.wager = wagerAmount;
      return newPlayerData;
    });
  }

  function checkWagersFull(){
    const wagered = playerDataRef.current.filter(player => player.wager);
    if (wagered.length >= playerCount - 1){
      return true;
    }
    return false;
  }


  function addMoney(playerNum, moneyAmount){
    setPlayerData(oldPlayerData => {
      let newPlayerData = [...oldPlayerData];
      let targetPlayer = newPlayerData.find(player => player.playerNum == playerNum);
      targetPlayer.money += moneyAmount;
      return newPlayerData;
    });

    socket.emit('add money', ({moneyAmount, playerNum, room}));
  }

  function correctAnswer(playerNum){
    if (currentScreen == 'final-jeopardy'){
      const wageredMoney = playerData.find(player => player.playerNum == playerNum).wager;
      addMoney(playerNum, wageredMoney);
    }
    else{
      const correctPlayer = playerData.find(player => player.playerNum == playerNum).character;
      setCorrectQuestion(playerNum);

      addMoney(playerNum, currentQuestion.value * correctPlayer.correctAnswerModifier + correctPlayer.correctAnswerBonus);
      showAnswer();
    }
  }

  function incorrectAnswer(playerNum){
    if (currentScreen == 'final-jeopardy'){
      const wageredMoney = playerData.find(player => player.playerNum == playerNum).wager;
      addMoney(playerNum, -wageredMoney);
    }
    else{
      const incorrectPlayer = playerData.find(player => player.playerNum == playerNum).character;
      addMoney(playerNum, currentQuestion.value * incorrectPlayer.incorrectAnswerModifier);
      addMoney(playerNum, -currentQuestion.value);

      setCurrentBuzzedPlayer();
      const buzzedPlayers = getBuzzedPlayers();
      socket.emit('enable valid buzzer', ({room, buzzedPlayers}));
    }
  }

  function getWinningPlayers(){
    const playerMoney = playerData.map(player => player.money);
    const winningAmount = Math.max(...playerMoney);
    return playerData.filter(player => player.money == winningAmount);
  }


  return (
    <>
      {currentScreen == 'room-menu' && <RoomMenu handleButton={createRoom} host={true}/>}
      {currentScreen == 'character-select' && <CharacterSelect characterData={characterData}/>}
      {currentScreen == 'board' && <Board boardState = {boardState} titles={titles} showQuestion={showQuestion}/>}
      {(currentScreen == 'question' || currentScreen == 'answer' || currentScreen == 'final-jeopardy') && 
        <QuestionAnswerScreen currentScreen = {currentScreen} showAnswer={showAnswer} showBoard={showBoard}
        question={currentQuestion.question} answer={currentQuestion.answer}/>}
      {currentScreen == 'wager' && <HosterWager />}
      {currentScreen == 'win-screen' && <WinScreen winners={getWinningPlayers()}/>}

      {currentScreen != 'room-menu' && <PlayerPanel deletePlayer = {deletePlayer} deletePlayerVisible = {currentScreen == "character-select"}
       playerData={playerData} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} currentBuzzedPlayer={currentBuzzedPlayer}/>}
      {currentPowerPlayer  >= 0 && <PowerPopUp playerData={playerData.find(player => player.playerNum == currentPowerPlayer)}/>}
    </>
  )
}

export default Hoster
