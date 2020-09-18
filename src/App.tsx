import React from 'react';
import './App.css';
import Header from "./components/Header";
import FileGroup from "./components/FileGroup";
import {data} from "./Metadata";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

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
                {
                    data.map(groupData => (<FileGroup heading={groupData.heading} files={groupData.files}/>))
                }
            </div>
        </MuiThemeProvider>
    );
}

export default App;
