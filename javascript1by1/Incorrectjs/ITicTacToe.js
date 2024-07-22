class TicTacToe { 
 constructor() { 
 this.board = Array(9).fill(null); 
 this.currentPlayer = 'X'; 
 this.render(); 
 } 
 handleClick(index) { 
 if (this.board[index] || this.checkWinner()) return; 
 this.board[index] = this.currentPlayer; 
 if (this.checkWinner()) { 
 alert(`Player ${this.currentPlayer} wins!`); 
 } else if (!this.board.includes(null)) { 
 alert('Draw!'); 
 } 
 this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; 
 this.render(); 
 } 
 checkWinner() { 
 const winningCombinations = [ 
 [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows 
 [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns 
 [0, 4, 8], [2, 4, 6] // diagonals 
 ]; 
 for (const [a, b, c] of winningCombinations) { 
 if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) { 
 return true; 
 } 
 } 
 return false; 
 } 
 reset() { 
 this.board.fill(null); 
 this.currentPlayer = 'X'; 
 this.render(); 
 } 
 render() { 
 const boardElement = document.getElementById('board'); 
 boardElement.innerHTML = ''; 
 this.board.forEach((cell, index) => { 
 const cellElement = document.createElement('div'); 
 cellElement.className = 'cell'; 
 cellElement.textContent = cell; 
 cellElement.onclick = () => this.handleClick(index); 
 boardElement.appendChild(cellElement); 
 }); 
 } 
} 
const game = new TicTacToe(); 
document.getElementById('reset-button').onclick = () => game.reset(); 
