import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Jumbotron from "../components/Jumbotron";
import Header from "../components/Header";
import NewFileGroup from "../components/CollectionCard";
import {Container, Grid} from "@material-ui/core";

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
            <Container>
                <Grid container spacing={4} justify={"center"}>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewFileGroup
                            collectionKey="jlpt"
                            title={"JLPT"}
                            description={"Description"}
                            metaColor={"#DDD"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewFileGroup
                            collectionKey={"grade"}
                            title={"GRADE"}
                            description={"Description"}
                            metaColor={"#DDD"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewFileGroup
                            collectionKey={"wanikani"}
                            title={"WANIKANI"}
                            description={"Description"}
                            metaColor={"#DDD"}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewFileGroup
                            collectionKey={"frequency"}
                            title={"FREQUENCY"}
                            description={"Description"}
                            metaColor={"#DDD"}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
