// ======= Variables =======
let grid_items;
let grid_items_arr;
let new_rows;
let new_cols;

// ======= DOM Manipulation ======
const body = document.querySelector('body');
const container = document.querySelector("#container");
const topMenu = document.createElement('div');
topMenu.className = "top-menu";
const resetButton = document.createElement('button');
const dimButton = document.createElement('button');
const colorChoice = document.createElement('input'); 
colorChoice.className = "choice"
colorChoice.type = "color";
const rainbowBtn = document.createElement('button');

// ======= append items ========
topMenu.appendChild(resetButton);
topMenu.appendChild(dimButton);
topMenu.appendChild(colorChoice);
topMenu.appendChild(rainbowBtn);
body.insertBefore(topMenu,container);

// ======== button text ==========
resetButton.textContent = "Reset";
rainbowBtn.textContent = "Rainbow Mode";
dimButton.textContent = "Change Dimensions"

// ======== functions ===========
function makeRows(rows=16, cols=16){
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for(c = 0; c < (rows * cols); c++){
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    };
};

function draw(box_color){
    grid_items = document.querySelectorAll('#container > .grid-item');
    grid_items_arr = Array.from(grid_items);
    grid_items_arr.forEach(e => e.addEventListener('mouseover',function(){
        e.style.backgroundColor = box_color;
    }) 
    );
}

function rainbowDraw(){
    grid_items = document.querySelectorAll('#container > .grid-item');
    grid_items_arr = Array.from(grid_items);
    grid_items_arr.forEach(e => e.addEventListener('mouseover',function(){
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        e.style.backgroundColor = `rgb(${r},${g},${b})`;
    }) 
    );
}

// ========== button listeners ========

resetButton.addEventListener('click', function(){
    grid_items = document.querySelectorAll('#container > .grid-item');
    grid_items_arr = Array.from(grid_items);
    grid_items_arr.forEach(e => e.style.backgroundColor = "white");
    colorChoice.value = "black";
    draw("black");
})

colorChoice.addEventListener('change', () => {
    draw(colorChoice.value);
})

rainbowBtn.addEventListener('click', () => {
    rainbowDraw();
})

dimButton.addEventListener('click', () =>{
    rows = prompt(`Enter number of rows`);
    columns = prompt(`Enter number of columns`);
    if(rows === "" || columns === ""){
        rows = 16;
        columns = 16;
    }
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
    makeRows(rows,columns);
    draw(colorChoice.value);
})

// ========= default grid ==============
makeRows();
