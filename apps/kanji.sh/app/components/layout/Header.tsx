import clsx from 'clsx';
import React from 'react';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { useLocation } from 'react-router-dom';

const HeaderNavItem = (props: React.PropsWithChildren<LinkProps>) => {
    const { children, ...otherProps } = props;
    const location = useLocation();
    const match = location.pathname.includes(props.to.toString());
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
                    <Link to={'/'}>
                        <h3 className="cursor-pointer font-black select-none text-white text-center">
                            kanji.sh
                        </h3>
                    </Link>
                    <span className="hidden sm:flex sm:flex-1" />
                    <div className="">
                        <div className="mx-auto grid grid-cols-3 items-center justify-items-center gap-8">
                            <HeaderNavItem to={'/read'}>read</HeaderNavItem>
                            <HeaderNavItem to={'/write'}>write</HeaderNavItem>
                            <HeaderNavItem to={'/about'}>about</HeaderNavItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
