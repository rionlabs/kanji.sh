import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeHeader from "../components/HomeHeader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export default function AboutPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <HomeHeader/>
            <h1>About</h1>
        </div>
    );
}
