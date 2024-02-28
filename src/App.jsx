
import { useState } from 'react'
import './App.css'
import { Square } from './components/square'
import {TURNS, WINNER_COMBOS} from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/winnerModal.jsx'
import confetti from 'canvas-confetti'



function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) //initialised state
  console.log(board)

  const [turn, setTurn] = useState(TURNS.X) //state to check who is next
 
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }



  const updateBoard = (index) => {

    if (board[index] || winner) return
    //actualizar board
    const newBoard = [...board] //copy to not modify original
    newBoard[index] = turn //x or o the turn is saved here
    setBoard(newBoard)
    //change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)


    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }


  

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard} //we are passing the function not executing it. WE DONT EXCECUTE IT BC WILL PASS 9 TIMES THE FUNCTION// WE want to excecute it when click it
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )



}

export default App
