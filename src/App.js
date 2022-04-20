import React from "react";
import Main from "./components/Main"
import NavBar from "./components/NavBar"

import AppState from "./context/AppState";

function App() {

    return (
        <div className="container">
            <AppState>
                <NavBar />
                <Main />
            </AppState>
        </div>
    )
}

export default App