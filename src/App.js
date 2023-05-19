import React from "react";
import { useState } from "react";

// her bir kare için oluşturulmuş component, board component'i içerisinde 9 kere kullanılmıştır. probs'lar ile click event'i ve değer atamaları yapılması sağlanmıştır.
function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>{value}</button>
}

// kazanan oyuncuyu bulma
function findWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      console.log("kazanan:" , squares[a])
      return squares[a];
    }
  }
  return null;

}


function Board({click, squares, onPlay}) {

  function handleClick(i) { // her bir kareye tıklandığında click durumuna göre kare içerisinde X veya O yazılması sağlandı.
    if(squares[i] || findWinner(squares)) { // tıklanan kare içerisinde bir değer varsa ya da kazanan var ise değer değiştirme yapılmaması için kontrol sağlandı.
      return;
    }
    const nextSquares = squares.slice();

    click ? nextSquares[i] = "X" : nextSquares[i] = "O";

    onPlay(nextSquares);
  }


  // Sıradaki oyuncuyu göstermek ve kazanan belli olduğunda kazanan kişiyi göstermek için oluşturuldu.
  const winner = findWinner(squares);
  let status;
  let congrats = "The game is going on";
  if(winner) {
    status = "Winner: " + winner;
    let statusColor = document.querySelector(".status");
    statusColor.style.color = "#8B1874";
    statusColor.style.fontWeight = "bold";
    congrats = "Congrats to you!!"
  }
  else {
    status= "Next Player: " + (click ? "X" : "O");
  }


  // Oyun Gövdesi
  return (
    <div>
      <div className="congrats">{congrats}</div>
      <div className="status">{status}</div>
      <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </div>
  );
}

// Oyunun Ana Gövdesi için oluşturulan Component
export default function Game() {
  const [click, setClick] = useState(true); // X ve O oyuncu sırasını kontrol etmek için durum ataması yapıldı.
  const [history, setHistory] = useState([Array(9).fill(null)]); // hamle geçmişini tutmak için oluşturulmuş state. her hamlede güncellenen yeni dizi bu state dizisine gönderilecek. bu dizinin her bir elemanı yine bir dizi olacak.
  const [current, setCurrent] = useState(0)
  const currentSquares = history[current]; // history state'nin son elemanı en güncel durumu verir.
  console.log("current: ", current);
  console.log("history: ", history);
  console.log("currentSquares => history[current] : " , currentSquares);


  function jumpTo(nextMove) {
    setCurrent(nextMove)
    setClick(nextMove % 2 === 0);
    console.log("current değişti" , nextMove)


  }

  const moves = history.map((squares, move) => {
    let desc;
    if(move > 0) {
      desc = "go to move #" + move; 
    }
    else {
      desc = "go to game start"
    }

    return(
      <li key={move}>
      <button  className="moveButton" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })



  function handlePlay(nextSquares) {
    console.log("history: ", history);
    console.log("current: ",current);
    console.log("current+1: ",current + 1);
    console.log("history.slice(0, current+1): ",history.slice(0, current + 1));
    console.log("nextSquares(board içindeki handleclick'ten geliyor): ",nextSquares);
    const nextHistory = [...history.slice(0, current + 1 ), nextSquares];
    setHistory(nextHistory);
    console.log("nextHistory: ", nextHistory);
    setCurrent(nextHistory.length - 1);
    console.log("nextHistory.length-1", nextHistory.length -1 );
    console.log("current nextHistory.length-1 yapıldıktan sonra: ");
    console.log(current)
    setClick(!click);
    
  }
return (
<div className="game">
  <div className="game-board">
    <Board click={click} squares = {currentSquares} onPlay={handlePlay}></Board>
  </div>
  <div className="game-info">
 <ol className="moves">{moves}</ol>
  </div>
</div>
)
}