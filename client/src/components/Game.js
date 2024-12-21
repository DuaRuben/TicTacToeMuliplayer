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

    const resetGame = async () =>{
        setResult({winner:"none",state:"none"})
        setPlayerMapping({})
        setIsBoardReset(true)
        //change the playerAssignments
        const newPlayerMapping = {
            X: playerMapping.O,
            O: playerMapping.X,
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

        try{
            await channel.sendEvent({
                type:"reset",
                data:[]
            })
        }
        catch(error){
            console.log("Error sending reset event:",error)
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

    useEffect(()=>{
        const playerAssignmentListener = (event) =>{
            if (JSON.stringify(playerMapping) !== JSON.stringify(event.data)) {
                setPlayerMapping(event.data);
            }
        }
        const resetListener  = (event)=>{
            setResult({winner:"none",state:"none"})
            setIsBoardReset(true)
        }

        const watchingStartListener = (event) =>{
            setPlayersJoined(event.watcher_count === 2)
        };

        const opponentLeftListener  = async (event) =>{
            if (event.user.id !== client.userID) {
                alert("Your opponent has left!! \n Closing the Game.");
                try {
                    await channel.stopWatching();
                    setChannel(null);
                } catch (error) {
                    console.log("Error stopping channel watching:", error);
                }
            }
        }

        channel.on("playerAssignment",playerAssignmentListener)
        channel.on("reset", resetListener);
        channel.on("user.watching.start", watchingStartListener);
        channel.on("opponentLeft",opponentLeftListener);
        return () => {
            channel.off("playerAssignment", playerAssignmentListener);
            channel.off("reset", resetListener);
            channel.off("user.watching.start", watchingStartListener);
            channel.off("opponentLeft",opponentLeftListener);
        };
    },[channel])

    if (!playersJoined){
        return <div className = "waitingMessage"> Waiting for the other player to connect... </div>
    }

  return (
    <div className = "gameContainer">
        {userSymbol && <span>Your symbol: {userSymbol}</span>}
        <Board result ={result} setResult={setResult} playerMapping ={playerMapping} isBoardReset = {isBoardReset} setIsBoardReset = {setIsBoardReset}/>
        <Window>
            <MessageList hideDeletedMessages disableDateSeparator closeReactionSelectorOnClick  messageActions={["react"]}/>
            <MessageInput noFiles grow/>
        </Window>
        <button onClick={async ()=>{
            try{
                await channel.stopWatching()
                setChannel(null)
                await channel.sendEvent({
                    type:"opponentLeft",
                    data: [],
                })
            }catch (error) {
                console.log("Error sending opponentLeft event:", error);
            }
        }}> Leave </button>
        {result.state === "tie" || result.state === "finished" ? (
             <button onClick={resetGame}>Rematch</button>
        ) : null}
        {isResultVisible && <Result message ={message} closeResult = {closeResult}/>}
    </div>
  )
}

export default Game