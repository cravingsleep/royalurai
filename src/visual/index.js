window.onload = () => {
    let moveIndex = 0;
    let game = [];

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    document.getElementById('back').onclick = () => {
        if (moveIndex !== 0) {
            moveIndex--;

            render();
        }
    };

    document.getElementById('forward').onclick = () => {
        moveIndex++;

        render();
    };

    const file = document.getElementById('file');

    file.onchange = event => {
        var reader = new FileReader();
        reader.onload = e => {
            game = JSON.parse(e.target.result);
            render();
        };
        reader.readAsText(event.target.files[0]);
    };

    function render() {
        const move = game.moves[moveIndex].game;

        const whiteCounters = move.white.chitPositions.map(whiteChitPositionToXY);
        const blackCounters = move.black.chitPositions.map(blackChitPositionToXY);

        console.log(move);

        renderBoard(ctx, whiteCounters, blackCounters, canvas.width, canvas.height);
    }
};

const yTable = {
    1: 4,
    2: 5,
    3: 6,
    4: 7,
    5: 7,
    6: 6,
    7: 5,
    8: 4,
    9: 3,
    10: 2,
    11: 1,
    12: 0,
    13: 0,
    14: 1
};

function whiteChitPositionToXY(position, isWhite) {
    const x = position <= 4 || position >= 13 ? 0 : 1;

    return { x, y: yTable[position] };
}

function blackChitPositionToXY(position, isWhite) {
    const x = position <= 4 || position >= 13 ? 2 : 1;

    return { x, y: yTable[position] };
}

const boardWidth = 3;
const boardHeight = 8;

const squareSize = 50;
const padding = 2;

const excludedSquares = [
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 2, y: 2 },
    { x: 2, y: 3 }
];

const starSquares = [
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 4 },
    { x: 0, y: 7 },
    { x: 2, y: 7 }
];

function renderBoard(ctx, whiteCounters, blackCounters, canvasWidth, canvasHeight) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let x = 0; x < boardWidth; x++) {
        for (let y = 0; y < boardHeight; y++) {
            if (!excludedSquares.find(square => square.x === x && square.y === y)) {
                ctx.fillStyle = 'brown';
                ctx.fillRect((x * squareSize) + (padding * x), y * squareSize + (padding * y), squareSize, squareSize);
            }

            if (starSquares.find(square => square.x === x && square.y === y)) {
                ctx.fillStyle = 'green';
                ctx.fillRect((x * squareSize) + (padding * x), y * squareSize + (padding * y), squareSize / 2, squareSize / 2);
            }

            if (whiteCounters.find(square => square.x === x && square.y === y)) {
                ctx.fillStyle = 'white';
                ctx.fillRect((x * squareSize) + (padding * x) + 15, y * squareSize + (padding * y) + 15, squareSize / 3, squareSize / 3);
            }

            if (blackCounters.find(square => square.x === x && square.y === y)) {
                ctx.fillStyle = 'black';
                ctx.fillRect((x * squareSize) + (padding * x) + 15, y * squareSize + (padding * y) + 15, squareSize / 3, squareSize / 3);
            }
        }
    }
}
