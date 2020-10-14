import React from "react";
import Jumbotron from "../components/Jumbotron";
import CollectionCard from "../components/CollectionCard";
import {Grid} from "@material-ui/core";
import Page from "./base/Page";

export default function WritePage() {
    return (
        <Page>
            <Jumbotron/>
            <Grid container spacing={4} justify={"center"} alignItems={"stretch"}>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey="jlpt"
                        title={"JLPT"}
                        description={"The Official Worldwide Japanese-Language Proficiency Test, operated by the Japan Foundation and JEES."}
                        metaColor={"#DDD"}
                        backgroundImageUrl={"https://cdn.dribbble.com/users/21081/screenshots/6030723/mango-japanese-language.jpg"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"grade"}
                        title={"GRADE"}
                        description={"List of 1,026 kanji for Japanese students in elementary school, from 1st grade to sixth grade."}
                        metaColor={"#DDD"}
                        backgroundImageUrl={"https://image.freepik.com/free-vector/flat-desgin-japanese-school-with-pink-sakura-leaves_23-2148646803.jpg"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"wanikani"}
                        title={"WANIKANI"}
                        description={"WaniKani is a Japanese radicals, kanji, and vocabulary learning web app that uses mnemonics and SRS to make kanji learning simple."}
                        metaColor={"#00AAFF"}
                        backgroundImageUrl={"https://cdn.wanikani.com/assets/lander/call-to-action-footer-33c6417cfff49d97750409a04fe3c1a94199ecb2c1e36f7478bfcfa0ba2c10d7.png"}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <CollectionCard
                        collectionKey={"frequency"}
                        title={"FREQUENCY"}
                        description={"Kanji list ordered by the frequency they are used in the Japanese Language."}
                        metaColor={"#0D2542"}
                        backgroundImageUrl={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/640px-Great_Wave_off_Kanagawa2.jpg"}/>
                </Grid>
            </Grid>
        </Page>
    );
}
