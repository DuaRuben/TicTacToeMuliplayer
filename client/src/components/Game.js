import React, { useState, useEffect } from "react";
import Board from './Board'
import {Window, MessageList, MessageInput, useChatContext } from 'stream-chat-react'
import Result from './Result'
import "./Game.css"

function Game({channel, setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner:"none",state:"none"})
    const [isResultVisible , setResultVisible] = useState(false)
    const [message, setMessage] = useState("")
    const [playerMapping, setPlayerMapping] = useState({});
    const [isBoardReset, setIsBoardReset] = useState(false);
    const [userSymbol, setUserSymbol] = useState("");
    const { client } = useChatContext()

    const showResult = (msg) =>{
        setMessage(msg)
        setResultVisible(true)
    }

    const closeResult = () =>{
        setMessage("")
        setResultVisible(false)
    }

    const leaveGame = async (flag)=>{
        try{
            await channel.stopWatching()
            setChannel(null)
            await channel.sendEvent({
                type:"opponentLeft",
                data: {displayOppLeftMessage:flag},
            })
        }catch (error) {
            console.log("Error sending opponentLeft event:", error);
        }
    }

    const rematchGame = async () =>{
        try{
            await channel.sendEvent({
                type:"rematchRequest",
                data: {from: client.userID},
            })
        }catch(error){
            console.log("Error sending rematch request event:", error);
        }
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
                    setPlayerMapping(newPlayerMapping);
                    await channel.sendEvent({
                        type:"playerAssignment",
                        data: newPlayerMapping,
                    })

                }catch(error){
                    console.log("Error sending player assignment event:",error)
                }
            }
        }
        randomizePlayerAssignment()
      }, [channel.state.members]);

    
    useEffect(()=>{
        if(result.state === "finished"){
            showResult(`${result.winner} won`)
        }
        else if(result.state === "tie"){
            showResult(`Game Tied`)
        }
    },[result.state])

    useEffect(()=>{
        const  symbol = Object.keys(playerMapping).find(symbol => playerMapping[symbol].id === client.userID)
        setUserSymbol(symbol)
    },[playerMapping,client.userID])

    useEffect(() => {
        if (playersJoined && userSymbol) {
            alert(userSymbol === "X" ? "You have the First Turn" : "You have the Second Turn");
        }
    }, [playersJoined,userSymbol]);

    useEffect(()=>{
        const playerAssignmentListener = (event) =>{
            if (event.user.id!== client.userID  && JSON.stringify(playerMapping) !== JSON.stringify(event.data)) {
                setPlayerMapping(event.data);
            }
        }
        const watchingStartListener = (event) =>{
            setPlayersJoined(event.watcher_count === 2)
        };

        const opponentLeftListener  = async (event) =>{
            if (event.user.id !== client.userID) {
                if(event.data.displayOppLeftMessage){
                    alert("Your opponent has left!! \n Closing the Game.");
                }
                try {
                    await channel.stopWatching();
                    setChannel(null);
                } catch (error) {
                    console.log("Error stopping channel watching:", error);
                }
            }
        }

        const rematchRequestListener = async (event) =>{
            if(event.user.id !== client.userID){
                const accept = window.confirm(`${event.user.name} has requested a rematch. Do you accept?`);
                if (accept) {
                    try{
                        await channel.sendEvent({
                            type:"rematchResponse",
                            data:{accepted:true},
                        })
                        setResult({winner:"none",state:"none"})
                        setIsBoardReset(true)
                    }catch(error){
                        console.log("Error sending rematch response:",error);
                    }
                }else{
                    try{
                        await channel.sendEvent({
                            type:"rematchResponse",
                            data:{accepted:false},
                        })
                        leaveGame(false);
                    }catch(error){
                        console.log("Error sending rematch response:",error);
                    }
                }
            }
        }
        const rematchResponseListener = async (event)=>{
            if(event.user.id !== client.userID){
                if(event.data.accepted){
                    alert("Opponent accepted the rematch!");
                    //change the playerAssignments
                    const newPlayerMapping = {
                        X: playerMapping.O,
                        O: playerMapping.X,
                    };
                    setPlayerMapping(newPlayerMapping);
                    try{
                        await channel.sendEvent({
                            type:"playerAssignment",
                            data: newPlayerMapping,
                        })
                        setResult({winner:"none",state:"none"})
                        setIsBoardReset(true)
                    }catch(error){
                        console.log("Error sending player assignment event:",error)
                    }
                }
                else{
                    alert("Opponent declined the rematch.");
                    leaveGame(false)
                }
            }
        }
        channel.on("playerAssignment",playerAssignmentListener)
        channel.on("user.watching.start", watchingStartListener);
        channel.on("opponentLeft",opponentLeftListener);
        channel.on("rematchRequest", rematchRequestListener);
        channel.on("rematchResponse",rematchResponseListener)
        return () => {
            channel.off("playerAssignment", playerAssignmentListener);
            channel.off("user.watching.start", watchingStartListener);
            channel.off("opponentLeft",opponentLeftListener);
            channel.off("rematchRequest",rematchRequestListener);
            channel.off("rematchResponse",rematchResponseListener);
        };
    },[channel,playerMapping])

    if (!playersJoined){
        return <div className = "waitingMessage"> Waiting for the other player to connect... </div>
    }

  return (
    <div className = "gameContainer">
        {userSymbol && <span className = "symbolStyle">Your symbol: {userSymbol}</span>}
        <Board result ={result} setResult={setResult} playerMapping ={playerMapping} isBoardReset = {isBoardReset} setIsBoardReset = {setIsBoardReset}/>
        <Window>
            <MessageList hideDeletedMessages disableDateSeparator closeReactionSelectorOnClick  messageActions={["react"]}/>
            <MessageInput noFiles grow/>
        </Window>
        <button className = "btn" onClick={()=>leaveGame(true)}> Leave </button>
        {result.state === "tie" || result.state === "finished" ? (
             <button onClick={rematchGame} className = "btn">Rematch</button>
        ) : null}
        {isResultVisible && <Result message ={message} closeResult = {closeResult}/>}
    </div>
  )
}

export default Game
