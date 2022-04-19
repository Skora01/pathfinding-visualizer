import React from "react";
import Main from "./components/Main"

function App() {
    return (
        <div className="container">
            <nav className="nav--flex">
                <h1 className="nav__title">Pathfinding Visualizer</h1>
            </nav>
            <Main />
        </div>
    )
}

export default App