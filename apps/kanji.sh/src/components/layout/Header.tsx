'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import Link, { LinkProps } from 'next/link';

const HeaderNavItem = (props: React.PropsWithChildren<LinkProps<any>>) => {
    const { children, ...otherProps } = props;
    const pathname = usePathname();
    const match = useMemo<Boolean>(
        () => pathname.includes(props.href.toString()),
        [props.href, pathname]
    );
    return (
        <Link {...otherProps}>
            <h6
                data-content={children}
                className={clsx(
                    'header-nav hover-underline-animation select-none font-serif text-center text-white',
                    { 'font-bold': match },
                    { 'font-normal': !match }
                )}>
                {children}
            </h6>
        </Link>
    );
};

export const Header = () => {
    return (
        <div className="static bg-indigo-800 paper bg-blend-color-burn curve">
            <div className="py-12 sm:pt-12 sm:pb-16 sm:container">
                {/* Toolbar */}
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
                    <Link href={'/'}>
                        <h3 className="cursor-pointer font-black select-none text-white text-center">
                            kanji.sh
                        </h3>
                    </Link>
                    <span className="hidden sm:flex sm:flex-1" />
                    <div className="">
                        <div className="mx-auto grid grid-cols-3 items-center justify-items-center gap-8">
                            <HeaderNavItem href={'/read'}>read</HeaderNavItem>
                            <HeaderNavItem href={'/write'}>write</HeaderNavItem>
                            <HeaderNavItem href={'/about'}>about</HeaderNavItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
