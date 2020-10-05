import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export default function ReadPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <h1>Read</h1>
        </div>
    );
}
