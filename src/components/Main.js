import React,{useState} from "react";
import Node from "./Node"

function Main() {

    const [grid, setGrid] = useState(initializeGrid)

    function createNode(row, col) {
        return {
            row: row,
            col : col
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
                                        const {row, col} = node
                                        return (
                                            <Node
                                                key={nodeIndex}
                                                row={row}
                                                col={col}
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