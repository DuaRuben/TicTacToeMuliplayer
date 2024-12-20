import React, { useState, useEffect } from "react";
import Board from './Board'
import {Window, MessageList, MessageInput} from 'stream-chat-react'
import Result from './Result'
import "./Game.css"

function Game({channel, setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner:"none",state:"none"})
    const [isResultVisible , setResultVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [playerMapping, setPlayerMapping] = useState({});

    const showResult = (msg) =>{
        setMessage(msg)
        setResultVisible(true)
    }
    const closeResult = () =>{
        setMessage("")
        setResultVisible(false)
    }
    useEffect(()=>{
        const members = channel.state.members;
        const players = Object.keys(members);
        const sortedPlayers = players.sort();
        const randomizePlayerAssignment  = async() =>{
            if (sortedPlayers.length === 2) {
                const randomAssignment = Math.random() >0.5;
                const newPlayerMapping = randomAssignment ? {
                    X: {
                        name: members[sortedPlayers[0]].user.name,
                        id: members[sortedPlayers[0]].user.id,
                    },
                    O:{ 
                        name: members[sortedPlayers[1]].user.name,
                        id : members[sortedPlayers[1]].user.id,
                    }
                }:{
                    X: {
                        name: members[sortedPlayers[1]].user.name,
                        id: members[sortedPlayers[1]].user.id,
                    },
                    O:{ 
                        name: members[sortedPlayers[0]].user.name,
                        id : members[sortedPlayers[0]].user.id,
                    }
                };
                try{
                    await channel.sendEvent({
                        type:"playerAssignment",
                        data: newPlayerMapping,
                    })
                    setPlayerMapping(newPlayerMapping);

                }catch(error){
                    console.log("Error sending player assignment event:",error)
                }
            }
        }
        randomizePlayerAssignment()
      }, [channel.state.members]);

    useEffect(()=>{
        if(result.state == "finished"){
            showResult(`${result.winner} won`)
        }
        else if(result.state == "tie"){
            showResult(`Game Tied`)
        }
    },[result.state])

    useEffect(()=>{
        channel.on("playerAssignment",(event)=>{
            if(playerMapping!=event.data){
                setPlayerMapping(event.data)
            }
        })
    })
    channel.on("user.watching.start",(event) =>{
        setPlayersJoined(event.watcher_count === 2)
    });
    if (!playersJoined){
        return <div> Waiting for the other player to connect... </div>
    }
  return (
    <div className = "gameContainer">
        <Board result ={result} setResult={setResult} playerMapping ={playerMapping}/>
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