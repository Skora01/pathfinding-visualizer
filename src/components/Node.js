import React from "react";

function Node (props) {

    const extraClassName = props.isStart 
        ? "node--start"
        : props.isEnd
        ? "node--end"
        : props.isWall
        ? "node--wall"
        : props.isShortestPath
        ? "node--shortestPath"
        : props.isVisited
        ? "node--visited"
        : ""

    return (
        <div 
            className={`node ${extraClassName}`}
            onMouseDown={() => props.handleMouseDown(props.row, props.col)}
            onMouseEnter={() => props.handleMouseEnter(props.row, props.col)}
            onMouseUp={props.handleMouseUp}>
            </div>
    )
}

export default Node