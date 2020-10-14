import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FileCard from "../components/FileCard";
import Typography from "@material-ui/core/Typography";
import {RouteComponentProps} from "react-router";
import {GroupData, mappedData} from "../Metadata";
import Page from "./base/Page";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    header: {
        marginBottom: theme.spacing(4)
    }
}));

type PageParam = { collectionKey: string };

export default function CollectionPage(pageParams: RouteComponentProps<PageParam>) {
    const classes = useStyles();
    const {collectionKey} = pageParams.match.params
    const groupData: GroupData = mappedData.get(collectionKey)!!;
    console.log("Collection Key " + collectionKey);

    return (
        <Page>
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
        </Page>
    );
}
