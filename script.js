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
    const deleteButton = document.getElementById("deleteButton");
    const colorSelectorPreview = document.getElementById("colorSelectorPreview");
    const brushButton = document.getElementById("brush");
    let drawActive = false;
    let borderStyleOn = true;
    let brushSize = 1;


    function startDiscoMode() {
        let rngTuner = 200;
        const cells = document.querySelectorAll('.cell');
        const originalColors = []; // Array to store original colors
        // Store the original color of each cell
        cells.forEach(cell => {
            originalColors.push(cell.style.backgroundColor || 'rgb(255,255,255)');
        });
    
        // Define threshold distance from black and white
        const thresholdDistance = 50; // Adjust as needed
    
        // Define an interval to update cell colors every second
        discoInterval = setInterval(() => {
            cells.forEach((cell, index) => {
                // Get the original RGB color of the cell
                const originalColor = originalColors[index].split(',').map(color => parseInt(color.replace(/\D/g,'')));
    
                // Randomly decide which RGB component(s) to modify
                let modifyRed = Math.random() < 0.5;
                let modifyGreen = Math.random() < 0.5;
                let modifyBlue = Math.random() < 0.5;
    
                // Apply different random changes to each modified component
                if (modifyRed) {
                    let redChange = Math.floor(Math.random() * 101) - rngTuner; // Generate random value between -50 and +50
                    originalColor[0] = Math.max(0, Math.min(255, originalColor[0] + redChange)); // Ensure the value is within the valid range
                }
                if (modifyGreen) {
                    let greenChange = Math.floor(Math.random() * 101) - rngTuner; // Generate random value between -50 and +50
                    originalColor[1] = Math.max(0, Math.min(255, originalColor[1] + greenChange)); // Ensure the value is within the valid range
                }
                if (modifyBlue) {
                    let blueChange = Math.floor(Math.random() * 101) - rngTuner; // Generate random value between -50 and +50
                    originalColor[2] = Math.max(0, Math.min(255, originalColor[2] + blueChange)); // Ensure the value is within the valid range
                }
    
                // Apply the new color to the cell with CSS transition
                cell.style.transition = 'background-color 0.5s ease'; // Adjust transition duration and timing function as needed
                cell.style.backgroundColor = `rgb(${originalColor.join(',')})`;
            });
        }, 500); // Update cell colors every second
    }
    




 
// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



// Function to stop the disco mode animation
function stopDiscoMode() {
    clearInterval(discoInterval); // Clear the interval
}

// Event listener for the disco mode button
const discoButton = document.getElementById('discoButton');
let discoInterval = null;
discoButton.addEventListener('click', function() {
    // Toggle disco mode
    if (discoInterval) {
        stopDiscoMode();
        discoInterval = null;
        discoButton.textContent = 'Disco Mode';
    } else {
        startDiscoMode();
        discoButton.textContent = 'Stop Disco';
    }
});









// Function to save the drawing to local storage
function saveDrawing() {
    const cells = document.querySelectorAll('.cell');
    const drawingData = [];
    const numRows = Math.sqrt(cells.length); // Assuming it's a square grid

    // Save dimensions as the first element in the drawing data
    drawingData.push(numRows);

    // Save the state of the toggle button
    const toggleState = borderStyleOn; // Get the current toggle state
    drawingData.push(toggleState);

    cells.forEach(cell => {
        const cellColor = cell.style.backgroundColor || 'rgb(255, 255, 255)';
        drawingData.push(cellColor);
    });

    localStorage.setItem('drawing', JSON.stringify(drawingData));

    // Log the correct toggle state
    console.log("Toggle State:", toggleState);
}




    function loadBorderStyle() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.toggle('borderToggle');
        });
    }
    
    

// Function to load the drawing from local storage
function loadDrawing() {
    const drawingData = JSON.parse(localStorage.getItem('drawing'));

    // Inside loadDrawing() function



    if (!drawingData) {
        console.error("No drawing data found in local storage.");
        return;
    }

    const numRows = drawingData.shift();
    const numCols = numRows; // Assuming it's a square grid

    // Reconstruct the grid with the saved dimensions
    newGrid(numRows);

    // Restore the toggle button state after the grid is drawn
const savedToggleState = drawingData.shift(); // Retrieve the saved toggle state
if (savedToggleState !== borderStyleOn) {
    toggleBorderStyle(); // Toggle the border style if it's different from the saved state
}


    console.log("Retrieved Toggle State:", savedToggleState);

    const cells = document.querySelectorAll('.cell');

    // Set background colors
    cells.forEach((cell, index) => {
        cell.style.backgroundColor = drawingData[index];
    });

    console.log("Number of rows:", numRows);
    console.log("Number of columns:", numCols);
}






// Event listener for saving the drawing
document.getElementById("saveButton").addEventListener("click", saveDrawing);

// Event listener for loading the drawing
document.getElementById("loadButton").addEventListener("click", loadDrawing);





    brushButton.addEventListener('click', function() {
        if (brushSize == 1) {
            brushSize = 9;
            brushButton.innerHTML = "<img src='./images/3x3.png' alt='Icon'>";
        }
        else if (brushSize == 9) {
            brushSize = 1;
            brushButton.innerHTML = "<img src='./images/1x1.png' alt='Icon'>";
        }
    });

    // Initialize variables to store RGB values
    let currentRed = document.getElementById('red').value;
    let currentGreen = document.getElementById('green').value;
    let currentBlue = document.getElementById('blue').value;

    let colorPickerUsed = false; // Initialize a flag to track if color picker was used

    function deleteGrid () {
        etchPad.innerHTML = "";
    }

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
        //colorPicker.value = hexColor;
    
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
    function colorCell(event, brushSize) {
        if (brushSize == 1) {
            event.target.style.backgroundColor = 'rgb(' + currentRed + ',' + currentGreen + ',' + currentBlue + ')';
        }
        else {
            const targetCell = event.target;
    const cells = document.querySelectorAll('.cell');
    
    // Get the index of the target cell
    const targetIndex = Array.from(cells).indexOf(targetCell);
    const numRows = Math.sqrt(cells.length);
    const targetRow = Math.floor(targetIndex / numRows);
    const targetCol = targetIndex % numRows;

    // Loop through the surrounding cells in a 3x3 grid
    for (let i = targetRow - 1; i <= targetRow + 1; i++) {
        for (let j = targetCol - 1; j <= targetCol + 1; j++) {
            // Check if the current index is within the grid bounds
            if (i >= 0 && i < numRows && j >= 0 && j < numRows) {
                // Calculate the index of the current cell
                const currentIndex = i * numRows + j;
                const currentCell = cells[currentIndex];
                // Color the current cell
                currentCell.style.backgroundColor = 'rgb(' + currentRed + ',' + currentGreen + ',' + currentBlue + ')';
            }
        }
    }
                        
        }            
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
    const saveLoadBox = document.getElementById("saveLoadWindow");

    const showColorBoxButton = document.getElementById("showColorBox");
    const showWheelButton = document.getElementById("showWheel");
    const showSaveLoadButton = document.getElementById("showSaveLoad");

    function showColorWheel() {
        colorBox.style.visibility = "hidden";
        colorBox.style.display = "none";
        saveLoadBox.style.visibility = "hidden";
        saveLoadBox.style.display = "none";
        wheelBox.style.visibility = "visible";
        wheelBox.style.display = "flex";
    }

    function showColorBox() {
        // Save the selected color from the color picker to the RGB sliders variables
        currentRed = parseInt(colorPicker.dataset.red);
        currentGreen = parseInt(colorPicker.dataset.green);
        currentBlue = parseInt(colorPicker.dataset.blue);
        
        saveLoadBox.style.visibility = "hidden";
        saveLoadBox.style.display = "none";
        wheelBox.style.visibility = "hidden";
        wheelBox.style.display = "none";
        colorBox.style.visibility = "visible";
        colorBox.style.display = "flex";
        
        // Update the color preview and other elements with the new RGB values
        updateColorPreview();
    }

    function showSaveLoad() {
        colorBox.style.visibility = "hidden";
        colorBox.style.display = "none";
        wheelBox.style.visibility = "hidden";
        wheelBox.style.display = "none";
        saveLoadBox.style.visibility = "visible";
        saveLoadBox.style.display = "flex";
    }
    

    showColorBoxButton.addEventListener("click", showColorBox);
    showWheelButton.addEventListener("click", showColorWheel);
    showSaveLoadButton.addEventListener("click", showSaveLoad);

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

    function newGridLoader(num) {
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

    deleteButton.addEventListener('click', function() {
        const currentSize = parseInt(rangeInput.value);
        gridMaker(currentSize);
    });

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
        colorCell(event, brushSize);
    });

    etchPad.addEventListener('mouseover', function(event) {
        if (drawActive && event.target.classList.contains("cell")) {
            colorCell(event, brushSize);
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
