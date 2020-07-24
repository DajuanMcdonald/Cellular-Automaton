let speed = 1000;
const rows = 25;
const cols = 25;


function neighbors() {

}


function createGrid() {
    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

        }
    }
    

}

function checkNeighbors(x, y) {
    return neighbors(x-1, y-1) + neighbors(x, y-1)


}

function clock() {
    /**
     * Evolution of n
     */


}

function checkRules(cell, neighbor) {
    /* 
    * 2. ON cell with 2 or 3 ON neighbors stays ON and will again check rules next evolution
    */
   if (neighbor == 2 || neighbor == 3) {

   }



    /*
    * 4. OFF cell with precisely 3 ON neighbors turns ON and will check ruless next evolution
    */ 
   if (neighbor == 3) {

   }

    /*
    * 1. ON cell with less than 2 ON neighbors turns OFF and will check rules next evolution
    */
   if (neighbor < 2) {

   }

    /**
     * 3.ON cell with more than 3 ON neighbors turns OFF and will check rules next evolution
     */
    if (neighbor > 3) {

    }
}

function resetGrid() {


}

