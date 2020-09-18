import React from "react";
import {Button, createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {FileData} from "../Metadata";
import withStyles from "@material-ui/core/styles/withStyles";

const NORMAL_ELEVATION = 2;
const HOVER_ELEVATION = 10;

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        media: {
            backgroundColor: theme.palette.grey.A700,
            height: theme.spacing(22),
        },
        title: {
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: `${theme.spacing(22)}px`,
            color: theme.palette.common.white,
            userSelect: "none",
            msUserSelect: "none",
        },
        downloadButton: {
            alignSelf: "center",
            width: "100%",
            marginTop: theme.spacing(2)
        }
    });

interface Props extends WithStyles<typeof styles> {
    fileData: FileData;
}

interface State {
    readonly elevation: number;
}

class FileCard extends React.Component<Props, State> {
    readonly state: State = {
        elevation: NORMAL_ELEVATION
    };

    public render() {
        const {classes, fileData} = this.props;
        const {elevation} = this.state;

        return <Card className={classes.root} onMouseOver={this._elevate} onMouseOut={this._lower}
                     elevation={elevation}>
            <CardMedia className={classes.media}>
                <Typography className={classes.title} gutterBottom variant="h2" component="h2">
                    {fileData.title}
                </Typography>
            </CardMedia>

            <CardContent>
                <Typography gutterBottom variant="subtitle1" align="center">
                    {fileData.description}
                </Typography>

                <Button className={classes.downloadButton}
                        variant="contained"
                        color="primary"
                        disableElevation
                        href={process.env.PUBLIC_URL + fileData.filePath}
                        target="_blank"
                        download>
                    Download PDF
                </Button>
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
}

export default withStyles(styles)(FileCard);
