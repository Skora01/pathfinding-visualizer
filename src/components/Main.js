import React,{useState} from "react";
import Node from "./Node";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;


function Main() {

    const [grid, setGrid] = useState(initializeGrid)

    function createNode(row, col) {
        return {
            row: row,
            col : col,
            isStart : row === START_NODE_ROW && col === START_NODE_COL,
            isEnd : row === END_NODE_ROW && col === END_NODE_COL,
            distance: Infinity
        }
    }

    function initializeGrid() {
        const gridArr = []
        for(let row = 0; row < 20; row++)
        {
            const currRow = []
            for(let col = 0; col < 50; col++)
                currRow.push(createNode(row,col))
            
            gridArr.push(currRow)
        }

        return gridArr
    }

    return (
        <main>
            <h1>main</h1>
            <div className="grid">
                {
                    grid.map((row,rowIndex) => {
                        return (
                            <div key={rowIndex} className="grid__row">
                                {
                                    row.map((node,nodeIndex) => {
                                        const {row, col,isStart, isEnd} = node
                                        return (
                                            <Node
                                                key={nodeIndex}
                                                row={row}
                                                col={col}
                                                isStart={isStart}
                                                isEnd={isEnd}
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