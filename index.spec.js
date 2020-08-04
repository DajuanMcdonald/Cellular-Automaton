const { resetGrid, updateGrid, createGrid, countNeighbor, createNextGen } = require('./index');
const grid = require('./index')

const example = (a, b) => {
    return a + b;
} 

describe('file: Basics of index.js', () => {

    test('test: 2 + 2  = toBe 4', () => {
        expect(example(2, 2)).toBe(4);

    })

    test('test: createGrid function is exist ', () => {
        const createGridSpy = jest.spyOn(grid, 'createGrid');
        expect(createGridSpy).toBeDefined() 
    })

    test('test : createNextGen function exist', () => {
        const checkNextGen = jest.spyOn(grid, 'createNextGen')
        expect(checkNextGen).toBeDefined()
    })

    test('test: countNeighbors functions is exist', () => {
        const checkCountNeighbor = jest.spyOn(grid, 'countNeighbor')
        expect(checkCountNeighbor).toBeDefined()
    })

    test('test: updateGrid function is exist', () => {
        const checkUpdateGrid = jest.spyOn(grid, 'updateGrid')
        expect(checkUpdateGrid).toBeDefined()
    })

    test('test: updateGen function is exist', () => {
        const checkUpdateGen = jest.spyOn(grid, 'updateGen')
        expect(checkUpdateGen).toBeDefined()
    })

})

describe('file: Functionality of index.js', () => {
    test('test: expect element to have class:alive', () => {
        const checkCell = grid.checkedCell
        expect(checkCell('0_0').toReturnWith('dead'))
        // expect(checkCell).toHaveAttribute('class', 'alive')

    })
})