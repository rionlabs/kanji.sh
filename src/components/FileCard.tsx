import React from "react";
import {Button} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import styled from "@material-ui/core/styles/styled";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

type CardMeta = {
    title: String
    description: String
    kanjiCount: number
}

const DownloadButton = styled(Button)({});

export class FileCard extends React.Component<CardMeta> {
    render() {
        return (
            <Card>
                <h3>{this.props.title}</h3>
                <CardContent>
                    <h5>{this.props.description}</h5>
                    <p>Kanji Count: {this.props.kanjiCount}</p>
                </CardContent>
                <CardActions>
                    <DownloadButton>Download PDF</DownloadButton>
                </CardActions>
            </Card>)
    }
}
