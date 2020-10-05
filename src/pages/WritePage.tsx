import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Jumbotron from "../components/Jumbotron";
import {data} from "../Metadata";
import FileGroup from "../components/FileGroup";
import Acknowledgement from "../components/Acknowledgement";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export default function WritePage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <Jumbotron/>
            {
                data.map(groupData => (<FileGroup heading={groupData.heading} files={groupData.files}/>))
            }
            <Acknowledgement/>
        </div>
    );
}
