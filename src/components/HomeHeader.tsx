import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Link} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.dark,
        clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)"
    },
    appBar: {},
    toolbar: {
        alignItems: 'flex-start',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
        userSelect: 'none',
        color: theme.palette.common.white,
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    navButton: {
        alignSelf: "center",
        textTransform: "none",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        userSelect: 'none',
        msUserSelect: 'none',
        textDecoration: 'none',
        fontWeight: 400,
        fontFamily: 'Quicksand, sans-serif',
        color: theme.palette.common.white,
        '&:hover': {
            fontWeight: 500
        }
    },
    donateButton: {
        alignSelf: "center",
        marginStart: theme.spacing(2),
        marginEnd: theme.spacing(1),
        padding: theme.spacing(2),
        color: "white"
    }
}));

export default function HomeHeader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="fixed" color={"transparent"} elevation={0}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography className={classes.title} variant="h3" noWrap>
                            kanji.sh
                        </Typography>

                        <Link className={classes.navButton} href={"/read"} variant="h6" underline="none" noWrap>
                            read
                        </Link>
                        <Link className={classes.navButton} href={"/write"} variant="h6" underline="none" noWrap>
                            write
                        </Link>
                        <Link className={classes.navButton} href={"/about"} variant="h6" underline="none" noWrap>
                            about
                        </Link>
                        <IconButton
                            className={classes.donateButton}
                            href="https://www.buymeacoffee.com/aruke"
                            target="_blank"
                            aria-label="buy me a sushi">
                            <span role={"img"} aria-label={"Sushi Emoji"}>🍣</span>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar className={classes.toolbar}/>
        </div>
    );
}
