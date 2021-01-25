import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from 'next/link';
import { logEvent } from '../firebase';
import Spacer from './atoms/Spacer';
import { HeaderNav } from './molecules/HeaderNav';
import DonateButton from './atoms/DonateButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.dark,
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 0 100%)'
    },
    appBar: {},
    toolbar: {
        alignItems: 'center',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            paddingBottom: theme.spacing(8),
            alignItems: 'center'
        }
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
        userSelect: 'none',
        color: theme.palette.common.white,
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 700,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
    titleLink: {
        display: 'contents',
        textTransform: 'none',
        userSelect: 'none',
        msUserSelect: 'none',
        textDecoration: 'none'
    },
    navLink: {
        textTransform: 'none',
        textDecoration: 'none',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        fontWeight: 500
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appBar}
                position="static"
                color={'transparent'}
                elevation={0}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <div>
                            <Link href={'/'}>
                                <a
                                    className={classes.navLink}
                                    onClick={() => logEvent('navigation', { path: 'home' })}>
                                    <Typography className={classes.title} variant="h3">
                                        kanji.sh
                                    </Typography>
                                </a>
                            </Link>
                        </div>

                        <Spacer />

                        <div>
                            <HeaderNav href={'/read'} eventPath={'read'}>
                                read
                            </HeaderNav>
                            <HeaderNav href={'/write'} eventPath={'write'}>
                                write
                            </HeaderNav>
                            <HeaderNav href={'/about'} eventPath={'about'}>
                                about
                            </HeaderNav>

                            <DonateButton />
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
