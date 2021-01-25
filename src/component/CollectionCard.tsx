import React, { useState } from 'react';
import { createStyles, StyleRules, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

const NORMAL_ELEVATION = 4;
const HOVER_ELEVATION = 10;

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            flexGrow: 1,
            cursor: 'pointer',
            maxWidth: '320px',
            height: '100%',
            marginStart: 'auto',
            marginEnd: 'auto'
        },
        media: {
            height: theme.spacing(22),
            clipPath: 'polygon(0 0, 100% 0%, 100% 90%, 0% 100%)'
        },
        title: {
            textAlign: 'center',
            fontWeight: 400,
            userSelect: 'none',
            msUserSelect: 'none'
        },
        downloadButton: {
            alignSelf: 'center',
            width: '100%',
            marginTop: theme.spacing(2)
        }
    });

interface Props extends WithStyles<typeof styles>, WithRouterProps {
    collectionKey: string;
    title: string;
    description: string;
    metaColor: string;
    backgroundImageUrl: string | undefined;
}

const CollectionCard: (props: Props) => JSX.Element = (props: Props) => {
    const { classes, title, description, metaColor, backgroundImageUrl } = props;
    const [elevation, setElevation] = useState(NORMAL_ELEVATION);

    const _elevate: () => void = () => setElevation(HOVER_ELEVATION);

    const _lower: () => void = () => setElevation(NORMAL_ELEVATION);

    const _onClick: () => Promise<void> = async () => {
        setElevation(NORMAL_ELEVATION);
        await props.router.push(`write/collection/${props.collectionKey}`);
        window.scrollTo(0, 0);
    };

    return (
        <Card
            className={classes.root}
            onMouseOver={_elevate}
            onMouseOut={_lower}
            elevation={elevation}
            onClick={_onClick}>
            <CardMedia
                className={classes.media}
                style={{ backgroundColor: metaColor }}
                image={backgroundImageUrl}
            />

            <CardContent>
                <Typography
                    className={classes.title}
                    gutterBottom
                    variant="h5"
                    component="h5"
                    noWrap>
                    {title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" align="center">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default withRouter(withStyles(styles)(CollectionCard));
