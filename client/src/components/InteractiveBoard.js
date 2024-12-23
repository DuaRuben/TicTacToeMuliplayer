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

    const updateMessage = (message) =>{
        const messageElem = document.getElementById("dialogMessage");
        messageElem.textContent = message;
    }
    const resetMiniGame = () =>{
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setCurrSymbol("X");
        setWinner("");
        setIsGameFinished(false);
        updateMessage("Want to go Again?")
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
                updateMessage(`🎉 Player ${player} wins!`);
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
            updateMessage('🤝 Its a tie! Better luck next time.');
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
            updateMessage("Next player is: "+ currSymbol);
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
        <div id= "gameDialog" className = "dialogBox">
            <p id = "dialogMessage"> Do you want to bursh off your skills before you head off to your match? </p>
        </div>
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
        {/* {isGameFinished ? (
            winner === "none" ? (
                <p className="gameTiedTxt">Oh no the game is Tied!!! Better Luck Next Time</p>
            ) : (
                <p className="winnerTxt">{`Player ${winner} wins!`}</p>
            )
        ) : (
            <p className="nextPlayerTxt">{`Next Player is: ${currSymbol}`}</p>
        )} */}

    </div>
    )}

export default InteractiveBoard