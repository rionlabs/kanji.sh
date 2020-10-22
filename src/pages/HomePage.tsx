import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import undraw_book_lover from '../images/undraw_book_lover.svg';
import undraw_studying from '../images/undraw_studying.svg';
import reading_book from '../images/anim/reading_book.json';
import Typography from "@material-ui/core/Typography";
import {Hidden} from "@material-ui/core";
import ServiceCard, {Direction} from "../components/ServiceCard";
import Page from "./base/Page";
import {AnimatedImage} from "../components/AnimatedImage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundBlendMode: 'lighten',
        backgroundOrigin: 'padding-box',
        backgroundSize: 'contain',
        backgroundPosition: 'left top, right top'
    },
    jumboImageContainer: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    jumboImage: {
        width: '70%',
        height: 'auto',
        margin: 'auto'
    },
    textContainer: {
        height: '100%',
        alignSelf: 'center'
    },
    textPrimary: {
        marginBottom: theme.spacing(3)
    },
    primaryContainer: {
        minHeight: theme.spacing(48),
    },
    serviceContainer: {
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            margin: "0",
        }
    },
    textSecondary: {},
    spacer: {
        height: theme.spacing(4)
    },
    bigSpacer: {
        height: theme.spacing(8)
    },
    kanjiTooltip: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.dark,
        boxShadow: theme.shadows[1],
        fontSize: '1em'
    }
}));

export default function HomePage() {
    const classes = useStyles();
    return (
        <Page>
            <Hidden mdUp>
                <div className={classes.spacer}>
                </div>
            </Hidden>
            <Container className={classes.primaryContainer}>
                <Grid container direction={"row"} justify={"center"} alignItems={"stretch"} spacing={4}
                      style={{minHeight: 'inherit'}}>
                    {/* READ */}
                    <Grid item xs={12} md={6} justify={"center"} style={{alignSelf: 'center'}}>
                        <Container>
                            <Grid container className={classes.textContainer}
                                  direction="column"
                                  justify="center"
                                  alignContent={"center"}
                                  alignItems={"center"}>
                                <Grid item>
                                    <Typography gutterBottom variant="h4" className={classes.textPrimary}>
                                        Your one stop tool for practicing kanji.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom component={"p"} variant="h6"
                                                className={classes.textSecondary}>
                                        It already has every kanji worksheet for writing, and soon it will have plenty
                                        to practice reading.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                    {/* WRITE */}
                    <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                        <Box className={classes.jumboImageContainer} alignItems={"center"}>
                            <AnimatedImage animationData={reading_book} className={classes.jumboImage}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <div className={classes.bigSpacer}/>

            <Grid container direction={"column"} justify={"center"}>
                <Grid item xs={12}>
                    <ServiceCard title={"read"}
                                 subtitle="What's the point of remembering kanji if you can't read them in a sentence, eh? Soon you will get practice sessions here for the kanjis you know so that you will be able to read 飛躍的に through anything."
                                 imageUrl={undraw_book_lover} imageDirection={Direction.end}/>
                </Grid>
                <Grid item xs={12}>
                    <ServiceCard title={"write"}
                                 subtitle={"Although it seems old school, writing is still one of the best ways to improve language skills. Dive in the stroke orders, and make sense of complex kanjis."}
                                 imageUrl={undraw_studying} imageDirection={Direction.start}/>
                </Grid>
            </Grid>
            <div className={classes.bigSpacer}/>
        </Page>
    );
}
