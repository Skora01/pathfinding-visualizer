const steps = [
    [-1, 0], // up
     [1, 0], // down
     [0, -1], // left
     [0, 1], // right
 ];

function h(node, endNode) {
    return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col)
}

function getNextNode(openSet, endNode) {
    let nextNode = null
    for(let node of openSet) {
        if(nextNode === null || node.distance + h(node,endNode) < nextNode.distance + h(nextNode,endNode))
            nextNode = node
    } 

    return nextNode
}

export function astar(grid, startNode, endNode, maxRows, maxCols) {
    const visitingOrder = []
    const openSet = new Set()

    startNode.distance = 0
    openSet.add(startNode)
    while(openSet.size > 0) {
        let currNode = getNextNode(openSet, endNode)
        openSet.delete(currNode)

        if(currNode.isWall) continue

        visitingOrder.push(currNode)
        if(currNode === endNode) return visitingOrder

        for(const step of steps) {
            let newRow = currNode.row + step[0]
            let newCol = currNode.col + step[1]

            if(newRow >= 0 && newRow < maxRows &&
                newCol >= 0 && newCol < maxCols) {
                
                const weight = grid[newRow][newCol].isWeight ? 10 : 1
                if(grid[newRow][newCol].distance > currNode.distance + weight) {

                    grid[newRow][newCol].distance = currNode.distance + weight
                    grid[newRow][newCol].parent = currNode

                if(!openSet.has(grid[newRow][newCol]))
                    openSet.add(grid[newRow][newCol])
                }
            }
        }

    }
    return visitingOrder
}

export function getTheShortestPathA(endNode) {
    const shortestPathOrder = []
    let currNode = endNode
    while(currNode.parent !== null) {
        shortestPathOrder.unshift(currNode)
        currNode = currNode.parent
    }

    shortestPathOrder.unshift(currNode)

    return shortestPathOrder
}
