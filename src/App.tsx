import React from 'react';
import './App.css';
import {FileCard} from "./components/FileCard";

function App() {
    return (
        <div className="App">
            <h2>Kanji Printer</h2>
            <FileCard title="Title" description="Dummy descriptoin for th e card" kanjiCount={103}/>
        </div>
    );
}

export default App;
