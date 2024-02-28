
import { useState } from 'react'
import './App.css'


const TURNS = {
  X: 'x',
  O: 'o'
}

//square component should be in another file for best practices
const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null)) //initialised state
  console.log(board)

  const [turn, setTurn] = useState(TURNS.X) //state to check who is next
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    
    if (board[index])return
  //actualizar board
    const newBoard = [...board] //copy to not modify original
    newBoard[index] = turn //x or o the turn is saved here
    setBoard(newBoard)

    //change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X 
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>tic tac toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard} //we are passing the function not executing it. WE DONT EXCECUTE IT BC WILL PASS 9 TIMES THE FUNCTION// WE want to excecute it when click it
              >
                {board[index]}
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
    </main>
  )



}

export default App
