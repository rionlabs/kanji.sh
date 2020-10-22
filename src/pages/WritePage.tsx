import React from "react";
import Jumbotron from "../components/Jumbotron";
import CollectionCard from "../components/CollectionCard";
import {Grid} from "@material-ui/core";
import Page from "./base/Page";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    bigSpacer: {
        height: theme.spacing(8)
    }
}));

export default function WritePage() {
    const classes = useStyles();
    return (
        <Page>
            <Jumbotron/>
            <div className={classes.bigSpacer}/>
            <Grid container spacing={4} justify={"center"} alignItems={"stretch"}>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey="jlpt"
                        title={"JLPT"}
                        description={"The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES."}
                        metaColor={"#1A7EC3"}
                        backgroundImageUrl={"https://firebasestorage.googleapis.com/v0/b/kanji-sh.appspot.com/o/public%2Fjlpt.png?alt=media&token=6f61bae8-72b8-4112-bbdd-7e7a29749d34"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"grade"}
                        title={"GRADE"}
                        description={"List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade."}
                        metaColor={"#5C9F4F"}
                        backgroundImageUrl={"https://firebasestorage.googleapis.com/v0/b/kanji-sh.appspot.com/o/public%2Fgrade.png?alt=media&token=e4a2d840-74b3-4cbe-9a22-ff3ccc481f0b"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"wanikani"}
                        title={"WANIKANI"}
                        description={"WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple."}
                        metaColor={"#00AAFF"}
                        backgroundImageUrl={"https://firebasestorage.googleapis.com/v0/b/kanji-sh.appspot.com/o/public%2Fwanikani.png?alt=media&token=f2034a73-9e05-498e-9d12-6761ff1b821c"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"frequency"}
                        title={"FREQUENCY"}
                        description={"Kanji list ordered by the frequency they are used in the Japanese Language."}
                        metaColor={"#0D2542"}
                        backgroundImageUrl={"https://firebasestorage.googleapis.com/v0/b/kanji-sh.appspot.com/o/public%2Ffrequency.png?alt=media&token=5ccae9c1-4fc8-4682-9aae-f9feb8f8497c"}/>
                </Grid>
            </Grid>
            <div className={classes.bigSpacer}/>
        </Page>
    );
}
