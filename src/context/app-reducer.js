import {
    CHOOSE_ALGORITHM,
    RESET,
    START_NODE_ROW,
    START_NODE_COL,
    END_NODE_ROW,
    END_NODE_COL,
    MAX_ROWS,
    MAX_COLS, 
    UPDATE_WITH_WALLS,
    UPDATE_GRID
} from "./app-actions"

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

export function init() {
    const initialGrid = []
    for(let row = 0; row < MAX_ROWS; row++)
    {
        const currRow = []
        for(let col = 0; col < MAX_COLS; col++)
            currRow.push(createNode(row,col))
        
        initialGrid.push(currRow)
    }

    return {grid : initialGrid, algorithm : ""}
}

export function appReducer(state, action) {
    switch(action.type) {
        case CHOOSE_ALGORITHM: return {
                ...state,
                algorithm : action.payload
        }
        case RESET: return init(action.payload)
        case UPDATE_WITH_WALLS: return {
            ...state,
            grid : state.grid.map(item => {
                return item.map(prevNode => {
                    return prevNode.row === action.payload.row &&
                            prevNode.col === action.payload.col 
                            ? {...prevNode, isWall : !prevNode.isWall}
                            : prevNode
                })
            })
        }
        case UPDATE_GRID: return {
            ...state,
            grid : state.grid.map(item => {
                return item.map(prevNode => {
                    return prevNode.row === action.payload.row &&
                            prevNode.col === action.payload.col
                            ? {...prevNode,[action.payload.updateProperty] : true}
                            : prevNode
                })
            })
        }
        default: return state
    }
}
