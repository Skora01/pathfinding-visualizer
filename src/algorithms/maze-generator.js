const HORIZONTAL = 1
const VERTICAL = 2
export const wallCreatingOrder = []

function getOrientation(width, height) {
    if(width < height) 
        return HORIZONTAL
    else if(width > height)
        return VERTICAL

    return Math.floor(Math.random()*2) === 0 ? HORIZONTAL : VERTICAL
}

function generateOddRandomNumber(length) {
    let randNum = Math.floor(Math.random()*(length/2)) + Math.floor(Math.random()*(length/2))
    if(randNum % 2 === 0) {
        if(randNum === length)
            randNum -= 1
        else
            randNum += 1
    }

    return randNum
}

function generateEvenRandomNumber(length) {
    let randNum = Math.floor(Math.random()*(length/2)) + Math.floor(Math.random()*(length/2))
    if(randNum % 2 !== 0) {
        if(randNum === length)
            randNum -= 1
        else
            randNum += 1
    }

    return randNum
}

export function generateMaze(grid, startingNode, width, height) {
    if(width < 3 || height < 3)
        return 

    const horizontalDivision = getOrientation(width, height) === HORIZONTAL ? true : false

    /*Starting point of a current wall*/
    let wallCol = startingNode.col + (horizontalDivision ? 0 : generateOddRandomNumber(width - 1)) // x- coordinate
    let wallRow = startingNode.row + (horizontalDivision ? generateOddRandomNumber(height - 1) : 0) // y-coordinate

    /*A coordinates of a hole in a current wall*/ 
    const holeCol = wallCol +(horizontalDivision ? generateEvenRandomNumber(width) : 0) // x-coordinate
    const holeRow = wallRow +(horizontalDivision ? 0 : generateEvenRandomNumber(height)) // y-coordinate

    /*Determines if a current wall is a horizontal or vertical division*/
    const wallDirectionCol = horizontalDivision ? 1 : 0
    const wallDirectionRow = horizontalDivision ? 0 : 1

    const wallLength = horizontalDivision ? width : height

    for(let i = 0; i < wallLength; i++) {
        if(wallCol !== holeCol || wallRow !== holeRow) {
            wallCreatingOrder.push(grid[wallRow][wallCol])
        }
        
        /*Creating a wall following the predicted direction*/
        wallCol += wallDirectionCol
        wallRow += wallDirectionRow
    }

    /*Do the same for one side and the other*/ 
    let newCol = startingNode.col
    let newRow = startingNode.row
    let newWidth = horizontalDivision ? width : wallCol - startingNode.col + 1
    let newHeight = horizontalDivision ? wallRow - startingNode.row + 1 : height

    generateMaze(grid, grid[newRow][newCol], newWidth, newHeight)

    newCol = horizontalDivision ? startingNode.col : wallCol + 1
    newRow = horizontalDivision ? wallRow + 1 : startingNode.row
    newWidth = horizontalDivision ? width : startingNode.col + width - wallCol - 1
    newHeight = horizontalDivision ? startingNode.row + height - wallRow - 1 : height
    generateMaze(grid, grid[newRow][newCol], newWidth, newHeight)
}