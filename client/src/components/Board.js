import React, {useState, useEffect} from 'react'
import Square from './Square'
import {useChannelStateContext, useChatContext} from 'stream-chat-react'
import {Patterns} from '../WinningPatterns'

function Board({result,setResult, playerMapping, isBoardReset, setIsBoardReset}) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = useState("X");
    const [turn, setTurn] = useState("X");
    const [stopGame, setStopGame ] = useState(false);
    const [winningPattern, setWinningPattern] = useState([]);

    const {channel} = useChannelStateContext()
    const {client} = useChatContext()

    useEffect(()=>{
        checkTie();
        checkWin();
    },[board])

    useEffect(() =>{
        const newBoard = ["", "", "", "", "", "", "", "", ""]
        setBoard(newBoard)
        setTurn("X")
        setPlayer("X")
        setStopGame(false)
        setIsBoardReset(false)
    },[isBoardReset,setIsBoardReset])

    const updateBoard = (player, index) =>{
        const newBoard = [...board];
        newBoard[index] = player;
        return newBoard;
    }

    const checkWin = () =>{
        Patterns.forEach((pattern) => {
            const player = board[pattern[0]]
            if(player === ""){
                return;
            }
            let foundWinningPattern = true;
            pattern.forEach((index) =>{
                if(board[index]!== player){
                    foundWinningPattern = false;
                }
            });
            if(foundWinningPattern){
                setResult({winner: playerMapping[player].name, state:"finished"})
                setStopGame(true);
                setWinningPattern(pattern);
            }
        });

    }
    
    const checkTie = () =>{
        let isBoardFilled = true;
        board.forEach((Val,index)=>{
            if(board[index] === "")
                isBoardFilled = false;
        })
        if(isBoardFilled){
            setResult({winner:"none", state:"tie"})
            setStopGame(true);
        }
    }
    const makeMove = async (cell) =>{
        if(stopGame){
            return;
        }
        if( client.userID === playerMapping[turn].id){
            if( turn === player && board[cell]  === ""){
                setTurn(player === "X" ? "O" : "X");
                await channel.sendEvent({
                    type : "move",
                    data : {cell, player},
                });
                setBoard(updateBoard(player,cell))
            }
        }
        else{
            alert('Not your turn yet')
        }
    }

    channel.on((event) => {
        if(event.type === "move" && event.user.id !== client.userID){
            const opponentPlayer = event.data.player === "X" ? "O" : "X";
            setTurn(opponentPlayer);
            setPlayer(opponentPlayer);
            setBoard(updateBoard(event.data.player,event.data.cell))
        }
    })
  return (
    <div className = "board">
        <div className = "row"> 
            <Square makeMove = {() => makeMove(0)} value = {board[0]} index = {0} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(1)} value = {board[1]} index = {1} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(2)} value = {board[2]} index = {2} stopGame = {stopGame} winningPattern = {winningPattern}/>
        </div>
        <div className = "row"> 
            <Square makeMove = {() => makeMove(3)} value = {board[3]} index = {3} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(4)} value = {board[4]} index = {4} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(5)} value = {board[5]} index = {5} stopGame = {stopGame} winningPattern = {winningPattern}/>
        </div>
        <div className = "row"> 
            <Square makeMove = {() => makeMove(6)} value = {board[6]} index = {6} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(7)} value = {board[7]} index = {7} stopGame = {stopGame} winningPattern = {winningPattern}/>
            <Square makeMove = {() => makeMove(8)} value = {board[8]} index = {8} stopGame = {stopGame} winningPattern = {winningPattern}/>
        </div>
    </div>
  )
}

export default Board