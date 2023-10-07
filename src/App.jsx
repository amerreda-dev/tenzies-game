import React, { useState } from 'react'
import './App.css'
import Die from '../components/Die.jsx'
import {nanoid} from "nanoid"

function App() {
  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice]=React.useState(allNewDice())

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

  const diceElements = dice.map((item)=>
   <Die value={item.value} key={item.id}
   isHeld={item.isHeld} holdDice={holdDice}
   id={item.id}
   />)

   function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

   function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}


  function allNewDice (){
    const newDice = []
    for (let i = 0 ;i<10 ; i++){
      newDice.push(generateNewDie())
    }
    
    return newDice
  }
  function rollDice() {
    if(!tenzies){
    setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
      }))
    } else{
          setTenzies(false)
          setDice(allNewDice)
  }
}

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>  
                {diceElements} 
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies? "New Game":"Roll Dice"}</button>
    </main>
      
  )
}

export default App
