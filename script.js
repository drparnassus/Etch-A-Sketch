document.addEventListener("DOMContentLoaded", function() {
    const etchPad = document.getElementById("etchPad");
    const inputVal = document.getElementById("rangeInput");
    const rangeDisplay = document.getElementById("rangeDisplay");
    const redDisplay = document.getElementById("redDisplay");
    const greenDisplay = document.getElementById("greenDisplay");
    const blueDisplay = document.getElementById("blueDisplay");
    const toggleButton = document.getElementById("toggleButton");
    const colorPicker = document.getElementById("colorPicker");
    const colorPreview = document.getElementById("colorPreview");
    const colorDisplay = document.getElementById("colorDisplay");
    const colorSelectorPreview = document.getElementById("colorSelectorPreview");
    let drawActive = false;
    let colorChoice = "black";
    let borderStyleOn = true;

    // Initialize variables to store RGB values
    let currentRed = document.getElementById('red').value;
    let currentGreen = document.getElementById('green').value;
    let currentBlue = document.getElementById('blue').value;

    let colorPickerUsed = false; // Initialize a flag to track if color picker was used


    function updateColorPreview() {
        if (colorPickerUsed) {
            // Use color picker values
            currentRed = parseInt(colorPicker.dataset.red);
            currentGreen = parseInt(colorPicker.dataset.green);
            currentBlue = parseInt(colorPicker.dataset.blue);
        } else {
            // Use slider values
            currentRed = parseInt(document.getElementById('red').value);
            currentGreen = parseInt(document.getElementById('green').value);
            currentBlue = parseInt(document.getElementById('blue').value);
        }
    
        console.log("Updated RGB values from sliders:", currentRed, currentGreen, currentBlue);
    
        // Update color preview
        var colorString = 'rgb(' + currentRed + ',' + currentGreen + ',' + currentBlue + ')';
        console.log("Color string:", colorString);
        colorPreview.style.backgroundColor = colorString;
    
        // Convert RGB to hexadecimal
        var hexColor = rgbToHex(currentRed, currentGreen, currentBlue);
        console.log("Hex color:", hexColor);
    
        // Update color picker value
    
        // Update color display values
        colorDisplay.textContent = hexColor;
        colorSelectorPreview.style.backgroundColor = colorString;
        redDisplay.textContent = 'R: ' + currentRed.toString().padStart(3, '0');
        greenDisplay.textContent = 'G: ' + currentGreen.toString().padStart(3, '0');
        blueDisplay.textContent = 'B: ' + currentBlue.toString().padStart(3, '0');
    }
    

// Function to convert RGB to hexadecimal
function rgbToHex(r, g, b) {
    // Convert each component to hexadecimal and ensure it's a two-digit value
    var redInt = parseInt(r, 10);
    var greenInt = parseInt(g, 10);
    var blueInt = parseInt(b, 10);

    console.log("Parsed integers:", redInt, greenInt, blueInt);

    var redHex = ('0' + redInt.toString(16)).slice(-2);
    var greenHex = ('0' + greenInt.toString(16)).slice(-2);
    var blueHex = ('0' + blueInt.toString(16)).slice(-2);

    console.log("Hex components:", redHex, greenHex, blueHex);

    // Construct the hexadecimal color string in the format #rrggbb
    return '#' + redHex + greenHex + blueHex;
}
    // Function to color cell using stored RGB values
    function colorCell(event) {
        event.target.style.backgroundColor = 'rgb(' + currentRed + ',' + currentGreen + ',' + currentBlue + ')';
    }

    // Function to update RGB sliders with color picker values
function updateRGBSlidersFromColorPicker() {
    document.getElementById('red').value = colorPicker.dataset.red;
    document.getElementById('green').value = colorPicker.dataset.green;
    document.getElementById('blue').value = colorPicker.dataset.blue;
    // Additionally, update the color preview and other elements if necessary
}



    // Event listeners to update stored RGB values when sliders are adjusted
    document.getElementById('red').addEventListener('input', function() {
        colorPickerUsed = false;
        console.log("hello world!");
        updateColorPreview();
    });
    document.getElementById('green').addEventListener('input', function() {
        colorPickerUsed = false;
        console.log("hello world!");
        updateColorPreview();
    });
    document.getElementById('blue').addEventListener('input', function() {
        colorPickerUsed = false;
        console.log("hello world!");
        updateColorPreview();
    });

    colorPicker.addEventListener('input', function() {
        colorPickerUsed = true;
        const hexColor = colorPicker.value;
        const rgbColor = hexToRgb(hexColor);
        currentRed = rgbColor.r;
        currentGreen = rgbColor.g;
        currentBlue = rgbColor.b;
        // Update color picker dataset
        colorPicker.dataset.used = "true";
        colorPicker.dataset.red = currentRed;
        colorPicker.dataset.green = currentGreen;
        colorPicker.dataset.blue = currentBlue;
        updateColorPreview();
        updateRGBSlidersFromColorPicker();
    });
    


  

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    const colorBox = document.getElementById("colorBox");
    const wheelBox = document.getElementById("wheelBox");

    const showColorBoxButton = document.getElementById("showColorBox");
    const showWheelButton = document.getElementById("showWheel");

    function showColorWheel() {
        colorBox.style.visibility = "hidden";
        colorBox.style.display = "none";
        wheelBox.style.visibility = "visible";
        wheelBox.style.display = "flex";
    }

    function showColorBox() {
        // Save the selected color from the color picker to the RGB sliders variables
        currentRed = parseInt(colorPicker.dataset.red);
        currentGreen = parseInt(colorPicker.dataset.green);
        currentBlue = parseInt(colorPicker.dataset.blue);
        
        wheelBox.style.visibility = "hidden";
        wheelBox.style.display = "none";
        colorBox.style.visibility = "visible";
        colorBox.style.display = "flex";
        
        // Update the color preview and other elements with the new RGB values
        updateColorPreview();
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
        colorCell(event);
    });

    etchPad.addEventListener('mouseover', function(event) {
        if (drawActive && event.target.classList.contains("cell")) {
            colorCell(event);
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

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(function (s) {
                return s + s;
            }).join('');
        }
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r: r, g: g, b: b };
    }
});
