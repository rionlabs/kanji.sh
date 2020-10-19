import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import footer_background from '../images/footer_background.svg';
import Footer from "./Footer";
import {Link} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        paddingTop: '15%',
        background: `url(${footer_background}) no-repeat`,
        backgroundOrigin: 'border-box',
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            paddingTop: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '50%',
        }
    },
    spacer: {
        height: 1
    },
    ackContainer: {
        marginBottom: theme.spacing(8),
        marginRight: '10%',
        marginLeft: '10%'
    },
    textContainer: {
        height: '100%'
    },
    textTitle: {
        marginBottom: theme.spacing(3)
    },
    textBody: {
        textAlign: 'justify',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'inherit',
        }
    }
}));

export default function Acknowledgement() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.spacer}/>
            <div className={classes.ackContainer}>
                <Grid container direction={"row"} justify={"center"} spacing={8}>
                    {/* Text Content */}
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            KanjiVG
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Kanji stroke diagrams are based on data from <Link
                            href={"http://kanjivg.tagaini.net/"}>KanjiVG</Link>, which is copyright © 2009-2012 Ulrich
                            Apel
                            and released under the <Link href={"https://creativecommons.org/licenses/by-sa/3.0/"}>Creative
                            Commons Attribution-Share Alike 3.0</Link> license.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            Sources
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            JLPT kanji data comes from Peter van der Woude's <Link
                            href={"https://jlptstudy.net"}>JLPTStudy</Link> study site.
                            Grades & frequency kanji data is taken from <Link
                            href={"https://en.wikipedia.org/wiki/Kyōiku_kanji"}>Wikipedia</Link> page.
                            Wanikani level data comes from <Link href={"https://docs.api.wanikani.com/"}>Wanikani
                            API</Link>.
                            Meanings & Readings data is copied from David Gouveia's <Link
                            href={"https://github.com/davidluzgouveia/kanji-data"}>GitHub</Link> project.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            Development
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Kanji.sh is open source! Check out the <Link
                            href="https://github.com/aruke/kanji.sh">GitHub page</Link> to see the source code, build
                            it yourself, file an <Link href="https://github.com/aruke/kanji.sh/issues">issue</Link>, and
                            make it better!
                            Show your love by sharing this website and starring the <Link
                            href="https://github.com/aruke/kanji.sh">GitHub repository</Link>!
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    );
}
