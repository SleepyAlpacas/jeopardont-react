import React from 'react'
import questionsData from '../questionsData.jsx'
import Board from '../components/Board.jsx'
import PlayerPanel from '../components/PlayerPanel.jsx'

function App() {
  const [boardState, setBoardState] = React.useState(initBoard());

  function initBoard(){
      let initializedBoard = [];
      for (const column of questionsData['board-data']){
        let boardColumn = column['column-questions'].map(question => {
          return {
            ...question,
            answered: false,
            playerAnswered: undefined,
            characterAnswered: undefined
          }
        })
  
        initializedBoard.push(boardColumn);
      }
  
      return initializedBoard;
  }
  
  console.log(boardState)

  return (
    <>
      <Board />
      <PlayerPanel />
    </>
  )
}

export default App
