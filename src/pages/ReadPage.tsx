import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import construction_in_process from '../images/anim/construction_in_process.json';
import Grid from "@material-ui/core/Grid";
import Page from "./base/Page";
import {AnimatedImage} from "../components/AnimatedImage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    imageContainer: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    image: {
        width: '100%',
    },
    centerText: {
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    },
    buttonContainer: {
        textAlign: 'center'
    },
    roundButton: {
        borderRadius: theme.spacing(16),
        textTransform: 'none'
    },
    bigSpacer: {
        height: theme.spacing(8)
    }
}));

export default function ReadPage() {
    const classes = useStyles();
    return (
        <Page>
            <Grid container direction={"column"} alignItems={"stretch"} spacing={5} justify={"center"}>
                <Grid item xs={12} className={classes.centerText}>
                    <Typography variant={"h3"}>Ooops!</Typography>
                </Grid>
                <Grid item className={classes.imageContainer} xs={12} sm={8} md={6} alignContent={"center"}>
                    <AnimatedImage animationData={construction_in_process} className={classes.image}/>
                </Grid>
                <Grid item xs={12} className={classes.centerText}>
                    <Typography variant={"subtitle1"}>I haven't started adding reading sessions yet.</Typography>
                    <Typography variant={"subtitle1"}>If you would like it, signup for the updates. No spams, I
                        promise!</Typography>
                </Grid>
                <Grid item xs={12} className={classes.buttonContainer}>
                    <Button className={classes.roundButton} target={"_blank"}
                            href={"https://forms.gle/SYgRsPGE1Zhq2GKe8"}
                            variant={"contained"} size={"large"} color={"primary"}>Subscribe for Updates!</Button>
                </Grid>
            </Grid>
            <div className={classes.bigSpacer}/>
        </Page>
    );
}
