import React from "react";

function Node (props) {

    const extraClassName = props.isStart 
        ? "startNode"
        : props.isEnd
        ? "endNode"
        : ""

    return (
        <div className={`node ${extraClassName}`}></div>
    )
}

export default Node