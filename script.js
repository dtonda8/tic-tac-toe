const containerDiv = document.querySelector("#main-container");
const resultsDiv = document.querySelector("#results");
const playAgainBtn = document.querySelector("#play-again-btn");

playAgainBtn.addEventListener('click', () => {
    gameBoard.isPlaying = true;
    gameBoard.board = [null, null, null, null, null, null, null, null, null];
    resultsDiv.textContent = '';
    playAgainBtn.style.display = 'none';

    let boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.textContent = '')
})


const addSymbol = (e) => {
    if (!(e.target.textContent) && gameBoard.isPlaying) {
        let symbol = gameBoard.getSymbol();
        e.target.textContent = `${symbol}`;
        gameBoard.updateBoard(e.target.id, symbol);
        gameBoard.checkForWinner(symbol);
    } 
}

for (let i = 0; i < 9; i++) {
    const boxDiv = document.createElement('div');
    boxDiv.setAttribute('id', `${i}`)
    boxDiv.classList.add('box')
    boxDiv.addEventListener('click', addSymbol)
    containerDiv.appendChild(boxDiv)
}

const gameBoard = {
    board: [null, null, null, null, null, null, null, null, null],
    turns: 0,
    roundNumber: 0,
    isPlaying: true,
    getSymbol: function() {
        this.turns += 1;
        return (this.turns % 2 === 1) ? "X" : "O";
    },
    updateBoard: function(index, symbol) {
        this.board[index] = symbol;
    },
    // Logic
    checkForWinner: function(symbol) {

        let isEqualToSymbol = sym => sym === symbol;

        // Check rows
        for (let i = 0; i < 3; i++){
            let r = this.board.slice(i * 3, (i + 1) * 3);

            if (!r.includes(null) && r.every(isEqualToSymbol)) this.displayWinner(symbol); 
        }

        // Check columns
        let c1 = this.board[0] === this.board[3] && this.board[3] === this.board[6] && this.board[0];
        let c2 = this.board[1] === this.board[4] && this.board[4] === this.board[7] && this.board[1];
        let c3 = this.board[2] === this.board[5] && this.board[5] === this.board[8] && this.board[2];

        if (c1 || c2 || c3) this.displayWinner(symbol);

        // Check diagonals
        let d1 = this.board[0] === this.board[4] && this.board[4] === this.board[8] && this.board[4];
        let d2 = this.board[2] === this.board[4] && this.board[4] === this.board[6] && this.board[4];

        if (d1 || d2) this.displayWinner(symbol);

        if (this.turns === 9) this.displayWinner(symbol, true)
    },
    displayWinner: function (symbol, isDraw = false) {
        this.isPlaying = false;
        if (!isDraw) resultsDiv.textContent = `${symbol} is the Winner!`;
        else resultsDiv.textContent = `Game ended with draw!`;
        playAgainBtn.style.display = 'block';
    }   
}
