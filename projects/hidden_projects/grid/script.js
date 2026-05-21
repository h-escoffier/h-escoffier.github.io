
// Select #container 
// const container = document.querySelector("#container");
// // Create grid 

// const content = document.createElement("div");
// content.classList.add("content");
// content.style.border = "2px solid black"
// content.style.height = "100px";
// content.style.weight = "100px";
// container.appendChild(content);

let pixelSize = 10
let keep = 'No'

const settingBtn = document.getElementById("settings")
settingBtn.addEventListener("click", function () {
    // rows = prompt('Nb rows ?'); 
    // cols = prompt('Nb cols ?'); 
    keep = prompt('Rm after 3s ?')
    rendergrid(keep) 
});

const container = document.querySelector("#container");

function rendergrid(keep) {
    container.innerHTML = ""; // reset grid
    
    container.style.gridTemplateColumns = `repeat(auto-fill, ${pixelSize}px)`;
    container.style.gridAutoRows = `${pixelSize}px`;
    container.style.gap = "0px";
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    const cols = Math.floor(width / pixelSize);
    const rows = Math.floor(height / pixelSize);
    container.style.display = "grid";

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell${row}${col}`;
            cell.style.width = `${pixelSize}px`;
            cell.style.height = `${pixelSize}px`;
            // cell.textContent = cell.id;
            container.appendChild(cell);
        }
    }

    // Special keys 
    let drawingEnabled = true;
    let eraserMode = false;
    let clearAll = false;

   document.addEventListener("keydown", (e) => {
        if (e.code === "KeyS") {
            drawingEnabled = false;
        }
        if (e.code === "KeyC") {
            document.querySelectorAll(".cell").forEach(cell => {
                cell.style.backgroundColor = "white";
        }) 
        }
        if (e.code === "KeyE") {
            eraserMode = true;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.code === "KeyS") {
            drawingEnabled = true;
        }
        else if (e.code === "KeyC") {
            clearAll = false;
        }
        else if (e.code === "KeyE") {
            eraserMode = false;
        }
    });

    const cell = document.querySelectorAll(".cell")
    cell.forEach(cell => {
        document.addEventListener("mousemove", async (e) => {
            if (!drawingEnabled) return;
            if (cell.matches(":hover")) {
                cell.style.backgroundColor = rainbow(Math.random(), Math.random());
                if (keep === 'Yes') {
                    await sleep(3000)
                    cell.style.backgroundColor = "white";
                } else if (eraserMode){
                    cell.style.backgroundColor = "white";
                } 
            }
    })
    })
}

rendergrid(keep) 
window.addEventListener("resize", () => rendergrid(20));

// Functionalities

// Sleep 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

