const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const shuffleButton = document.getElementById('shuffleButton');

const size = 4;
const tileSize = canvas.width / size;
let tiles = [];
let emptyTile = { x: size - 1, y: size - 1 };

function initTiles() {
    tiles = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            tiles.push({ x: i, y: j, number: i * size + j + 1 });
        }
    }
    tiles[size * size - 1].number = 0;
    emptyTile = { x: size - 1, y: size - 1 };
}

function drawTiles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiles.forEach(tile => {
        if (tile.number === 0) return;
        ctx.fillStyle = '#000';
        ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tile.number, tile.x * tileSize + tileSize / 2, tile.y * tileSize + tileSize / 2);
    });
}

function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        const neighbors = getNeighbors(emptyTile);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        moveTile(randomNeighbor);
    }
}

function getNeighbors(tile) {
    const { x, y } = tile;
    const neighbors = [];
    if (x > 0) neighbors.push({ x: x - 1, y });
    if (x < size - 1) neighbors.push({ x: x + 1, y });
    if (y > 0) neighbors.push({ x, y: y - 1 });
    if (y < size - 1) neighbors.push({ x, y: y + 1 });
    return neighbors;
}

function moveTile(tile) {
    const tileIndex = tiles.findIndex(t => t.x === tile.x && t.y === tile.y);
    const emptyIndex = tiles.findIndex(t => t.number === 0);
    tiles[emptyIndex].x = tile.x;
    tiles[emptyIndex].y = tile.y;
    tiles[tileIndex].x = emptyTile.x;
    tiles[tileIndex].y = emptyTile.y;
    emptyTile = { x: tile.x, y: tile.y };
}

canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / tileSize);
    const y = Math.floor((e.clientY - rect.top) / tileSize);
    const clickedTile = tiles.find(tile => tile.x === x && tile.y === y);
    const neighbors = getNeighbors(emptyTile);
    if (neighbors.some(tile => tile.x === clickedTile.x && tile.y === clickedTile.y)) {
        moveTile(clickedTile);
        drawTiles();
    }
});

shuffleButton.addEventListener('click', () => {
    shuffleTiles();
    drawTiles();
});

initTiles();
drawTiles();
