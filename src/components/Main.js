import React,{useState} from "react";
import Node from "./Node";
import {dijkstra, getTheShortestPath} from "../algorithms/dijkstra";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;
const MAX_ROWS = 20
const MAX_COLS = 50


function Main() {

    const [grid, setGrid] = useState(initializeGrid)

    function createNode(row, col) {
        return {
            row: row,
            col : col,
            isStart : row === START_NODE_ROW && col === START_NODE_COL,
            isEnd : row === END_NODE_ROW && col === END_NODE_COL,
            isVisited: false,
            isShortestPath: false,
            distance: Infinity,
            parent: null
        }
    }

    function initializeGrid() {
        const gridArr = []
        for(let row = 0; row < MAX_ROWS; row++)
        {
            const currRow = []
            for(let col = 0; col < MAX_COLS; col++)
                currRow.push(createNode(row,col))
            
            gridArr.push(currRow)
        }

        return gridArr
    }

    function animateShortestPath(shortestPath) {
        const len = shortestPath.length
        for(let i = 0; i < len; i++) {
            setTimeout(() => {
                const currNode = shortestPath[i]
                let newGrid = grid.slice()
                const newNode = {
                    ...currNode,
                    isShortestPath : true
                }

                newGrid[currNode.row][currNode.col] = newNode
                setGrid(newGrid)
            }, 25 * i)
        }
    }

    function animate(visitingOrder, shortestPath) {
        const len = visitingOrder.length
        for(let i = 0; i <= len; i++) {

            if(i === len) {
              setTimeout(() => {
                animateShortestPath(shortestPath)
              }, 10 * i)
              return
            }
            setTimeout(() => {
                const currNode = visitingOrder[i]
                let newGrid = grid.slice()
                const newNode = {
                    ...currNode,
                    isVisited : true
                }

                newGrid[currNode.row][currNode.col] = newNode
                setGrid(newGrid)
            }, 10* i)

            // animateShortestPath(shortestPath)
        }
    }

    function visualize() {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const endNode = grid[END_NODE_ROW][END_NODE_COL]
        const visitingOrder = dijkstra(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
        const shortestPath = getTheShortestPath(endNode)
        animate(visitingOrder, shortestPath)
        // console.log(visitingOrder)
    }

    return (
        <main>
            <h1>main</h1>
            <button 
                className="main__btn"
                onClick={visualize}>Visualize</button>
            <div className="grid">
                {
                    grid.map((row,rowIndex) => {
                        return (
                            <div key={rowIndex} className="grid__row">
                                {
                                    row.map((node,nodeIndex) => {
                                        const {row, col,isStart, isEnd, isVisited,isShortestPath} = node
                                        return (
                                            <Node
                                                key={nodeIndex}
                                                row={row}
                                                col={col}
                                                isStart={isStart}
                                                isEnd={isEnd}
                                                isVisited={isVisited}
                                                isShortestPath={isShortestPath}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Main