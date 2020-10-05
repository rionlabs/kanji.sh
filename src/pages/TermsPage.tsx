import HomeHeader from "../components/HomeHeader";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    spacedContainer: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8)
    }
}));

export default function TermsPage() {
    const classes = useStyles();
    return (
        <div>
            <HomeHeader/>
            <Container className={classes.spacedContainer}>
                <Typography variant={"h3"} gutterBottom>Terms &amp; Conditions</Typography>
                <Typography variant={"body1"} gutterBottom>
                    By using the web app (referred as 'app' from here), these terms will
                    automatically apply to you – you should make sure therefore
                    that you read them carefully before using the app. The app itself, and all the trade marks,
                    copyright,
                    database rights and other intellectual property rights related
                    to it, still belong to Rajanikant Deshmukh.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    Rajanikant Deshmukh is committed to ensuring that the app is
                    as useful and efficient as possible. For that reason, we
                    reserve the right to make changes to the app or to charge for
                    its services, at any time and for any reason. We will never
                    charge you for the app or its services without making it very
                    clear to you exactly what you’re paying for.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    The app does use third party services that declare their own
                    Terms and Conditions.
                </Typography> <Typography variant={"body1"} gutterBottom>
                Link to Terms and Conditions of third party service
                providers used by the app
                <ul>
                    <li><a href="https://firebase.google.com/terms/analytics" target="_blank"
                           rel="noopener noreferrer">Google Analytics for Firebase</a></li>
                </ul>
            </Typography>
                <Typography variant={"body1"} gutterBottom>
                    You should be aware that there are certain things that
                    Rajanikant Deshmukh will not take responsibility for. Certain
                    functions of the app will require the app to have an active
                    internet connection. The connection can be Wi-Fi, or provided
                    by your mobile network provider, but Rajanikant Deshmukh
                    cannot take responsibility for the app not working at full
                    functionality if you don’t have access to Wi-Fi, and you don’t
                    have any of your data allowance left.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    If you’re using the app outside of an area with Wi-Fi, you
                    should remember that your terms of the agreement with your
                    mobile network provider will still apply. As a result, you may
                    be charged by your mobile provider for the cost of data for
                    the duration of the connection while accessing the app, or
                    other third party charges. In using the app, you’re accepting
                    responsibility for any such charges, including roaming data
                    charges if you use the app outside of your home territory
                    (i.e. region or country) without turning off data roaming. If
                    you are not the bill payer for the device on which you’re
                    using the app, please be aware that we assume that you have
                    received permission from the bill payer for using the app.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    Along the same lines, Rajanikant Deshmukh cannot always take
                    responsibility for the way you use the app i.e. You need to
                    make sure that your device stays charged – if it runs out of
                    battery and you can’t turn it on to avail the Service,
                    Rajanikant Deshmukh cannot accept responsibility.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    With respect to Rajanikant Deshmukh’s responsibility for your
                    use of the app, when you’re using the app, it’s important to
                    bear in mind that although we endeavour to ensure that it is
                    updated and correct at all times, we do rely on third parties
                    to provide information to us so that we can make it available
                    to you. Rajanikant Deshmukh accepts no liability for any
                    loss, direct or indirect, you experience as a result of
                    relying wholly on this functionality of the app.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    At some point, we may wish to update the app. The app is
                    currently available on web platform – the requirements for
                    both systems(and for any additional systems we
                    decide to extend the availability of the app to) may change,
                    and you’ll need to download the updates if you want to keep
                    using the app. Rajanikant Deshmukh does not promise that it
                    will always update the app so that it is relevant to you
                    and/or works with the browser version that you have
                    installed on your device. However, you promise to always
                    accept updates to the application when offered to you, We may
                    also wish to stop providing the app, and may terminate use of
                    it at any time without giving notice of termination to you.
                    Unless we tell you otherwise, upon any termination, (a) the
                    rights and licenses granted to you in these terms will end;
                    (b) you must stop using the app, and (if needed) delete it
                    from your device.
                </Typography>
                <Typography variant={"h5"} gutterBottom>
                    Changes to This Terms and Conditions
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    I may update our Terms and Conditions
                    from time to time. Thus, you are advised to review this page
                    periodically for any changes. I will
                    notify you of any changes by posting the new Terms and
                    Conditions on this page.
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    These terms and conditions are effective as of 2020-10-01.
                </Typography>
                <Typography variant={"h5"} gutterBottom>Contact Us</Typography>
                <Typography variant={"body1"} gutterBottom>
                    If you have any questions or suggestions about my
                    Terms and Conditions, do not hesitate to contact me
                    at <a href="mailto:mail@aruke.dev">mail@aruke.dev</a>.
                </Typography>
            </Container>
        </div>
    );
}
