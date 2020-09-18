import React from "react";
import {Button} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {FileData} from "../Metadata";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
        alignSelf: "center"
    }
}));

export default function FileCard(fileData: FileData) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media}>
                <Typography className={classes.title} gutterBottom variant="h2" component="h2">
                    {fileData.title}
                </Typography>
            </CardMedia>

            <CardContent>
                <Typography gutterBottom variant="body1">
                    {fileData.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button className={classes.downloadButton}>Download PDF</Button>
            </CardActions>
        </Card>)
}
