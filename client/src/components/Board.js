import React, {useState, useEffect} from 'react'
import Square from './Square'
import {useChannelStateContext, useChatContext} from 'stream-chat-react'
import {Patterns} from '../WinningPatterns'
function Board({result,setResult}) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");
    
    const {channel} = useChannelStateContext()
    const {client} = useChatContext()

    useEffect(()=>{
        checkWin();
        checkTie();
    },[board])
    const updateBoard = (player, index) =>{
        const newBoard = [...board];
        newBoard[index] = player;
        return newBoard;
    }

    const checkWin = () =>{
        Patterns.forEach((pattern) => {
            const player = board[pattern[0]]
            if(player == ""){
                return;
            }
            let foundWinningPattern = true;
            pattern.forEach((index) =>{
                if(board[index]!= player){
                    foundWinningPattern = false;
                }
            });
            if(foundWinningPattern){
                alert("Winner", player)
                setResult({winner: player, state:"finished"})
            }
        });

    }
    
    const checkTie = () =>{
        let isBoardFilled = true;
        board.forEach((Val,index)=>{
            if(board[index] == "")
                isBoardFilled = false;
        })
        if(isBoardFilled){
            alert("Game Tied");
            setResult({winner:"none", state:"tie"})
        }
    }
    const makeMove = async (cell) =>{
        if( turn === player && board[cell]  === ""){
            setTurn(player === "X" ? "O" : "X");
            
            await channel.sendEvent({
                type : "move",
                data : {cell, player},
            });
            setBoard(updateBoard(player,cell))
        }
    }

    channel.on((event) => {
        if(event.type == "move" && event.user.id !== client.userID){
            const opponentPlayer = event.data.player == "X" ? "O" : "X";
            setTurn(opponentPlayer);
            setPlayer(opponentPlayer);
            setBoard(updateBoard(event.data.player,event.data.cell))
        }
    })
  return (
    <div className = "board">
        <div className = "row"> 
            <Square makeMove = {() => makeMove(0)} value = {board[0]}/>
            <Square makeMove = {() => makeMove(1)} value = {board[1]}/>
            <Square makeMove = {() => makeMove(2)} value = {board[2]}/>
        </div>
        <div className = "row"> 
            <Square makeMove = {() => makeMove(3)} value = {board[3]}/>
            <Square makeMove = {() => makeMove(4)} value = {board[4]}/>
            <Square makeMove = {() => makeMove(5)} value = {board[5]}/>
        </div>
        <div className = "row"> 
            <Square makeMove = {() => makeMove(6)} value = {board[6]}/>
            <Square makeMove = {() => makeMove(7)} value = {board[7]}/>
            <Square makeMove = {() => makeMove(8)} value = {board[8]}/>
        </div>
    </div>
  )
}

export default Board