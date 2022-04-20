import React, { useReducer } from 'react';

import AppContext from './app-context';
import { appReducer, init } from './app-reducer';
import { CHOOSE_ALGORITHM, RESET, UPDATE_WITH_WALLS, UPDATE_GRID } from "./app-actions"

function AppState(props) {
    const [state, dispatch] = useReducer(appReducer,[[]], init)

    //Update grid
    function updateGrid(updateProperty,row,col) {
        dispatch({
            type : UPDATE_GRID,
            payload : {
                updateProperty,
                row,
                col
            }
        })
    }

    //Add walls
    function addWalls(row, col) {
        dispatch({
            type: UPDATE_WITH_WALLS,
            payload: {
                row,
                col
            }
        })
   }

    //Clear grid
    function reset(grid) {
        dispatch({
            type: RESET,
            payload: grid
        })
    }

    //Choose pathfinding algo
    function chooseAlgorithm(algorithm) {
        dispatch({
            type: CHOOSE_ALGORITHM,
            payload: algorithm
        })
    }

    return (
        <AppContext.Provider value={{
            grid : state.grid,
            algorithm : state.algorithm,
            reset,
            chooseAlgorithm,
            addWalls,
            updateGrid
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState