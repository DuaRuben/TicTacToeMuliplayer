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
        checkTie()
        checkWinner()
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
                setIsGameFinished(true);
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
            setIsGameFinished(true);
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
        <div className = "interactiveBoardContainner-inner">
            <div className = "miniBoard">
                <div className = "miniRow"> 
                    {[0, 1, 2].map(index => (
                                <div key={index} className={`miniCell 
                                    ${winningPattern.includes(index) && isGameFinished ? "winning" : ""} 
                                    ${board[index] === "X" ? "xClass" : board[index] === "O" ? "oClass" : ""}`} 
                                    onClick={() => handleClickEvent(index)}>{board[index]}</div>
                            ))}
                </div>
                <div className = "miniRow"> 
                    {[3, 4, 5].map(index => (
                                <div key={index} className={`miniCell 
                                    ${winningPattern.includes(index) && isGameFinished ? "winning" : ""} 
                                    ${board[index] === "X" ? "xClass" : board[index] === "O" ? "oClass" : ""}`} 
                                    onClick={() => handleClickEvent(index)}>{board[index]}</div>
                            ))}
                </div>
                <div className = "miniRow"> 
                    {[6, 7, 8].map(index => (
                                <div key={index} className={`miniCell 
                                    ${winningPattern.includes(index) && isGameFinished ? "winning" : ""} 
                                    ${board[index] === "X" ? "xClass" : board[index] === "O" ? "oClass" : ""}`} 
                                    onClick={() => handleClickEvent(index)}>{board[index]}</div>
                            ))}
                </div>
            </div>
            {isGameFinished && (
            <button className ="miniResetBtn" onClick={resetMiniGame}>
                Reset
            </button>
            )}
        </div>
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