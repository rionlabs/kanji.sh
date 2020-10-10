import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "../components/Header";
import {Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {ReactComponent as WIPImage} from "../images/undraw_programming.svg";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    contentContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8)
    },
    imageContainer: {
        textAlign: 'center',
        maxWidth: '100%',
        maxHeight: '300px'
    },
    centerText: {
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    },
    image: {
        width: '80%',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '300px'
    },
    buttonContainer: {
        textAlign: 'center'
    }
}));

export default function ReadPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <Container className={classes.contentContainer}>
                <Grid container direction={"column"} alignItems={"stretch"} spacing={5} justify={"center"}>
                    <Grid item xs={12} className={classes.centerText}>
                        <Typography variant={"h3"}>Ooops!</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.imageContainer}>
                        <WIPImage className={classes.image}/>
                    </Grid>
                    <Grid item xs={12} className={classes.centerText}>
                        <Typography variant={"subtitle1"}>I haven't started adding reading sessions yet.</Typography>
                        <Typography variant={"subtitle1"}>If you would like it, signup for the updates. No spams, I
                            promise!</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction={"row"} alignItems={"center"} justify={"center"} spacing={2}>
                            <Grid item xs={12} sm={8} md={6} alignContent={"stretch"}>
                                <form noValidate autoComplete="off">
                                    <TextField className={classes.textField} id="outlined-basic" label="Email"
                                               variant="outlined"/>
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} className={classes.buttonContainer}>
                                <Button variant={"contained"} size={"large"} color={"primary"}>Let me know!</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
