import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Grid, Link as MuiLink} from "@material-ui/core";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import Spacer from "./atoms/Spacer";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    appBar: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    toolbar: {
        alignItems: 'flex-start',
    },
    copyright: {
        flexGrow: 1,
        alignSelf: 'center',
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
    navLink: {
        display: "inline",
        textTransform: "none",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        textDecoration: 'none',
        cursor: 'pointer',
        color: theme.palette.common.white,
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static" color={"primary"} elevation={0} component={"div"}>
                <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item xs={12} md={6} className={classes.footerRow}>
                        <Typography className={classes.copyright} variant="body1" noWrap>
                            Crafted by <MuiLink underline={"none"} className={classes.link}
                                                href="https://aruke.dev">aruke</MuiLink> with lots of Sushi
                        </Typography>
                    </Grid>
                    <Hidden mdUp>
                        <Spacer/>
                    </Hidden>
                    <Grid item xs={12} md={6} className={classes.footerRow}>
                        <Link href={"/about/privacy-policy"}>
                            <Typography variant={"body1"} className={classes.navLink}>
                                Privacy Policy
                            </Typography>
                        </Link>
                        <Link href={"/about/terms"}>
                            <Typography variant={"body1"} className={classes.navLink}>
                                Terms Of Use
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}
