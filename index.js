// const dimensions = require('./config')

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
/**
 * @currentGen : 
 * @nextGen :
//  * @createGen : 
//  * @initGenArray :
//  * @createGrid : 
//  * @updateGrid : 
 */


const rows = 25; // x
const cols = 25; // y

let start = false;
let timer;
let stepSpeed = 1000;

// there's always more rows than columns
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
// CANVAS
function renderCanvas() {
    let canvas = document.getElementById('tutorial')
    let ctx = canvas.getContext('2d')
    let cells = new Path2D();
    
    
    for (let i = 0; i < rows; i++) {
        
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = 'rgb(0, 0, 200, 0.5)'
            ctx.strokeRect(j * 50, i * 50, 50, 50)
            
            cell = 'y' +i + '_' + 'x' +j;
            
        }
        
    
        canvas.addEventListener('click', () => {
            
            console.log('clicked here');
            console.log();
        })
    }

    // ctx.addEventListener('click', () => {
        //     console.log(i)
    // })
}


// subroutine to count neighbor cells except edge TODO: count edges
function checkedCell(id) {
    let location = this.id.split("_")
    //this is [i]
    let row = Number(location[0]) 
    //this is [j]
    let col = Number(location[1])
    
    // toggle 
    // this.className === 'alive' ? this.setAttribute('class', 'dead') : this.setAttribute('class', 'alive')
    // this.className === 'alive' ? currentGen[row][col] = 1 : currentGen[row][col] = 0
    // this.className==='alive' ? currentGen[row][col] = 0 : currentGen[row][col] = 1
    
    if (this.className==='alive') {
        this.setAttribute("class", "dead")
        currentGen[row][col] = 0
    } else {
        this.setAttribute("class", "alive")
        currentGen[row][col] = 1
    }
    
}



//RULES

// cells clicked will be toggled
function countNeighbor(row, col) {
    let count = 0
    let nrow = Number(row)
    let ncol = Number(col)
    
    if (nrow - 1 > 0) {
        if (currentGen[nrow - 1][ncol] === 1) {
            count++
            console.log(132, `${count}`)
        }
    }
    
    if (nrow - 1 >= 0 && ncol - 1 > 0) {
        if (currentGen[nrow - 1][ncol - 1] === 1) {
            count++
            console.log(139, `${count}`)
        }
    }
    
    if (nrow  + 1 < rows && ncol + 1 < cols) {
        if (currentGen[nrow + 1][ncol  + 1] === 1) {
            count++;
            console.log(144, `${count}`)
        }
    }
    
    //sanity check
    if (ncol - 1 > 0) {
        if (currentGen[nrow][ncol - 1] === 1) {
            count++
            console.log(151, `${count}`)
        }
        
    }
    
    if (ncol + 1 < cols) {
        if (currentGen[nrow][ncol + 1] === 1) {
            count++
            console.log(158, `${count}`)
        }
    }
    
    if (nrow + 1 < rows && ncol - 1 > 0) {
        if (currentGen[nrow + 1][ncol - 1] === 1) {
            count++
            console.log(164, `${count}`)
        }
    }
    
    
    if (nrow + 1 < rows && ncol + 1 < cols) {
        if (currentGen[nrow + 1][ncol - 1] === 1) {
            
            count++;
            console.log(171, `${count}`)
            
        }
           
    }
    
    if (nrow + 1 < rows) {
        if (currentGen[nrow + 1][ncol] === 1) {
            count++;
            console.log(176, `${count}`)

        }
        
    }
    
    console.log(`${count}`)
    return count;
}

function createNextGen( row, col ) {
    for (row in currentGen) {
        //loop again for col
        for (col in currentGen[row]) {
            let neighbors = countNeighbor(row, col)
            
            console.log({neighbors}, {row}, {col})
            
            //check if alive/dead and apply rules
            if (currentGen[row][col] === 1) {
                //any 'live' cell with fewer than 2 live neighbors will die the next iteration (outlier)
                // nextGen[row][col] = 1;
                nextGen[row][col] = 0
                
                if (neighbors < 2 ) {
                    nextGen[row][col] = 0
                    //any 'live' cell with more than 2 but less than 3 neighbors will live on the next iteration (parent)
                }
                
                if (neighbors === 2  || neighbors === 3 ) {
                    nextGen[row][col] = 1
                    // any 'live' cell with 4 live neighbors will die the next iteration (wheel)
                } 
                
                if (neighbors === 3) {
                    nextGen[row][col] = 1
                }
                
                if (neighbors > 3) {
                    nextGen[row][col] = 0
                    
                }
                //any 'dead' 'bottom' cell with exactly 3 live neighbors will be born the next iteration (child)
            }

            if (currentGen[row][col] === 0) {
                if (neighbors && neighbors === 3) {
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
    // let cell = ''
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
let list = []

function randomConfig() {
    
    const cells = document.querySelectorAll('td')
    for (let node of cells) {
        if (list.push(node.id)) {
            currentGen[node] = 1
        }
        
        console.log(`${currentGen[node]}`)
        
        console.log(list.includes(node.id))
        console.log(node.id)
    }

    console.log(`${currentGen}`)
}




//UI
function iterate() {
    createNextGen()
    updateGen()
    countNeighbor()
    updateGrid()

    if (start) {
        timer = setTimeout(iterate, stepSpeed)
    }
    console.log(`${timer}`)
    
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
    
    if (start) {
        timer = setTimeout(iterate, stepSpeed)
    }
}

function generation() {
    if (start) {
        timer = setTimeout(iterate, stepSpeed)
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
            startStop.value='Start'
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
    // renderCanvas()
}

 module.exports = {
     createArrays,
     createGrid,
     countNeighbor,
     checkedCell,
     renderCanvas,
     iterate,
     createNextGen,
     createGen,
     resetGrid,
     startStop,
     stepWise,
     updateGrid,
     updateGen,


 }