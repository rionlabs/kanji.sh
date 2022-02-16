import { FaFacebook, FaReddit, FaTwitter } from 'react-icons/fa';
import React from 'react';
import LinkButton from '../atoms/LinkButton';

const ShareSheet: React.FC = () => {
    /* TODO: Add Copy to Clipboard Button */
    return (
        <div>
            <LinkButton
                startIcon={<FaTwitter />}
                link={
                    'https://twitter.com/intent/tweet/?text=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji.&amp;url=https%3A%2F%2Fkanji.sh'
                }>
                Twitter
            </LinkButton>
            <LinkButton
                startIcon={<FaFacebook />}
                link={'https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fkanji.sh'}>
                Facebook
            </LinkButton>
            <LinkButton
                startIcon={<FaReddit />}
                link={
                    'https://reddit.com/submit/?url=https%3A%2F%2Fkanji.sh&amp;resubmit=true&amp;title=Check%20this%20awesome%20website%20to%20practice%20Japanese%20Kanji.'
                }>
                Reddit
            </LinkButton>
        </div>
    );
};

export default ShareSheet;
