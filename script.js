const etchPad = document.getElementById("etchPad");
const inputVal = document.getElementById("rangeInput");
const rangeDisplay = document.getElementById("rangeDisplay");
const redDisplay = document.getElementById("redDisplay");
const greenDisplay = document.getElementById("greenDisplay");
const blueDisplay = document.getElementById("blueDisplay");
const toggleButton = document.getElementById("toggleButton");
let drawActive = false;
let colorChoice = "black";
let borderStyleOn = true;

// Get references to the color box and wheel elements
const colorBox = document.getElementById("colorBox");
const wheelBox = document.getElementById("wheelBox");

// Get references to the show buttons
const showColorBoxButton = document.getElementById("showColorBox");
const showWheelButton = document.getElementById("showWheel");

// Function to hide color box and show color wheel
function showColorWheel() {
    colorBox.style.visibility = "hidden";
    colorBox.style.display = "none";
    wheelBox.style.visibility = "visible";
    wheelBox.style.display = "flex";
}

// Function to hide color wheel and show color box
function showColorBox() {
    wheelBox.style.visibility = "hidden";
    wheelBox.style.display = "none";
    colorBox.style.visibility = "visible";
    colorBox.style.display = "flex";
}

showColorBoxButton.addEventListener("click", showColorBox);
showWheelButton.addEventListener("click", showColorWheel);

function toggleBorderStyle() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.toggle('borderToggle');
    });
    borderStyleOn = !borderStyleOn;
}

function gridMaker(num) {
    newGrid(num);
    // Apply the border style based on the state of the toggle
    if (borderStyleOn) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.add('borderToggle');
        });
    }
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

    var colorPreview1 = document.getElementById('colorPreview'); // For the color preview in colorBox
    var colorPreview2 = document.getElementById('colorPreviewWheel'); // For the color preview in wheelBox

    var colorString = 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
    colorPreview1.style.backgroundColor = colorString;
    colorPreview2.style.backgroundColor = colorString;

    document.getElementById('redDisplay').textContent = 'R: ' + redValue.padStart(3, '0');
    document.getElementById('greenDisplay').textContent = 'G: ' + greenValue.padStart(3, '0');
    document.getElementById('blueDisplay').textContent = 'B: ' + blueValue.padStart(3, '0');
}

toggleButton.addEventListener('click', toggleBorderStyle);

document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.add('borderToggle');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var rangeInput = document.getElementById('rangeInput');
    var rangeMaxSpan = document.getElementById('rangeMax');
    var redSlider = document.getElementById('red');
    var greenSlider = document.getElementById('green');
    var blueSlider = document.getElementById('blue');
    var isSmallScreen = false;

    function adjustElements() {
        if (window.innerWidth <= 810) {
            if (!isSmallScreen) {
                isSmallScreen = true;
                rangeInput.setAttribute('min', '16');
                rangeInput.setAttribute('max', '50');
                rangeMaxSpan.textContent = '50';
                redSlider.style.width = '75px';
                greenSlider.style.width = '75px';
                blueSlider.style.width = '75px';
            }
        } else {
            if (isSmallScreen) {
                isSmallScreen = false;
                rangeInput.setAttribute('min', '16');
                rangeInput.setAttribute('max', '100');
                rangeMaxSpan.textContent = '100';
                redSlider.style.width = '200px';
                greenSlider.style.width = '200px';
                blueSlider.style.width = '200px';
            }
        }
    }

    adjustElements();

    window.addEventListener('resize', adjustElements);
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
    gridMaker(parseInt(rangeInput.value));
});

document.getElementById('red').addEventListener('input', updateColorPreview);
document.getElementById('green').addEventListener('input', updateColorPreview);
document.getElementById('blue').addEventListener('input', updateColorPreview);

newGrid(16);

updateColorPreview();
