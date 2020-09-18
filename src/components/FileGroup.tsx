import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import {GroupData} from "../Metadata";
import FileCard from "./FileCard";

const useStyles = makeStyles((theme) => ({
    root: {},
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    header: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4)
    }
}));

export default function FileGroup(groupData: GroupData) {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography gutterBottom className={classes.header} variant="h3">
                {groupData.heading}
            </Typography>

            <Grid container
                  direction={"row"}
                  spacing={4}
                  alignItems={"center"}
                  alignContent={"flex-start"}
                  justify={"flex-start"}>
                {
                    groupData.files.map(fileData => (
                        <Grid item xs={12} sm={4} md={3} xl={2}
                              alignItems={"center"}>
                            <FileCard fileData={fileData}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
