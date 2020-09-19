import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import common from "@material-ui/core/colors/common";
import IconButton from "@material-ui/core/IconButton";
import {GitHub, PublicRounded, Twitter} from "@material-ui/icons";

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
    link: {
        textDecoration: 'none',
        color: '#FFF',
        fontWeight: 'bolder'
    },
    socialButton: {
        alignSelf: "center",
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
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.copyright} variant="subtitle2" noWrap>
                            Crafted by <a className={classes.link} href="https://aruke.dev">aruke</a> with lots of
                            Coffee
                        </Typography>
                        <IconButton
                            className={classes.socialButton}
                            aria-label="open github">
                            <GitHub/>
                        </IconButton>
                        <IconButton
                            className={classes.socialButton}
                            aria-label="follow me on twitter">
                            <Twitter/>
                        </IconButton>
                        <IconButton
                            className={classes.socialButton}
                            aria-label="my japanese notes">
                            <PublicRounded/>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
