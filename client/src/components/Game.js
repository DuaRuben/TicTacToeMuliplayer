import React, { useState } from "react";
import Board from './Board'
import {Window, MessageList, MessageInput} from 'stream-chat-react'
import "./Game.css"

function Game({channel, setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner:"none",state:"none"})
    channel.on("user.watching.start",(event) =>{
        setPlayersJoined(event.watcher_count === 2)
    });
    if (!playersJoined){
        return <div> Waiting for the other player to connect... </div>
    }
  return (
    <div className = "gameContainer">
        <Board result ={result} setResult={setResult}/>
        <Window>
            <MessageList hideDeletedMessages disableDateSeparator closeReactionSelectorOnClick  messageActions={["react"]}/>
            <MessageInput noFiles grow/>
        </Window>
        <button onClick={async ()=>{
            await channel.stopWatching()
            setChannel(null)
        }}> Leave </button>
        {result.state == "finished" && <div>{result.winner} Won the Game </div>}
        {result.state == "tie" ** <div>Game Tied</div>}
        {/* Leave Game */}
        {/* Reset Game and Counter Win and Loss */}
    </div>
  )
}

export default Game