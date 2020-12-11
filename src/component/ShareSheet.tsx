import {Facebook, Reddit, Twitter} from "@material-ui/icons";
import React from "react";
import {KButton} from "../../pages/about";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    shareButton: {
        marginRight: theme.spacing(2)
    }
}));

export default function ShareSheet() {
    const classes = useStyles();

    /* TODO: Add Copy to Clipboard Button */
    return (
        <div>
            <KButton className={classes.shareButton}
                     href={"https://twitter.com/intent/tweet/?text=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji.&amp;url=https%3A%2F%2Fkanji.sh"}
                     startIcon={<Twitter/>}>
                Twitter
            </KButton>
            <KButton className={classes.shareButton}
                     href={"https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkanji.sh"} startIcon={<Facebook/>}>
                Facebook
            </KButton>
            <KButton className={classes.shareButton}
                     href={"https://reddit.com/submit/?url=https%3A%2F%2Fkanji.sh&amp;resubmit=true&amp;title=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji."}
                     startIcon={<Reddit/>}>
                Reddit
            </KButton>
        </div>
    );
}
