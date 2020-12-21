import React from 'react';
import {createStyles, StyleRules, Theme, WithStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'next/router';
import {WithRouterProps} from 'next/dist/client/with-router';

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
            msUserSelect: 'none',
        },
        downloadButton: {
            alignSelf: 'center',
            width: '100%',
            marginTop: theme.spacing(2)
        }
    });

interface Props extends WithStyles<typeof styles>, WithRouterProps {
    collectionKey: string,
    title: string,
    description: string,
    metaColor: string,
    backgroundImageUrl: string | undefined
}

interface State {
    readonly elevation: number;
}

class CollectionCard extends React.Component<Props, State> {
    readonly state: State = {
        elevation: NORMAL_ELEVATION
    };

    public render() {
        const {classes, title, description, metaColor, backgroundImageUrl} = this.props;
        const {elevation} = this.state;

        return <Card className={classes.root} onMouseOver={this._elevate} onMouseOut={this._lower}
                     elevation={elevation} onClick={this._onClick}>

            <CardMedia className={classes.media} style={{backgroundColor: metaColor}} image={backgroundImageUrl}>

            </CardMedia>

            <CardContent>
                <Typography className={classes.title} gutterBottom variant="h5" component="h5" noWrap>
                    {title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" align="center">
                    {description}
                </Typography>

            </CardContent>
        </Card>
    }

    private _elevate = () => {
        this.setState(() => ({
            elevation: HOVER_ELEVATION
        }));
    };

    private _lower = () => {
        this.setState(() => ({
            elevation: NORMAL_ELEVATION
        }));
    };

    private _onClick = async () => {
        this.setState(() => ({
            elevation: NORMAL_ELEVATION
        }));
        await this.props.router.push(`write/collection/${this.props.collectionKey}`)
        window.scrollTo(0, 0)
    };
}

export default withRouter(withStyles(styles)(CollectionCard));
