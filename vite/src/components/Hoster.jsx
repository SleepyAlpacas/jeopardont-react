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
import Pause from './Pause.jsx';

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
  const [currentPowerPlayer, setCurrentPowerPlayer] = React.useState();

  const playerDataRef = React.useRef();
  playerDataRef.current = playerData;
  const currentScreenRef = React.useRef();
  currentScreenRef.current = currentScreen;

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
    console.log(powerPlayer.character.name);
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
        setPlayerData(oldPlayerData => {
          const newPlayerData = [...oldPlayerData];
          const rockoPlayer = newPlayerData.find(player => player.playerNum == playerNum);
          rockoPlayer.character.rockoed = true;
          return newPlayerData;
        });
        break;
      
      case "Stimpy":
        setPlayerData(oldPlayerData => {
          const newPlayerData = [...oldPlayerData];
          const stimpyPlayer = newPlayerData.find(player => player.playerNum == playerNum);
          stimpyPlayer.character.correctAnswerBonus = stimpyPlayer.money * 2;
          stimpyPlayer.character.correctAnswerModifier = 0;
          addMoney(playerNum, -stimpyPlayer.money);
          return newPlayerData;
        });
        break;
      
      case "Pompompurin":
        //add purin code
      
      case "Christopher Nolan":
        const previousScreen = currentScreenRef.current;
        setCurrentScreen('pause');
        await sleep(5000);
        setCurrentScreen(previousScreen);
    }

    const noPopupCharacters = ["Mr. Happy", "Rocko", "Christopher Nolan"]
    if (!noPopupCharacters.includes(powerPlayer.character.name)){
      createPowerPopUp(playerNum);
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
        console.log(questionColumn);
        console.log(currentQuestion);
        if (questionsData.columns == questionsData.rows){
          //checking for diagonal bingo

          //check for downward diagonal bingo
          if (questionColumn.columnNum == currentQuestion.rowNum){
            for (let i = 0; i < boardState.length; i++){
              const diagonalQuestion = boardState.columns[i].questions.find(question => question.rowNum == i);
              if (diagonalQuestion.playerAnswered != playerNum && diagonalQuestion != currentQuestion){
                console.log(`DOWNWARD DIAGONAL BROKE AT ${i}`)
                console.log(diagonalQuestion);
                break;
              }
              if (i == boardState.length - 1){
                addMoney(playerNum, 2500);
              }
            }
          }

          //checking for upward diagonal bingo
          if (questionColumn.columnNum + currentQuestion.rowNum == questionsData.columns){
            for (let i = 0; i < boardState.length; i++){
              const diagonalQuestion = boardState.columns[i].questions.find(question => question.rowNum == questionsData.columns - i);
              if (diagonalQuestion.playerAnswered != playerNum && diagonalQuestion != currentQuestion){
                console.log(`UPWARD DIAGONAL BROKE AT ${i}`)
                console.log(diagonalQuestion);
                break;
              }
              if (i == boardState.length - 1){
                addMoney(playerNum, 2500);
              }
            }
          }
        }

        //check vertical bingo
        const verticalUnansweredQuestion = questionColumn.questions.filter(question => question.playerAnswered != playerNum);
        console.log(`VERTICAL`)
        console.log(verticalUnansweredQuestion)
        if (verticalUnansweredQuestion.length == 1){
          addMoney(playerNum, 2500);
        }

        //check horizontal bingo
        for (let i = 0; i < boardState.length; i++){
          const horizontalQuestion = boardState[i].questions.find(question => question.rowNum == currentQuestion.rowNum);
          if (horizontalQuestion.playerAnswered != playerNum && horizontalQuestion != currentQuestion){
            console.log(`HORIZONTAL BROKE AT ${i}`)
            console.log(horizontalQuestion);
            break;
          }
          if (i == boardState.length - 1){
            addMoney(playerNum, 2500);
          }
        }
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
              return
            }
          }
          powerPlayer.character.correctAnswerBonus = 100;
        }
        break;
      
    }    
  }

  function checkRockoPower(){
    const rockos = playerData.filter(player => player.character.name == "Rocko");
    if (rockos.find(player => player.character.rockoed)){
      createPowerPopUp(rockos[0].playerNum);
      return true;
    }
    return false;
  }

  function disableRockoPower(){
    const rockoInGame = playerData.find(player => player.character.name == "Rocko");
    if (rockoInGame){
      setPlayerData(oldPlayerData => {
        const newPlayerData = [...oldPlayerData];
        const rockos = newPlayerData.filter(player => player.character.name == "Rocko");
        for (const rocko of rockos){
          rocko.character.rockoed = false;
        }
        return newPlayerData;
      })
    }
  }

  function restoreStimpy(){
    const stimpyInGame = playerData.find(player => player.character.name == "Stimpy");
    if (stimpyInGame){
      setPlayerData(oldPlayerData => {
        const newPlayerData = [...oldPlayerData];
        const stimpys = newPlayerData.filter(player => player.character.name == "Stimpy");
        for (const stimpy of stimpys){
          stimpy.character.correctAnswerBonus = 0;
          stimpy.character.correctAnswerModifier = 1.0;
        }
        return newPlayerData;
      })
    }
  }

  function restoreCharacters(){
    disableRockoPower();
    restoreStimpy();
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
    restoreCharacters();
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
      checkPowerOnCorrectAnswer(playerNum);
      if (checkRockoPower()){
        addMoney(playerNum, -currentQuestion.value);
      }
      else{
        addMoney(playerNum, currentQuestion.value * correctPlayer.correctAnswerModifier + correctPlayer.correctAnswerBonus);
      }
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
      addMoney(playerNum, -currentQuestion.value * incorrectPlayer.incorrectAnswerModifier);

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
      {currentScreen == 'pause' && <Pause />}

      {currentScreen != 'room-menu' && <PlayerPanel deletePlayer = {deletePlayer} deletePlayerVisible = {currentScreen == "character-select"}
       playerData={playerData} correctAnswer={correctAnswer} incorrectAnswer={incorrectAnswer} currentBuzzedPlayer={currentBuzzedPlayer}/>}
      {currentPowerPlayer  >= 0 && <PowerPopUp playerData={playerData.find(player => player.playerNum == currentPowerPlayer)}/>}
    </>
  )
}

export default Hoster
