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
import ScrollView from "../components/ScrollView";

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
                <ScrollView>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route exact path={"/read"} component={ReadPage}/>
                        <Route exact path={"/write"} component={WritePage}/>
                        <Route exact path={"/write/collection/:collectionKey"} component={CollectionPage}/>
                        <Route exact path={"/about"} component={AboutPage}/>
                        <Route exact path={"/about/privacy-policy"} component={PolicyPage}/>
                        <Route exact path={"/about/terms"} component={TermsPage}/>
                    </Switch>
                </ScrollView>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
