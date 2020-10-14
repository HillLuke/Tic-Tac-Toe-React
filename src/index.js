import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* This is a controlled component as the Board component has full controll over it. */
class Square extends React.Component {
    render() {
      return (
        /* 
            Arrow function expressions () => are compact alternatives to function expressions
            use the passed in onClick pop for the onClick handler.
        */
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }

  /*
    The Square component can be turned in to a 'Function Component'
    These are a simpler way to write components that only contain a render method, and dont have thier own state

    function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
        );
    }   
   */

   /* Function Component */
  function PlayAgain(props) {
    return (
        <div className="reset">
            <h2>{props.winner}</h2>
            <button onClick={props.onClick} className="btn btn-light">
                Play again
            </button>
        </div>
        );
    }   

  class Board extends React.Component {
    constructor(props){
        super(props);/* always call super when defining the constuctor*/
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            hasWinner: false,
        }
    }

    resetBoard(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            hasWinner: false,
        })
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; 
        /* when setState is called, the component and all child components are re-rendered */
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, /*invert xIsNext*/
        });
      }

    renderSquare(i) {
      /*
        Render a React.Component
        pass a property called value to Square component 
        set the onClick property to call handleClick
      */
      return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
    }
  
    render() {
        const winner = calculateWinner(this.state.squares);
        let nextTurn;
        let playAgain;

        if(!winner){
            nextTurn = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        else{
            playAgain = <PlayAgain winner={`Winner: ${winner}`} onClick={() => this.resetBoard()}/>
        }
  
      return (
        <div className="board">
          <h1 className="status">{nextTurn}</h1>
            {playAgain}
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
          <div className="reset-container">              
            <button onClick={() => this.resetBoard()} className="btn btn-secondary">
                Reset
            </button>
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      /*
        returns a description of what to render to the screen.
        HTML tags, at build time is transformed to React.creadeElement(<element>,<children>) - called JSX syntax
      */
    render() {
      return (
        <div className="game">
          <div className="game-board"> 
            <Board /> 
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  //Render Game component in the element with id=root
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }