import React, { useContext } from 'react';
import Dropdown from './Dropdown';

import AppContext from '../context/app-context';

function NavBar() {
    const { grid, reset, clearPath, clearWalls, toggleWeights, turnOnWeights } = useContext(AppContext)

    return (
        <nav>
            <Dropdown />
            <button onClick={() => turnOnWeights()}>{toggleWeights ? "Add walls" : "Add obstacles"}</button>
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