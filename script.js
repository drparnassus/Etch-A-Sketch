const etchPad = document.getElementById("etchPad");
const inputVal = document.getElementById("rangeInput");
const rangeDisplay = document.getElementById("rangeDisplay");
const redDisplay = document.getElementById("redDisplay");
const greenDisplay = document.getElementById("greenDisplay");
const blueDisplay = document.getElementById("blueDisplay");
let drawActive = false;
let colorChoice = "black";

function myFunction(num) {
    newGrid(num);
}

function newGrid(num) {
    etchPad.innerHTML = "";

    for (let i = 1; i <= num; i++) {
        const row = document.createElement('div');
        row.className = "row";
        etchPad.appendChild(row);

        for (let j = 1; j <= num; j++) {
            const cell = document.createElement('div');
            cell.className = "cell";
            row.appendChild(cell);
        }
    }
}

function colorCell(event) {
    event.target.style.backgroundColor = 'rgb(' + document.getElementById('red').value + ',' + document.getElementById('green').value + ',' + document.getElementById('blue').value + ')';
}

function updateColorPreview() {
    var redValue = document.getElementById('red').value;
    var greenValue = document.getElementById('green').value;
    var blueValue = document.getElementById('blue').value;

    var colorPreview = document.getElementById('colorPreview');
    colorPreview.style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';

    document.getElementById('redDisplay').textContent = 'R: ' + redValue.padStart(3, '0');
    document.getElementById('greenDisplay').textContent = 'G: ' + greenValue.padStart(3, '0');
    document.getElementById('blueDisplay').textContent = 'B: ' + blueValue.padStart(3, '0');
}

document.addEventListener('DOMContentLoaded', function() {
    var rangeInput = document.getElementById('rangeInput');
    var rangeMaxSpan = document.getElementById('rangeMax');

    // Function to adjust range input attributes and max text based on screen size
    function adjustRangeElements() {
        if (window.innerWidth <= 768) {
            rangeInput.setAttribute('min', '16');
            rangeInput.setAttribute('max', '50');
            rangeMaxSpan.textContent = '50';
        } else {
            rangeInput.setAttribute('min', '16');
            rangeInput.setAttribute('max', '100');
            rangeMaxSpan.textContent = '100';
        }
    }

    // Call the function initially
    adjustRangeElements();

    // Listen for window resize events and adjust range input and max text accordingly
    window.addEventListener('resize', adjustRangeElements);
});

document.addEventListener('mouseup', function() {
    drawActive = false;
});

etchPad.addEventListener('mousedown', function(event) {
    event.preventDefault();
    drawActive = true;
    colorCell(event); // Color the initial cell
});

etchPad.addEventListener('mouseover', function(event) {
    if (drawActive && event.target.classList.contains("cell")) {
        colorCell(event); // Color subsequent cells while mouse button is held down
    }
});

inputVal.addEventListener("input", function() {
    rangeDisplay.textContent = inputVal.value;
    myFunction(parseInt(rangeInput.value));
});

document.getElementById('red').addEventListener('input', updateColorPreview);
document.getElementById('green').addEventListener('input', updateColorPreview);
document.getElementById('blue').addEventListener('input', updateColorPreview);

newGrid(16);

updateColorPreview();