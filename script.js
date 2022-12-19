// Create boxes 

const containerDiv = document.querySelector("#main-container");

const addSymbol = (e) => {
    if (!(e.target.textContent)) e.target.textContent = `${gameBoard.getSymbol()}`;
}

for (let i = 0; i < 9; i++) {
    const boxDiv = document.createElement('div');
    boxDiv.setAttribute('id', `${i}`)
    boxDiv.classList.add('box')
    boxDiv.addEventListener('click', addSymbol)
    containerDiv.appendChild(boxDiv)
}

const gameBoard = {
    board: [[],[],[]],
    turns: 0,
    roundNumber: 0,
    getSymbol: function() {
        this.turns += 1;
        return (this.turns % 2 == 1) ? "X" : "O";
    }
}
