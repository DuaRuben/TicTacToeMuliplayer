import React from 'react'
import './Result.css'
function Result({message,closeResult}) {
  return (
    <div className ="result">
        <div className ="result-inner">
            <p> {message} </p>
            <button className = "close-btn" onClick = {closeResult}> X </button>
        </div>
    </div>
  );
}

export default Result