import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {WritingAnimation} from './atoms/AnimatedImage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        backgroundBlendMode: 'lighten',
        backgroundOrigin: 'padding-box',
        backgroundSize: 'contain',
        backgroundPosition: 'left top, right top'
    },
    textContainer: {
        height: '100%'
    },
    textPrimary: {
        marginBottom: theme.spacing(3)
    },
    textSecondary: {},
    jumboImageContainer: {
        textAlign: 'center'
    },
    jumboImage: {
        width: '70%',
        height: 'auto',
        margin: 'auto'
    }
}));

export default function Jumbotron() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container>
                <Grid container direction={'row'} justify={'center'} spacing={2}>
                    {/* Text Content */}
                    <Grid item xs={12} md={6}>

                        <Grid container className={classes.textContainer} direction="column"
                              justify="center">
                            <Grid item>
                                <Typography gutterBottom variant="h4" className={classes.textPrimary}>
                                    Writing Matters.
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body1" className={classes.textSecondary}>
                                    Yes, you know hundreds of Kanji, and you can read a newspaper or your favorite manga
                                    all the way to the end. But can you write? If you want to learn Kanji by writing or
                                    learn writing Kanji, this is your one-stop site for all the worksheets.
                                </Typography>
                                <Typography gutterBottom variant="body1" className={classes.textSecondary}>
                                    Download printable handwriting practice worksheets for Japanese Kanji by JLPT level,
                                    Grade Level, Wanikani Level, and Frequency. Every sheet is free, now and forever!
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                    {/* Jumbo Image */}
                    <Grid item xs={12} md={6}>
                        <Box className={classes.jumboImageContainer} alignItems={'center'}>
                            <WritingAnimation className={classes.jumboImage}/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
