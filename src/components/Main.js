import React,{ useState, useContext } from "react";
import Node from "./Node";

import { astar, getTheShortestPathA } from "../algorithms/astar";
import { dijkstra, getTheShortestPathD } from "../algorithms/dijkstra";
import { DFS, getTheShortestPathDFS } from "../algorithms/DFS";
import { BFS, getTheShortestPathBFS } from "../algorithms/BFS";

import AppContext from "../context/app-context";
import {
    START_NODE_ROW,
    START_NODE_COL,
    END_NODE_ROW,
    END_NODE_COL,
    MAX_ROWS,
    MAX_COLS, 
} from "../context/app-actions"


function Main() {
    const [mouseDown, setMouseDown] = useState(false)
    const { algorithm, grid, addWalls,updateGrid} = useContext(AppContext) 

    function animateShortestPath(shortestPath) {
        const len = shortestPath.length
        for(let i = 0; i < len; i++) {
            setTimeout(() => {
                const currNode = shortestPath[i]
                updateGrid("isShortestPath", currNode.row, currNode.col)
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
                updateGrid("isVisited", currNode.row, currNode.col)

            }, 10 * i)

        }
    }

    function visualize() {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const endNode = grid[END_NODE_ROW][END_NODE_COL]
        let visitingOrder = []
        let shortestPath = []
        switch(algorithm) {
            case "Dijkstra's": {
                visitingOrder = dijkstra(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
                shortestPath = getTheShortestPathD(endNode)
                break
            }
            case "A*": {
                visitingOrder = astar(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
                shortestPath = getTheShortestPathA(endNode)
                break
            }
            case "DFS": {
                visitingOrder = DFS(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
                shortestPath = getTheShortestPathDFS(endNode)
                break
            }
            case "BFS": {
                visitingOrder = BFS(grid, startNode, endNode, MAX_ROWS, MAX_COLS)
                shortestPath = getTheShortestPathBFS(endNode) 
                break
            }
            default:
                visitingOrder = []
                shortestPath = []
        }
        animate(visitingOrder, shortestPath)
    }

    /*mouse handlers*/     
    function handleMouseDown(row, col) {
        addWalls(row, col)
        setMouseDown(true)
    }

    function handleMouseEnter(row, col) {
        if(!mouseDown) return;

        addWalls(row, col)
    }

    function handleMouseUp() {
        setMouseDown(false)
    }   

    return (
        <main>
            <button 
                className="visualize__btn"
                onClick={visualize}>
                    {algorithm === "" ? "Pick an Algorithm!" : `Visualize ${algorithm}`}
            </button>
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