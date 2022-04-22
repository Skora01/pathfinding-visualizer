const steps = [
    [-1, 0], // up
     [1, 0], // down
     [0, -1], // left
     [0, 1], // right
 ];


export function BFS(grid, startNode, endNode, maxRows, maxCols) {
    const visitingOrder = []

    const nodes = []
    
    nodes.push(startNode)
    visitingOrder.push(startNode)
    while(nodes.length > 0) {
        const currNode = nodes.shift()

        if(currNode === endNode)
            return visitingOrder

        for(const step of steps) {
            let newRow = currNode.row + step[0]
            let newCol = currNode.col + step[1]            

            if(newRow >= 0 && newRow < maxRows &&
                newCol >= 0 && newCol < maxCols &&
                !visitingOrder.includes(grid[newRow][newCol]) &&
                !grid[newRow][newCol].isWall && !grid[newRow][newCol].isWeight) {

                    visitingOrder.push(grid[newRow][newCol])
                    grid[newRow][newCol].parent = currNode
                    nodes.push(grid[newRow][newCol]) 
                }
        }
    }

    return visitingOrder
}

export function getTheShortestPathBFS(endNode) {
    const shortestPathOrder = []
    let currNode = endNode
    while(currNode.parent !== null) {
        shortestPathOrder.unshift(currNode)
        currNode = currNode.parent
    }

    shortestPathOrder.unshift(currNode)

    return shortestPathOrder

}
