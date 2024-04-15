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





function toggleBorderStyle() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.toggle('borderToggle');
    });
    borderStyleOn = !borderStyleOn;
}

function gridMaker(num) {
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




/*

// Get references to buttons and divs
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var div1 = document.getElementById('div1');
var div2 = document.getElementById('div2');
var div3 = document.getElementById('div3');

// Add event listeners to buttons
button1.addEventListener('click', function() {
    div1.style.display = 'block';
    div2.style.display = 'none';
    div3.style.display = 'none';
});

button2.addEventListener('click', function() {
    div1.style.display = 'none';
    div2.style.display = 'block';
    div3.style.display = 'none';
});

button3.addEventListener('click', function() {
    div1.style.display = 'none';
    div2.style.display = 'none';
    div3.style.display = 'block';
});


*/