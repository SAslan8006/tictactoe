import React, { useState, useEffect } from "react";

const BOARD_SIZE = 4;

const TicTacToe = () => {
  const [board, setBoard] = useState(
    Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(null))
  );
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Bilgisayar oynaması için player kullancısını oynamasını baz aldık useEffect içerisine attık her değişiklikte çalışması için
  useEffect(() => {
    if (player === "O") {
      makeComputerMove();
    }
  }, [player]);

  const handleSquareClick = (row, col) => {
    if (board[row][col] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[row][col] = player;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const makeComputerMove = () => {
    const newBoard = board.slice();
    let row = Math.floor(Math.random() * BOARD_SIZE);
    let col = Math.floor(Math.random() * BOARD_SIZE);
    while (newBoard[row][col]) {
      row = Math.floor(Math.random() * BOARD_SIZE);
      col = Math.floor(Math.random() * BOARD_SIZE);
    }
    newBoard[row][col] = player === "X" ? "X" : "O";
    setBoard(newBoard);
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board) => {
    // Check rows
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (
        board[row][0] &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2] &&
        board[row][2] === board[row][3]
      ) {
        return board[row][0];
      }
    }

    // Check columns
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (
        board[0][col] &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col] &&
        board[2][col] === board[3][col]
      ) {
        return board[0][col];
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[2][2] === board[3][3]
    ) {
      return board[0][0];
    }
    if (
      board[0][3] &&
      board[0][3] === board[1][2] &&
      board[1][2] === board[2][1] &&
      board[2][1] === board[3][0]
    ) {
      return board[0][3];
    }

    const filledSquares = board.reduce(
      (count, row) => count + row.filter(Boolean).length,
      0
    );

    // Check for tie
    if (filledSquares === 16) {
      return alert("Tie");
    }

    // Game is not over
    return null;
  };

  const renderBoardSquare = (row, col) => {
    return (
      <button className="square" onClick={() => handleSquareClick(row, col)}>
        {board[row][col]}
      </button>
    );
  };

  const renderGameBoard = () => {
    return (
      <div>
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((_, colIndex) => renderBoardSquare(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    );
  };

  const renderGameStatus = () => {
    if (winner) {
      return alert("Winner: " + winner);
    } else {
      return player === "X"
        ? " Next player: Oyuncu"
        : " Next player: Bilgisayar";
    }
  };

  return (
    <div className="game">
      <div className="game-board">{renderGameBoard()}</div>
      <div className="game-info">{renderGameStatus()}</div>
    </div>
  );
};

export default TicTacToe;
