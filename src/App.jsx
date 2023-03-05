import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initalState = Array(9).fill("")

const solutions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]

function App() {
  const [values, setValues] = useState([...initalState])
  const [currentPlayer, setCurrentPlayer] = useState(true) // X-true and O-false

  function markBox(index){

    if(values[index] !== "") return

    let current = currentPlayer ? "X" : "O"
    setCurrentPlayer(prev=>!prev)

    let tmp = [...values]
    tmp[index] = current
    setValues(tmp)

    // check for the winner
    solutions.forEach((solution)=>{
      let solString = `${tmp[solution[0]]}${tmp[solution[1]]}${tmp[solution[2]]}`
      if(solString === "XXX" || solString === "OOO"){
        toast(`Winner is ${current}`)
        setCurrentPlayer(true)
        setValues(initalState)
      }
    })
  }

  function resetBoard(){
    setCurrentPlayer(true)
    setValues(initalState)
  }

  return (
    <div className="App">
      <ToastContainer />
     <h1>Tic Tac Toe</h1>
     <div>Current Player - {currentPlayer ? "X" : "O"}</div>
     <div className="container">
      <ul>
        {values.map((item, index)=> <li onClick={()=>markBox(index)} key={index}>{item}</li>)}
      </ul>
     </div>
     <button onClick={resetBoard}>Reset</button>
    </div>
  )
}

export default App
