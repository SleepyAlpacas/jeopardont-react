import React from 'react'
import questionsData from '../questionsData.jsx'
import Board from '../components/Board.jsx'
import PlayerPanel from '../components/PlayerPanel.jsx'
import QuestionAnswerScreen from '../components/QuestionAnswerScreen.jsx'
import { nanoid } from 'nanoid';

var currentQuestion;
var currentQuestionId;
var questionsLeft = questionsData.rows * questionsData.columns;

function App() {
  const [boardState, setBoardState] = React.useState(initBoard());
  const [currentScreen, setCurrentScreen] = React.useState('board');
  const titles = initTitles();

  console.log(questionsLeft);

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

  return (
    <>
      {currentScreen == 'board' && <Board boardState = {boardState} titles={titles} showQuestion={showQuestion}/>}
      {(currentScreen == 'question' || currentScreen == 'answer') && 
        <QuestionAnswerScreen currentScreen = {currentScreen} showAnswer={showAnswer} showBoard={showBoard}
        question={currentQuestion.question} answer={currentQuestion.answer}/>}
      {currentScreen == 'wager' && <Wager />}
      <PlayerPanel />
    </>
  )
}

export default App
