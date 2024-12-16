import React from 'react'

function Square({makeMove , value}) {
  return (
    <div className ="cell" onClick = {makeMove}>
        {value}
    </div>
  )
}

export default Square