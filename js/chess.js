const chessboard = document.getElementById('chessboard');

for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        
        Board(row, col); 
    }
}

function Board(row, col){
    const square = document.createElement('div');
    square.classList.add('square');

    //Alternar color de las casillas 
    if((row + col) % 2 === 0){
        square.classList.add('white'); 
    } else {
        square.classList.add('black')
    }

    // Colocar las piezas 
    const piece = getPieces(row, col);
    if(piece) {
        const pieceElement = document.createElement('span')
        pieceElement.classList.add('piece');
        pieceElement.innerHTML = piece;
        square.appendChild(pieceElement);
    }

    chessboard.appendChild(square);
}

function getPieces(row, col){
    const initialPosition = [
        ["&#9820;", "&#9822;", "&#9821;", "&#9819;", "&#9818;", "&#9821;", "&#9822;", "&#9820;"],
        ["&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;", "&#9823;"],
        [],
        [],
        [],
        [],
        ["&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;", "&#9817;"],
        ["&#9814;", "&#9816;", "&#9815;", "&#9813;", "&#9812;", "&#9815;", "&#9816;", "&#9814;"]
    ];

    return initialPosition[row]?initialPosition[row][col] : null;
}