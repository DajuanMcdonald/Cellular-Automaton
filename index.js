// import dimensions from './config'
// //The Rules to Game of Life: simple edition
// /*
// Start by populating the 'world' with 'live' cells that we choose. 
// Initial state of 'world' is no 'live' cells
// The premise is change a dead cell to a live cell and generate a CA
// via iterating through 'time'

// Understand the problem:

// * any 'live' cell with fewer than 2 live neighbors will die the next iteration (outlier)
// * any 'live' cell with more than 2 but less than 3 neighbors will live on the next iteration (parent)
// * any 'live' cell with 4 live neighbors will die the next iteration (wheel)
// * any 'dead' cell with exactly 3 live neighbors will be born the next iteration (child)

// Plan a solution:
// * a two-dimensional array can keep track of our world
// * the world can contain the live/dead cells
// * cells are configurable 
// * the world (may be infinite)


// */


// //Execute a working solution:
// /**
//  * @createGen : 
//  * @initGenArray :
//  * @createGrid : 
//  * @updateGrid : 
//  */
const rows = 25; // x
const cols = 25; // y

let start = false;
let timer;
let iterateSpeed = 1000;


let currentGen = [rows];
let nextGen = [rows];


//a two-dimensional array can keep track of our world
function createGen() {
    for (let i = 0; i < rows; i++) {
        currentGen[i] = new Array(cols)
        nextGen[i] = new Array(cols)
    }
}

function createArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currentGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createGrid() {
    //reference our div id in html.index
    let world = document.querySelector('#world')
    
    //create new table element as our grid
    let grid = document.createElement('table')
    grid.setAttribute('id', 'tablegrid')
    
    
    //nested-loop to create our grid
    //TODO: possibly refactor this later
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr')
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td')
            
            //when a cell is clicked, the cell is toggled between 2 colors
            //alive = white, dead = transparent
            cell.setAttribute('id', i + '_' + j)
            cell.setAttribute('class', 'dead')
            
            //set the event listener _After_ checkCell is fixed
            cell.addEventListener('click', checkedCell)
            tr.appendChild(cell)
        }
        grid.appendChild(tr)
        
    }
    world.appendChild(grid)
    
}


// subroutine to count neighbor cells except edge TODO: count edges
function checkedCell() {
    let location = this.id.split("_")
    //this is [i]
    let row = Number(location[0]) 
    //this is [j]
    let col = Number(location[1])
    
    // toggle 
    if (this.className==='alive') {
        this.setAttribute("class", "dead")
        currentGen[row][col] = 0
    } else {
        this.setAttribute("class", "alive")
        currentGen[row][col] = 1
    }

    // attempting to count edges
    if (this.className==='dead' && row < 0) {
        this.setAttribute('class', 'alive')
        currentGen[row][col] = 1
    }

}



//RULES

// cells clicked will be toggled
function countNeighbor(row, col) {
    let count = 0
    let nrow = Number(row)
    let ncol = Number(col)
    
    if (nrow - 1 >= 0) {
        if (currentGen[nrow - 1][ncol] === 1) {
            count = count + 1
        }
    }
    
    if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        if (currentGen[nrow - 1][ncol - 1] === 1) {
            count = count + count
        }
    }
    if (nrow  + 1 < rows && ncol + 1 < cols) {
        if (currentGen[nrow + 1][ncol  + 1] === 1) {
            count++
        }
    }

    //sanity check
    if (ncol - 1 >= 0) {
        if (currentGen[nrow][ncol - 1] === 1) {
            count++
        }
        
    }
    
    if (ncol + 1 < cols) {
        if (currentGen[nrow][ncol + 1] === 1) {
            count++
        }
    }
    
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        if (currentGen[nrow + 1][ncol - 1] === 1) {
            count++
        }
    }
    
    if (nrow + 1 < rows && ncol + 1 < cols) {
        if (currentGen[nrow + 1][ncol + 1] === 1)
        count++;
    }
    
    if (nrow + 1 < rows) {
        if (currentGen[nrow + 1][ncol] === 1)
            count++;
        
    }
    
    return count;   
}

function createNextGen( row, col ) {
    for (row in currentGen) {
        //loop again for col
        for (col in currentGen[row]) {
            let neighbors = countNeighbor(row, col)
            
            //check if alive/dead and apply rules
            if (currentGen[row][col] === 1) {
                //any 'live' cell with fewer than 2 live neighbors will die the next iteration (outlier)
                // nextGen[row][col] = 1;
                nextGen[row][col] = 0
                
                if (neighbors && neighbors < 2 ) {
                    nextGen[row][col] = 0
                    //any 'live' cell with more than 2 but less than 3 neighbors will live on the next iteration (parent)
                }
                
                if (neighbors === 2 || neighbors === 3 ) {
                    nextGen[row][col] = 1
                    // any 'live' cell with 4 live neighbors will die the next iteration (wheel)
                } 

                if (neighbors || neighbors === 3) {
                    nextGen[row][col] = 1
                }
                
                if (neighbors > 3) {
                    nextGen[row][col] = 0
                    
                }
                //any 'dead' 'bottom' cell with exactly 3 live neighbors will be born the next iteration (child)
            }
            
            if (currentGen[row][col] === 0) {
                if (neighbors === 3) {
                    nextGen[row][col] = 1

                }
            }
        }
    }
}




function updateGen(row, col) {
    for (row in currentGen) {
        for (col in currentGen[row]) {
            currentGen[row][col] = nextGen[row][col]
            nextGen[row][col] = 0
        }
    }
}
function updateGrid( row, col ) {
    let cell = ''
    for (row in currentGen) {
        for (col in currentGen[row]) {
            cell = document.getElementById(row + "_" + col)
            if (currentGen[row][col] === 0) {
                cell.setAttribute('class', 'dead')
            } else {
                cell.setAttribute('class', 'alive')
            }
        }
    }

}



// sample cell configurations users can load
 // grab specific elements from list of elements
// if element's class name matches description
// change the state of that element via class name

//about elements:
/*
* - have id and class name
*
* '*/


// Glider
let list = ['1_15', '2_16', '3_15', '3_14', '3_13']

function randomConfig() {

    const cells = document.querySelectorAll('td')
    for (let node of cells){
        if (list.includes(node.id)) {
            // node.classList.toggle('alive')
            node.setAttribute('class', 'alive')
            currentGen[node] = 1
            nextGen[node] = 1
        }


        console.log(list.includes(node.id))
    }

}




//UI
function iterate() {
    createNextGen()
    updateGen()
    countNeighbor()
    updateGrid()

    if (start) {
        timer = setTimeout(iterate, iterateSpeed)
    }   

}

// function randomConfig(step) {
//     let config = Math.floor((Math.random() * 10) + 1)
//
//     for (step in config) {
//         if (step > 5) {
//             this.setAttribute("class", "dead")
//             currentGen[row][col] = step - 1
//         } else {
//             this.setAttribute("class", "alive")
//             currentGen[row][col] = step + 1
//         }
//
//     }
//
//
// }

function stepWise() {
    createNextGen()
    updateGen()
    countNeighbor()
    updateGrid()
    checkedCell()

    if (start) {
        timer = setTimeout(iterate, iterateSpeed)
    }
}


function startStop() {
    let startStop = document.querySelector('#btnStartStop')
    
    if (!start) {
        start = true
        startStop.value = 'Stop'
        iterate()
        } else {
            start = false
            startStop.value='Iterate'
            clearTimeout(timer)
        }

    }
/**
 * @createNextGen 
 */

function resetGrid() {
    location.reload()
}

window.onload=()=>{
    createGrid()
    createGen()
    createArrays()
}
