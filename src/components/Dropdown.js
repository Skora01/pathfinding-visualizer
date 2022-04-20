import React, { useContext } from 'react'

import AppContext from '../context/app-context'

function Dropdown() {
    const { chooseAlgorithm } = useContext(AppContext)

    return (
        <div className="dropdown">
            <button className="dropdown__btn">Algorithms <span className="dropdown__arrow"></span></button>
            <div className="dropdown__content">
                <button onClick={() => chooseAlgorithm("Dijkstra's")}>Dijkstra's</button>
                <button onClick={() => chooseAlgorithm("A*")}>A* Search</button>
            </div>  
        </div>
  )
}

export default Dropdown