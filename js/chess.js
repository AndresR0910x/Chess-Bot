class Chessboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedPiece = null;
        this.selectedRow = null;
        this.selectedCol = null;
        this.initBoard();
    }

    initBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.createSquare(row, col);
            }
        }
    }

    createSquare(row, col) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-row', row);
        square.setAttribute('data-col', col);

        this.setSquareColor(square, row, col);
        this.addPiece(square, row, col);
        this.addClickEvent(square, row, col);

        this.container.appendChild(square);
    }

    setSquareColor(square, row, col) {
        square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
    }

    addPiece(square, row, col) {
        const piece = this.getInitialPiece(row, col);
        if (piece) {
            const pieceElement = document.createElement('span');
            pieceElement.classList.add('piece');
            pieceElement.innerHTML = piece;
            square.appendChild(pieceElement);
            square.setAttribute('data-piece', piece);
        }
    }

    addClickEvent(square, row, col) {
        square.addEventListener('click', () => this.handleSquareClick(square, row, col));
    }

    handleSquareClick(square, row, col) {
        if (!this.selectedPiece && square.getAttribute('data-piece')) {
            this.selectPiece(square, row, col);
        } else if (this.selectedPiece) {
            if (this.isValidMove(this.selectedPiece, this.selectedRow, this.selectedCol, row, col)) {
                this.movePiece(this.selectedRow, this.selectedCol, row, col);
            } else {
                console.log("Movimiento no válido");
            }
            this.resetSelection();
        }
    }

    selectPiece(square, row, col) {
        this.selectedPiece = square.getAttribute('data-piece');
        this.selectedRow = row;
        this.selectedCol = col;
        console.log(`Pieza seleccionada: ${this.selectedPiece}`);
    }

    resetSelection() {
        this.selectedPiece = null;
        this.selectedRow = null;
        this.selectedCol = null;
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const fromSquare = this.getSquare(fromRow, fromCol);
        const toSquare = this.getSquare(toRow, toCol);

        if (fromSquare && toSquare) {
            const pieceElement = fromSquare.querySelector('.piece');
            if (pieceElement) {
                toSquare.appendChild(pieceElement);
            }

            fromSquare.removeAttribute('data-piece');
            fromSquare.innerHTML = '';

            toSquare.setAttribute('data-piece', pieceElement.innerHTML);

            console.log(`Pieza movida a la fila ${toRow}, columna ${toCol}`);
        }
    }

    getSquare(row, col) {
        return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    isValidMove(piece, fromRow, fromCol, toRow, toCol) {
        switch (piece) {
            case "&#9823;": // Peón negro
            case "&#9817;": // Peón blanco
                return this.isValidPawnMove(piece, fromRow, fromCol, toRow, toCol);
            case "&#9820;": // Torre negra
            case "&#9814;": // Torre blanca
                return this.isValidRookMove(fromRow, fromCol, toRow, toCol);
            case "&#9822;": // Caballo negro
            case "&#9816;": // Caballo blanco
                return this.isValidKnightMove(fromRow, fromCol, toRow, toCol);
            case "&#9821;": // Alfil negro
            case "&#9815;": // Alfil blanco
                return this.isValidBishopMove(fromRow, fromCol, toRow, toCol);
            case "&#9819;": // Reina negra
            case "&#9813;": // Reina blanca
                return this.isValidQueenMove(fromRow, fromCol, toRow, toCol);
            case "&#9818;": // Rey negro
            case "&#9812;": // Rey blanco
                return this.isValidKingMove(fromRow, fromCol, toRow, toCol);
            default:
                return false;
        }
    }

    isValidPawnMove(piece, fromRow, fromCol, toRow, toCol) {
        if (fromCol === toCol) {
            if (piece === "&#9817;" && toRow === fromRow - 1) {
                return true;
            }
            if (piece === "&#9823;" && toRow === fromRow + 1) {
                return true;
            }
        }

        if (Math.abs(fromCol - toCol) === 1) {
            if (piece === "&#9817;" && toRow === fromRow - 1) {
                return true;
            }
            if (piece === "&#9823;" && toRow === fromRow + 1) {
                return true;
            }
        }
        return false;
    }

    getInitialPiece(row, col) {
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

        return initialPosition[row] ? initialPosition[row][col] : null;
    }
}

const chessboard = new Chessboard('chessboard');
