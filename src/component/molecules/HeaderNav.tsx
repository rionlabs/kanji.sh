import { useRouter } from 'next/router';
import { logEvent } from '../../firebase';
import Link from 'next/link';
import React from 'react';
import { LinkProps } from 'next/dist/client/link';

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
                className="transform-none m-1 p-1 cursor-pointer">
                {match ? (
                    <h6 className="contents self-center select-none font-serif font-bold text-white">
                        {children}
                    </h6>
                ) : (
                    <h6 className="contents self-center select-none font-serif font-bold text-white">
                        {children}
                    </h6>
                )}
            </span>
        </Link>
    );
};

export default HeaderNav;
