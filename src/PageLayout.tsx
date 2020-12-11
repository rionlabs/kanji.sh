import React, {FunctionComponent} from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Header from "./component/Header";
import Footer from "./component/Footer";
import Container from "@material-ui/core/Container";
import {StyleRules} from "@material-ui/styles";

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            flexGrow: 1,
            minHeight: '100%',
            position: 'relative'
        },
        spacedContainer: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(18)
        }
    });

interface Props extends WithStyles<typeof styles> {

}

export const PageLayout: FunctionComponent<Props> = (props) => {
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

export default withStyles(styles)(PageLayout);