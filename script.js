const etchPad = document.getElementById("etchPad");
const inputVal = document.getElementById("rangeInput");
const rangeDisplay = document.getElementById("rangeDisplay");

function myFunction(num) {
    newGrid(num);
}

inputVal.addEventListener("input", function() {
    rangeDisplay.textContent = inputVal.value;
    myFunction(parseInt(rangeInput.value));
});

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

newGrid(16);

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

document.addEventListener('mouseup', function() {
    drawActive = false;
});

function colorCell(event) {
    event.target.style.backgroundColor = 'rgb(' + document.getElementById('red').value + ',' + document.getElementById('green').value + ',' + document.getElementById('blue').value + ')';
}

let drawActive = false;

let colorChoice = "black";


function updateColorPreview() {
    var redValue = document.getElementById('red').value;
    var greenValue = document.getElementById('green').value;
    var blueValue = document.getElementById('blue').value;

    var colorPreview = document.getElementById('colorPreview');
    colorPreview.style.backgroundColor = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
}

document.getElementById('red').addEventListener('input', updateColorPreview);
document.getElementById('green').addEventListener('input', updateColorPreview);
document.getElementById('blue').addEventListener('input', updateColorPreview);

updateColorPreview();