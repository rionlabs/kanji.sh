import React, {FunctionComponent} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Container, createStyles, StyleRules, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            flexGrow: 1
        },
        spacedContainer: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(10)
        }
    });

interface Props extends WithStyles<typeof styles> {

}

export const Page: FunctionComponent<Props> = (props) => {
    const {classes, children} = props;
    return (
        <div className={classes.root}>
            <Header/>
            <Container className={classes.spacedContainer}>
                <div>
                    {children}
                </div>
            </Container>
            <Footer/>
        </div>
    );
}

export default withStyles(styles)(Page);