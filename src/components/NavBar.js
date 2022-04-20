import React, { useContext } from 'react';
import Dropdown from './Dropdown';

import AppContext from '../context/app-context';

function NavBar() {
    const { grid,reset } = useContext(AppContext)

    return (
        <nav className="nav--flex">
            <Dropdown />    
            <h1 className="nav__title">Pathfinding Visualizer</h1>
            <button className="clearGrid__btn" onClick={() => reset(grid)}>Clear Grid</button>
        </nav>
  )
}

export default NavBar;