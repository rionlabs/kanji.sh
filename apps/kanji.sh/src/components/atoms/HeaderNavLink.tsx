'use client';

import React, { useMemo } from 'react';

import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export const HeaderNavItem = (props: React.PropsWithChildren<LinkProps<unknown>>) => {
    const { children, ...otherProps } = props;
    const pathname = usePathname();
    const match = useMemo<boolean>(
        () => pathname.includes(props.href.toString()),
        [props.href, pathname]
    );
    return (
        <Link
            {...otherProps}
            data-content={children}
            className={clsx('header-nav', { 'font-semibold': match }, { 'font-normal': !match })}>
            {children}
        </Link>
    );
};
