import React from "react";

function Node (props) {

    const extraClassName = props.isStart 
        ? "node--start"
        : props.isEnd
        ? "node--end"
        : props.isShortestPath
        ? "node--shortestPath"
        : props.isVisited
        ? "node--visited"
        : ""

    return (
        <div className={`node ${extraClassName}`}></div>
    )
}

export default Node