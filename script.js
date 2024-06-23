const canvas = document.getElementById('puzzleCanvas');
const ctx = canvas.getContext('2d');
const shuffleButton = document.getElementById('shuffleButton');

const size = 4;
const tileSize = canvas.width / size;
let tiles = [];
let emptyTile = { x: size - 1, y: size - 1 };

// Initialize the tiles array
function initTiles() {
    tiles = [];
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            tiles.push({ x: x, y: y, number: y * size + x + 1 });
        }
    }
    tiles[size * size - 1].number = 0; // Set the last tile as the empty space
    emptyTile = { x: size - 1, y: size - 1 };
}

// Draw the tiles on the canvas
function drawTiles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiles.forEach(tile => {
        if (tile.number === 0) return; // Skip drawing the empty space
        ctx.fillStyle = '#000';
        ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(tile.number, tile.x * tileSize + tileSize / 2, tile.y * tileSize + tileSize / 2);
    });
}

// Shuffle the tiles by moving the empty space randomly
function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        const neighbors = getNeighbors(emptyTile);
        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        moveTile(randomNeighbor);
    }
}

// Get the neighboring tiles of the empty space
function getNeighbors(tile) {
    const { x, y } = tile;
    const neighbors = [];
    if (x > 0) neighbors.push({ x: x - 1, y: y });
    if (x < size - 1) neighbors.push({ x: x + 1, y: y });
    if (y > 0) neighbors.push({ x: x, y: y - 1 });
    if (y < size - 1) neighbors.push({ x: x, y: y + 1 });
    return neighbors;
}

// Move a tile to the empty space
function moveTile(tile) {
    const tileIndex = tiles.findIndex(t => t.x === tile.x && t.y === tile.y);
    const emptyIndex = tiles.findIndex(t => t.number === 0);
    tiles[emptyIndex].x = tile.x;
    tiles[emptyIndex].y = tile.y;
    tiles[tileIndex].x = emptyTile.x;
    tiles[tileIndex].y = emptyTile.y;
    emptyTile = { x: tile.x, y: tile.y };
}

// Handle tile click event
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

// Handle shuffle button click event
shuffleButton.addEventListener('click', () => {
    shuffleTiles();
    drawTiles();
});

// Initialize and draw the puzzle on page load
initTiles();
drawTiles();
