import React from 'react';
import { useState } from 'react'
import './App.css'
import { Square } from './components/square'
import { TURNS, WINNER_COMBOS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/winnerModal.jsx'
import confetti from 'canvas-confetti'



function App() {
  console.log("render")
  const [board, setBoard] = useState(() => {
    console.log("initialized state")
    const boardfromStorage = window.localStorage.getItem('board')
    if (boardfromStorage) return JSON.parse(boardfromStorage)
    return Array(9).fill(null) //initialised state
  })

  console.log(board)
  //state to check who is next but also save it in localstogare
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // resetGameStorage()
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turns')
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

    //save the game
    window.localStorage.setItem('board', JSON.stringify(newBoard)) //we save the state of the board, but we need to convert to string bc if we not stringify will save the awway
    window.localStorage.setItem('turn', newTurn)
    //check if there is a winner
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
      <button onClick={resetGame}>Reset game</button>
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )



}

export default App
