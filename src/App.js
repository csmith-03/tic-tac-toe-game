import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winningSquares: [],
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winningSquares: [],
    });
  }

  renderSquare(i) {
    const isWinningSquare = this.state.winningSquares.includes(i);
    return (
      <button
        className={`square ${isWinningSquare ? 'winning-square' : ''}`}
        onClick={() => this.handleClick(i)}
      >
        {this.state.squares[i]}
      </button>
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = 'Winner: ' + winner.symbol;
      this.state.winningSquares = winner.squares; // Update winningSquares
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h1 className="game-title">Tic Tac Toe Game</h1> {/* Add the heading here */}
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>


        <div className="button-container">
          <button className="new-game-button" onClick={() => this.resetGame()}>New Game</button>
        </div>


      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const element of lines) {
    const [a, b, c] = element;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        symbol: squares[a], // Return the winning symbol ('X' or 'O')
        squares: [a, b, c], // Return the array of winning squares
      };
    }
  }

  return null;
}

export default App;
