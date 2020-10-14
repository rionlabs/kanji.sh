import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import Link from "@material-ui/core/Link";

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
    spacer: {
        padding: theme.spacing(1),
    },
    link: {
        textDecoration: 'none',
        color: '#FFF',
        fontWeight: 'bolder'
    },
    navLink: {
        textTransform: "none",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        textDecoration: 'none',
        color: theme.palette.common.white,
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static" color={"primary"} elevation={0} component={"div"}>
                <Grid container alignItems={"center"} justify={"center"} spacing={1}>
                    <Grid item sm={12} md={6} className={classes.footerRow}>
                        <Typography className={classes.copyright} variant="body1" noWrap>
                            Crafted by <Link underline={"none"} className={classes.link}
                                             href="https://aruke.dev">aruke</Link> with lots of Sushi
                        </Typography>
                    </Grid>
                    <Grid item sm={12} md={6} className={classes.footerRow}>
                        <Link variant={"body1"} className={classes.navLink} href={"/about/privacy-policy"}>
                            Privacy Policy
                        </Link>
                        <Link variant={"body1"} className={classes.navLink} href={"/about/terms"}>
                            Terms Of Use
                        </Link>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}
