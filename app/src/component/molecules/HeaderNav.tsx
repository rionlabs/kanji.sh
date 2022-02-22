import { useRouter } from 'next/router';
import { logEvent } from '../../firebase';
import Link from 'next/link';
import React from 'react';
import { LinkProps } from 'next/dist/client/link';
import clsx from 'clsx';

interface HeaderNavProps extends React.PropsWithChildren<LinkProps> {
    eventPath: string;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ eventPath, children, ...props }) => {
    const { asPath } = useRouter();
    const match = asPath.includes(props.href.toString());
    return (
        <Link {...props}>
            <span
                onClickCapture={() => logEvent('navigation', { path: eventPath })}
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
