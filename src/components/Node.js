import React from "react";

function Node (props) {

    const nodeAttribute = props.isStart 
        ? "node--start"
        : props.isEnd
        ? "node--end"
        : props.isWall
        ? "node--wall"
        : props.isWeight
        ? "node--weight"
        : ""

    const pathNode = props.isShortestPath
    ? "node--shortestPath"
    : props.isVisited
    ? "node--visited"
    : ""

    return (
        <div 
            className={`node ${nodeAttribute} ${pathNode}`}
            onMouseDown={() => props.handleMouseDown(props.row, props.col)}
            onMouseEnter={() => props.handleMouseEnter(props.row, props.col)}
            onMouseUp={props.handleMouseUp}>
            </div>
    )
}

export default Node