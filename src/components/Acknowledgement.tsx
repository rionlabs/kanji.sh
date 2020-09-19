import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import footer_background from '../images/footer_background.svg';
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        paddingTop: 'calc(16%)',
        background: `url(${footer_background}) no-repeat`,
        backgroundOrigin: 'border-box',
        backgroundSize: 'cover',
    },
    spacer: {
        height: 1
    },
    ackContainer: {
        marginBottom: theme.spacing(8),
    },
    textContainer: {
        height: '100%'
    },
    textTitle: {
        marginBottom: theme.spacing(3)
    },
    textBody: {}
}));

export default function Acknowledgement() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.spacer}/>
            <Container className={classes.ackContainer}>
                <Grid container direction={"row"} justify={"center"} spacing={2}>
                    {/* Text Content */}
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            KanjiVG
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at dui ac odio feugiat
                            semper nec at tellus. Donec maximus leo in mauris tempus, non cursus nulla semper. Mauris a
                            consequat justo. In a augue quis magna ornare hendrerit sit amet rhoncus dui. Nullam iaculis
                            ligula vitae ante varius, in maximus sem feugiat. Aenean aliquet, ligula ac eleifend
                            faucibus, nulla orci efficitur nisl, in dictum enim libero eget diam. Quisque et mi vitae
                            massa maximus congue eu sit amet lacus. Sed id velit at lectus porttitor posuere. Donec odio
                            ligula, malesuada non odio sit amet, imperdiet facilisis metus. Sed semper arcu sed
                            dignissim egestas. Nam pretium urna eu magna lacinia ultricies. Maecenas nec fringilla
                            felis, a bibendum purus.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            Sources
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Vivamus blandit velit vitae augue scelerisque vehicula. Suspendisse viverra turpis non
                            vestibulum varius. Mauris pretium lectus ac neque condimentum fringilla. Donec non lacinia
                            justo. Maecenas quis semper tortor. Pellentesque aliquet egestas ante ac consectetur.
                            Praesent vulputate, nisl eget convallis aliquam, nulla ex commodo nibh, ultricies interdum
                            ante lectus eget sem.
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Nunc tristique vitae diam a accumsan. Sed ullamcorper turpis in ligula venenatis malesuada.
                            Aenean leo tortor, lobortis ut enim sed, fermentum venenatis lorem. Cras quis tempor mauris.
                            Proin suscipit elit nibh, id fermentum arcu pharetra sit amet. Suspendisse potenti. Donec
                            eleifend metus eu nibh dictum porta.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="h5" className={classes.textTitle}>
                            Other Data
                        </Typography>
                        <Typography gutterBottom variant="body1" className={classes.textBody}>
                            Sed vehicula purus at semper eleifend. Duis ut sapien nec neque consectetur facilisis at in
                            magna. Suspendisse potenti. Nulla facilisi. Suspendisse tortor diam, consectetur sed
                            tincidunt a, semper eu mi. Ut laoreet risus ac sollicitudin ultrices. Fusce placerat ligula
                            at tortor porta tincidunt. Suspendisse est enim, rutrum id justo nec, dictum cursus dui.
                            Mauris iaculis est sit amet nibh consequat, non ultricies lacus egestas. Aliquam congue, leo
                            sed cursus egestas, ligula mi tincidunt orci, ac bibendum dui ante at ante
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </div>
    );
}
