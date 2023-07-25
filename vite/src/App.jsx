import React from 'react'
import Hoster from './components/Hoster';
import Joiner from './components/Joiner';

function App() {

  const [gameMode, setGameMode] = React.useState("");

  return (
    <>
      {!gameMode &&
        <>
          <button onClick={() => setGameMode("host")}>Host Game</button>
          <button onClick={() => setGameMode("join")}>Join Game</button>
        </>
      }
      {gameMode == 'host' && <Hoster />}
      {gameMode == 'join' && <Joiner />}
    </>
  )
}

export default App
