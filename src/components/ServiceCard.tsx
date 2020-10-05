import React from "react";
import {createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            flexGrow: 1,
            minHeight: theme.spacing(64),
        },

        startBgImage: {
            background: "linear-gradient(0deg, rgba(42,77,144,1) 0%, rgba(26,33,129,1) 100%)",
            clipPath: "polygon(0 0, 40% 0, 50% 100%, 0 100%)"
        },
        imageBox: {},
        textBoxEnd: {
            minHeight: 'inherit',
            background: "linear-gradient(0deg, rgba(55,60,129,1) 0%, rgba(62,42,144,1) 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 20% 100%)",
            paddingStart: "15%",
            paddingTop: "10%"

        },
        textBoxStart: {
            minHeight: 'inherit',
            background: "linear-gradient(0deg, rgba(42,77,144,1) 0%, rgba(26,33,129,1) 100%)",
            clipPath: "polygon(0 0, 80% 0, 100% 100%, 0 100%)",
            paddingEnd: "15%",
            paddingTop: "10%"
        },
        media: {
            height: theme.spacing(32),
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center'
        },
        title: {
            fontWeight: 400,
            color: theme.palette.common.white,
            userSelect: "none",
            msUserSelect: "none",
        },
        subtitle: {
            color: theme.palette.common.white
        }
    });

interface Props extends WithStyles<typeof styles> {
    title: string,
    subtitle: string,
    imageUrl: string,
    imageDirection: Direction
}

export enum Direction {
    start, end
}

class ServiceCard extends React.Component<Props> {

    public render() {
        // const {classes/*, fileData*/} = this.props;
        const {classes, title, subtitle, imageUrl, imageDirection} = this.props;

        /* {(imageDirection == Direction.start) ? classes.rootStartImage : classes.rootEndImage} */

        return (
            <div className={classes.root}>
                <Grid
                    container
                    direction={(imageDirection === Direction.start) ? 'row-reverse' : 'row'}
                    alignItems={"center"}
                    style={{minHeight: 'inherit'}}>
                    {/* Image */}
                    <Grid className={classes.imageBox} item xs={5}>
                        <Container>
                            <Box style={{textAlign: (imageDirection === Direction.start) ? 'left' : 'right'}}>
                                <object style={{width: "80%"}} type="image/svg+xml" data={imageUrl}>
                                    Study Kanji!
                                </object>
                            </Box>
                        </Container>
                    </Grid>

                    {/* Text */}
                    <Grid className={(imageDirection === Direction.start) ? classes.textBoxStart : classes.textBoxEnd}
                          item xs={7} alignContent={"flex-start"}
                          style={{minHeight: 'inherit'}}>
                        <Container style={{minHeight: 'inherit'}}>
                            <Typography className={classes.title} gutterBottom variant="h2" component="h5">
                                {title}
                            </Typography>
                            <Typography className={classes.subtitle} gutterBottom component='p' variant="h6">
                                {subtitle}
                            </Typography>
                        </Container>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(ServiceCard);
