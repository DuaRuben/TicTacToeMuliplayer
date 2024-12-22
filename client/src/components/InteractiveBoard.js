import React, {useState, useEffect} from 'react'
import {Patterns} from '../WinningPatterns'
import './InteractiveBoard.css'
function InteractiveBoard() {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [currSymbol, setCurrSymbol] = useState("X");
    const [winner, setWinner] = useState("");
    const [isGameFinished , setIsGameFinished] = useState(false);
    const [winningPattern, setWinningPattern] = useState([]);

    useEffect(()=>{
        checkWinner()
        checkTie()
    },[board]);

    const resetMiniGame = () =>{
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setCurrSymbol("X");
        setWinner("");
        setIsGameFinished(false);
    }
    const checkWinner = () =>{
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
                setWinner(player);
                setWinningPattern(pattern);
                setIsGameFinished(true)
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
            setWinner("none");
            setIsGameFinished(true)
        }
    }

    const updateBoard = (player, index) =>{
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
    }

    const handleClickEvent = (index) =>{
        if(board[index] !== "" || isGameFinished){
            return;
        }
        if(board[index] === ""){
            updateBoard(currSymbol,index);
            const newCurrSymbol = currSymbol === "X"? "O":"X";
            setCurrSymbol(newCurrSymbol);
        }
        const cell = document.querySelectorAll(".miniCell")[index];
        if (cell) {
            cell.classList.add("animate");
            setTimeout(() => {
                cell.classList.remove("animate");
            }, 300);
        }
    }   
  return (
    <div>
        <div className = "miniBoard">
            <div className = "miniRow"> 
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(0)}>{board[0]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(1)}>{board[1]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(2)}>{board[2]}</div>
            </div>
            <div className = "miniRow"> 
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(3)}>{board[3]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(4)}>{board[4]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(5)}>{board[5]}</div>
            </div>
            <div className = "miniRow"> 
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(6)}>{board[6]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(7)}>{board[7]}</div>
                <div className = {`miniCell ${winningPattern.includes(0) ? "winning" : ""}`} onClick = {() =>handleClickEvent(8)}>{board[8]}</div>
            </div>
        </div>
        {isGameFinished && (
            <button className ="miniResetBtn" onClick={resetMiniGame}>
                Reset
            </button>
        )}
        {isGameFinished ? (
            winner === "none" ? (
                <p className="gameTiedTxt">Oh no the game is Tied!!! Better Luck Next Time</p>
            ) : (
                <p className="winnerTxt">{`Player ${winner} wins!`}</p>
            )
        ) : (
            <p className="nextPlayerTxt">{`Next Player is: ${currSymbol}`}</p>
        )}

        </div>
    )}

export default InteractiveBoard