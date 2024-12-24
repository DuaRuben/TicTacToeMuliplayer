import React from 'react'

function Square({makeMove , value, index, stopGame,winningPattern}) {
  return (
    <div className ={`cell 
        ${winningPattern.includes(index) && stopGame ? "winning" : ""} 
        ${value === "X" ? "xValClass" :value === "O" ? "oValClass" : ""}`} onClick = {makeMove}>
        {value}
    </div>
  )
}

export default Square