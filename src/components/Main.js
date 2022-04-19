import React,{ useState } from "react";
import Node from "./Node";
import { astar, getTheShortestPath } from "../algorithms/astar";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;
const MAX_ROWS = 25
const MAX_COLS = 63


function Main() {

    const [grid, setGrid] = useState(initializeGrid)
    const [mouseDown, setMouseDown] = useState(false)

    function createNode(row, col) {
        return {
            row: row,
            col : col,
            isStart : row === START_NODE_ROW && col === START_NODE_COL,
            isEnd : row === END_NODE_ROW && col === END_NODE_COL,
            isVisited : false,
            isShortestPath : false,
            isWall : false,
            distance : Infinity,
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
                // let newGrid = grid.slice()
                // const newNode = {
                //     ...currNode,
                //     isShortestPath : true
                // }

                // newGrid[currNode.row][currNode.col] = newNode
                // setGrid(newGrid)
                setGrid(prevGrid => {
                    return prevGrid.map(item => {
                        return item.map(prevNode => {
                            return prevNode.row === currNode.row && prevNode.col === currNode.col
                                ? {...prevNode, isShortestPath: true}
                                : prevNode
                        })
                    })
                })
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
                // let newGrid = grid.slice()
                // const newNode = {
                //     ...currNode,
                //     isVisited : true
                // }

                // newGrid[currNode.row][currNode.col] = newNode
                //setGrid(newGrid)
                setGrid(prevGrid => {
                    return prevGrid.map(item => {
                        return item.map(prevNode => {
                            return prevNode.row === currNode.row && prevNode.col === currNode.col
                                ? {...prevNode, isVisited: true}
                                : prevNode
                        })
                    })
                })
            }, 10 * i)

        }
    }

    function visualize() {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const endNode = grid[END_NODE_ROW][END_NODE_COL]
        const visitingOrder = astar(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
        const shortestPath = getTheShortestPath(endNode)
        animate(visitingOrder, shortestPath)
    }

    /*mouse handlers*/     
    function handleMouseDown(row, col) {
        updateGridWithWalls(row, col)
        setMouseDown(true)
    }

    function handleMouseEnter(row, col) {
        if(!mouseDown) return;

        updateGridWithWalls(row, col)
    }

    function handleMouseUp() {
        setMouseDown(false)
    }   

    /*drag & drop handlers*/ 
    // function handleDragStart() {

    // }
   function updateGridWithWalls(row, col) {
        setGrid(prevGrid => {
            return prevGrid.map(item => {
                return item.map(prevNode => {
                    return prevNode.row === row && prevNode.col === col
                        ? {...prevNode, isWall : !prevNode.isWall}
                        : prevNode
                })
            })
        })
   }

   function clearGrid() {
       setGrid(initializeGrid)
   }

    return (
        <main>
            <button 
                className="main__btn"
                onClick={visualize}>
                    Visualize
            </button>
            <button onClick={clearGrid}>Clear Grid</button>
            <div className="grid">
                {
                    grid.map((row,rowIndex) => {
                        return (
                            <div key={rowIndex} className="grid__row">
                                {
                                    row.map((node,nodeIndex) => {
                                        const {row, col,isStart, isEnd, isVisited,isShortestPath,isWall} = node
                                        return (
                                            <Node
                                                key={nodeIndex}
                                                row={row}
                                                col={col}
                                                isStart={isStart}
                                                isEnd={isEnd}
                                                isVisited={isVisited}
                                                isShortestPath={isShortestPath}
                                                isWall={isWall}
                                                handleMouseDown={handleMouseDown}
                                                handleMouseEnter={handleMouseEnter}
                                                handleMouseUp={handleMouseUp}
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