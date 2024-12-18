import React, { useState,useEffect } from "react";
import Board from './Board'
import {Window, MessageList, MessageInput} from 'stream-chat-react'
import Result from './Result'
import "./Game.css"

function Game({channel, setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner:"none",state:"none"})
    const [isResultVisible , setResultVisible] = useState(false)
    const [message, setMessage] = useState("")
    const showResult = (msg) =>{
        setMessage(msg)
        setResultVisible(true)
    }
    const closeResult = () =>{
        setMessage("")
        setResultVisible(false)
    }
    useEffect(()=>{
        if(result.state == "finished"){
            showResult(`${result.winner} Won the Game`)
        }
        else if(result.state == "tie"){
            showResult(`Game Tied`)
        }
    },[result.state])

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
        {isResultVisible && <Result message ={message} closeResult = {closeResult}/>}
        {/* Leave Game */}
        {/* Reset Game and Counter Win and Loss */}
    </div>
  )
}

export default Game