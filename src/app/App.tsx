import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import ReadPage from "../pages/ReadPage";
import WritePage from "../pages/WritePage";
import AboutPage from "../pages/AboutPage";
import PolicyPage from "../pages/PolicyPage";
import TermsPage from "../pages/TermsPage";
import CollectionPage from "../pages/CollectionPage";

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
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>
                    <Route exact path={"/read"} component={ReadPage}/>
                    <Route exact path={"/write"} component={WritePage}/>
                    <Route exact path={"/write/collection/:collectionKey"} component={CollectionPage}/>
                    <Route exact path={"/about"} component={AboutPage}/>
                    <Route exact path={"/privacy-policy"} component={PolicyPage}/>
                    <Route exact path={"/terms"} component={TermsPage}/>
                </Switch>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
