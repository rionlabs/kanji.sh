import { useLocation } from 'react-router-dom';

import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';
import React from 'react';
import clsx from 'clsx';

interface HeaderNavProps extends React.PropsWithChildren<LinkProps> {
    eventPath: string;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ eventPath, children, ...props }) => {
    const location = useLocation();
    const match = location.pathname.includes(props.to.toString());
    return (
        <Link {...props}>
            <span
                onClickCapture={() => {
                    // FixMe: logEvent('navigation', { path: eventPath })
                }}
                className="transform-none m-1 p-1 cursor-pointer text-lg">
                <h6
                    className={clsx(
                        'transition-all contents self-center select-none font-serif text-white header-nav',
                        { 'font-bold': match },
                        { 'font-normal': !match }
                    )}>
                    {children}
                </h6>
            </span>
        </Link>
    );
};

export default HeaderNav;
