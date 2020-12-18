import React from 'react';
import PageLayout from "../../src/PageLayout";
import Jumbotron from "../../src/component/Jumbotron";
import CollectionCard from "../../src/component/CollectionCard";
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    bigSpacer: {
        height: theme.spacing(8)
    }
}));

export default function WritePage() {
    const classes = useStyles();
    return (
        <PageLayout>
            <Jumbotron/>
            <div className={classes.bigSpacer}/>
            <Grid container spacing={4} justify={"center"} alignItems={"stretch"}>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey="jlpt"
                        title={"JLPT"}
                        description={"The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES."}
                        metaColor={"#1A7EC3"}
                        backgroundImageUrl={"/assets/png/jlpt.png"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"grade"}
                        title={"GRADE"}
                        description={"List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade."}
                        metaColor={"#5C9F4F"}
                        backgroundImageUrl={"/assets/png/grade.png"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"wanikani"}
                        title={"WANIKANI"}
                        description={"WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple."}
                        metaColor={"#00AAFF"}
                        backgroundImageUrl={"/assets/png/wanikani.png"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"frequency"}
                        title={"FREQUENCY"}
                        description={"Kanji list ordered by the frequency they are used in the Japanese Language."}
                        metaColor={"#0D2542"}
                        backgroundImageUrl={"/assets/png/frequency.png"}/>
                </Grid>
            </Grid>
            <div className={classes.bigSpacer}/>
        </PageLayout>
    );
}
