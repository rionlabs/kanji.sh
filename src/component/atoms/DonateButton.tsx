import React from 'react';
import { logEvent } from '../../firebase';
import Config from '../../config/Config';

const DonateButton: React.FC = ({ ...props }) => (
    <a className="decoration-none" href={Config.bmcUrl}>
        <button
            className="self-center ml-2 p-2 text-white"
            onClick={() => logEvent('bmc_click')}
            aria-label="buy me a sushi"
            {...props}>
            <span role={'img'} aria-label={'Sushi Emoji'}>
                🍣
            </span>
        </button>
    </a>
);

export default DonateButton;
