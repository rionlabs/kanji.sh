'use client';

import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

export const HeaderNavItem = (props: React.PropsWithChildren<LinkProps<any>>) => {
    const { children, ...otherProps } = props;
    const pathname = usePathname();
    const match = useMemo<Boolean>(
        () => pathname.includes(props.href.toString()),
        [props.href, pathname]
    );
    return (
        <Link
            {...otherProps}
            data-content={children}
            className={clsx(
                'header-nav hover-underline-animation select-none text-xl font-serif text-center text-white',
                { 'font-bold': match },
                { 'font-normal': !match }
            )}>
            {children}
        </Link>
    );
};
