import React from "react";
import Jumbotron from "../components/Jumbotron";
import NewFileGroup from "../components/CollectionCard";
import {Grid} from "@material-ui/core";
import Page from "./base/Page";

export default function WritePage() {
    return (
        <Page>
            <Jumbotron/>
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
        </Page>
    );
}
