import React from 'react';
import './App.css';
import Header from "./components/Header";
import FileGroup from "./components/FileGroup";
import {data} from "./Metadata";

function App() {
    return (
        <div className="App">
            <Header/>
            {
                data.map(groupData => (<FileGroup heading={groupData.heading} files={groupData.files}/>))
            }
        </div>
    );
}

export default App;
