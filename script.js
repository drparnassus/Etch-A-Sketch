function createGrid() {
    const gridSizeInput = document.getElementById("gridSizeInput");
    const gridSize = parseInt(gridSizeInput.value);
    makeGrid(gridSize);
}

function makeGrid(num) {
    const mainContainer = document.getElementById("mainContainer");
    
    // Ensure mainContainer is a perfect square
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    mainContainer.style.width = minDimension + "px";
    mainContainer.style.height = minDimension + "px";
    
    // Clear existing grid
    mainContainer.innerHTML = '';

    // Calculate cell size
    const cellSize = minDimension / num;

    // Create cells
    for (let i = 0; i < num * num; i++) {
        const newCell = document.createElement('div');
        newCell.className = "cell";
        newCell.style.width = `${cellSize}px`; // Set the width of each cell
        newCell.style.height = `${cellSize}px`; // Set the height of each cell
        mainContainer.appendChild(newCell);
    }
}

const gridSizeInput = document.getElementById("gridSizeInput");
const gridSizeValue = document.getElementById("gridSizeValue");

// Update the displayed value when the slider value changes
gridSizeInput.addEventListener("input", function() {
    gridSizeValue.textContent = this.value;
    // Optionally, you can create the grid dynamically as the slider moves
    createGrid();
});

createGrid();