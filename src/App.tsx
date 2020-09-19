import React from 'react';
import './App.css';
import Header from "./components/Header";
import FileGroup from "./components/FileGroup";
import {data} from "./Metadata";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Jumbotron from "./components/Jumbotron";
import Acknowledgement from "./components/Acknowledgement";

function App() {
    const appTheme = createMuiTheme({
        typography: {
            allVariants: {
                fontFamily: "Montserrat, sans-serif"
            }
        }
    });

    return (
        <MuiThemeProvider theme={appTheme}>
            <div className="App">
                <Header/>
                <Jumbotron/>
                {
                    data.map(groupData => (<FileGroup heading={groupData.heading} files={groupData.files}/>))
                }
                <Acknowledgement/>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
