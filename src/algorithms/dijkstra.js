import Heap from "heap-js";

const customPriorityComparator = (a, b) => {
    return  a.distance - b.distance;
}

const steps = [
   [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
];

export function dijkstra(grid, startNode, endNode, maxRows, maxCols) {
    const visitingOrder = []
    const minHeap = new Heap(customPriorityComparator)

    startNode.distance = 0
    minHeap.push(startNode)
    while(!minHeap.isEmpty())
    {
        let currNode = minHeap.peek()
        minHeap.pop()
        
        visitingOrder.push(currNode)
        if(currNode.isWall) continue
        
        for(let step of steps) {
            let newRow = currNode.row + step[0]
            let newCol = currNode.col + step[1]
    
            if(newRow >= 0 && newRow < maxRows &&
                newCol >= 0 && newCol < maxCols &&
                grid[newRow][newCol].distance > currNode.distance + 1) {
                    grid[newRow][newCol].distance = currNode.distance + 1
                    grid[newRow][newCol].parent = currNode
                    minHeap.push(grid[newRow][newCol])
                }
        }
        
        if(currNode === endNode) return visitingOrder
    }   
}

export function getTheShortestPath(endNode) {
    const shortestPathOrder = []
    let currNode = endNode
    while(currNode.parent !== null) {
        shortestPathOrder.unshift(currNode)
        currNode = currNode.parent
    }

    shortestPathOrder.unshift(currNode)

    return shortestPathOrder

}


