import React, { useReducer } from 'react';

import AppContext from './app-context';
import { appReducer, init } from './app-reducer';
import { 
    CHOOSE_ALGORITHM,
    RESET,
    UPDATE_WITH_WALLS,
    ADD_WEIGHTS,
    TOOGLE_WEIGHT,
    UPDATE_GRID,
    CLEAR_PATH, 
    CLEAR_WALLS, 
} from "./app-actions"

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

   function turnOnWeights() {
       dispatch({
           type: TOOGLE_WEIGHT
       })
   }

   function addWeights(row, col) {
       dispatch({
           type: ADD_WEIGHTS,
           payload: {
               row,
               col
           }
       })
   }

    //Choose pathfinding algorithm
    function chooseAlgorithm(algorithm) {
        dispatch({
            type: CHOOSE_ALGORITHM,
            payload: algorithm
        })
    }

    function clearWalls() {
        dispatch({
            type: CLEAR_WALLS
        })
    }

    function clearPath() {
        dispatch({
            type: CLEAR_PATH
        })
    }

    //Clear grid
    function reset(grid) {
        dispatch({
            type: RESET,
            payload: grid
        })
    }

    return (
        <AppContext.Provider value={{
            grid : state.grid,
            algorithm : state.algorithm,
            toggleWeights: state.toggleWeights,
            reset,
            chooseAlgorithm,
            addWalls,
            addWeights,
            turnOnWeights,
            updateGrid,
            clearPath,
            clearWalls
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState