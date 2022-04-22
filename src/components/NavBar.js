import React, { useContext } from 'react';
import Dropdown from './Dropdown';

import { generateMaze, wallCreatingOrder } from '../algorithms/maze-generator';

import { MAX_ROWS, MAX_COLS } from '../context/app-actions'
import AppContext from '../context/app-context';

function NavBar() {
    const { grid, reset, clearPath, clearWalls, toggleWeights, turnOnWeights, addWalls} = useContext(AppContext)

    function createMaze() {
        generateMaze(grid, grid[0][0], MAX_COLS, MAX_ROWS)
        const len = wallCreatingOrder.length
        for(let i = 0; i < len; i++) {
            setTimeout(() => {
                let node = wallCreatingOrder[i]
                addWalls(node.row, node.col)
            }, 10 *i)
        }
        
    }

    return (
        <nav>
            <div className="nav--flex">
                <Dropdown />
                <button onClick={() => createMaze()}>Create Maze</button>
                <button onClick={() => turnOnWeights()}>{toggleWeights ? "Add walls" : "Add obstacles"}</button>
            </div>
            <h1 className="nav__title">Pathfinding Visualizer</h1>
            <div className='clear'>
                <button className="clear__btn" onClick={() => reset(grid)}>Clear Grid</button>
                <button className="clear__btn" onClick={() => clearWalls()}>Clear Walls</button>
                <button className="clear__btn" onClick={() => clearPath()}>Clear Path</button>
            </div>
        </nav>
  )
}

export default NavBar;