import {GetStaticPaths, GetStaticProps} from "next";
import PageLayout from "../../../src/PageLayout";
import {GroupData, mappedData} from "../../../src/Metadata";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import FileCard from "../../../src/component/FileCard";
import Typography from "@material-ui/core/Typography";

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

export default function CollectionPage(pathParams: { collectionId: string }) {
    const classes = useStyles();
    const groupData: GroupData = mappedData.get(pathParams.collectionId)!!;
    return (
        <PageLayout>
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
        </PageLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const collectionId = params!!.collection as string
    return {
        props: {
            collectionId
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [];
    for (let key of mappedData.keys()) {
        paths.push({params: {collection: key}})
    }
    return {
        paths,
        fallback: false
    }
}