const steps = [
    [-1, 0], // up
     [1, 0], // down
     [0, -1], // left
     [0, 1], // right
 ];

const visitingOrder = []
const result = []
let pathFound = false

export function DFS(grid, startNode, endNode, maxRows, maxCols) {
    
    if(startNode === endNode) {
        result.push(endNode)
        pathFound = true
        return visitingOrder
    }

    visitingOrder.push(startNode)
    result.push(startNode)

    for(const step of steps) {
        let newRow = startNode.row + step[0]
        let newCol = startNode.col + step[1]
        
        if(newRow >= 0 && newRow < maxRows &&
            newCol >= 0 && newCol < maxCols)    {
            let currNode = grid[newRow][newCol]

            if(!visitingOrder.includes(currNode) && !pathFound)
                DFS(grid, currNode, endNode, maxRows,maxCols)

            if(pathFound)
                return visitingOrder

            result.pop()
        }

    }

}

export function getTheShortestPathDFS(endNode) {
    return result
}