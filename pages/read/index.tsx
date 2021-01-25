import React from 'react';
import PageLayout from '../../src/PageLayout';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ConstructionAnimation } from '../../src/component/atoms/AnimatedImage';
import Spacer from '../../src/component/atoms/Spacer';
import SubscriptionForm from '../../src/component/molecules/SubscriptionForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    imageContainer: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    image: {
        width: '100%'
    },
    centerText: {
        textAlign: 'center'
    },
    textField: {
        width: '100%'
    },
    buttonContainer: {
        textAlign: 'center'
    },
    roundButton: {
        borderRadius: theme.spacing(16),
        textTransform: 'none'
    }
}));

export default function ReadPage() {
    const classes = useStyles();
    return (
        <PageLayout>
            <Grid
                container
                direction={'column'}
                alignItems={'stretch'}
                spacing={5}
                justify={'center'}>
                <Grid item xs={12} className={classes.centerText}>
                    <Typography variant={'h3'}>Ooops!</Typography>
                </Grid>
                <Grid item className={classes.imageContainer} xs={12} sm={8} md={6}>
                    <ConstructionAnimation className={classes.image} />
                </Grid>
                <Grid item xs={12} className={classes.centerText}>
                    <Typography variant={'subtitle1'}>
                        I haven't started adding reading sessions yet.
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        If you would like it, signup for the updates. No spams, I promise!
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.buttonContainer}>
                    <SubscriptionForm />
                </Grid>
            </Grid>
            <Spacer space={3} />
        </PageLayout>
    );
}
