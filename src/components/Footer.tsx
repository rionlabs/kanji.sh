import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import common from "@material-ui/core/colors/common";
import IconButton from "@material-ui/core/IconButton";
import {GitHub, PublicRounded, Twitter} from "@material-ui/icons";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        background: '#1d00ff77',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    toolbar: {
        alignItems: 'flex-start',
    },
    copyright: {
        flexGrow: 1,
        alignSelf: 'center',
        fontSize: 'larger',
        color: '#FFF'
    },
    footerRow: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        color: '#FFF',
        fontWeight: 'bolder'
    },
    socialButton: {
        alignSelf: "center",
        textAlign: "center",
        color: common.white,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: '#0004',
        '&:hover': {
            backgroundColor: '#0005',
        },
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static" color={"transparent"} elevation={0}>
                <Container>
                    <Grid container spacing={2} alignItems={"center"} justify={"center"}>
                        <Grid item sm={12} md={6} className={classes.footerRow}>
                            <Typography className={classes.copyright} variant="subtitle2" noWrap>
                                Crafted by <a className={classes.link} href="https://aruke.dev">aruke</a> with lots of
                                Coffee
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={6} className={classes.footerRow}>
                            <IconButton
                                className={classes.socialButton}
                                href={"https://github.com/aruke"}
                                target={"_blank"}
                                aria-label="open github">
                                <GitHub/>
                            </IconButton>
                            <IconButton
                                className={classes.socialButton}
                                href={"https://twitter.com/aruke_"}
                                target={"_blank"}
                                aria-label="follow me on twitter">
                                <Twitter/>
                            </IconButton>
                            <IconButton
                                className={classes.socialButton}
                                href={"https://aruke.dev"}
                                target={"_blank"}
                                aria-label="open my blog/website">
                                <PublicRounded/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
        </div>
    );
}
