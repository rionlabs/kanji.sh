import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import common from "@material-ui/core/colors/common";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        background: theme.palette.background.paper
    },
    toolbar: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    donateButton: {
        alignSelf: "center",
        color: common.white,
        textTransform: "none",
        borderRadius: 25,
        backgroundColor: common.black,
        '&:hover': {
            backgroundColor: common.black,
        },
    }
}));

export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="fixed" color={"transparent"} elevation={1}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.title} variant="h3" noWrap>
                            kanji.sh
                        </Typography>
                        <Hidden xsDown>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                className={classes.donateButton}
                                href="https://www.buymeacoffee.com/aruke"
                                target="_blank"
                                aria-label="buy me a coffee">
                                <span role={"img"} aria-label={"Sushi Emoji"}>🍣</span> Buy me a Sushi
                            </Button>
                        </Hidden>

                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.toolbar}/>
        </div>
    );
}
