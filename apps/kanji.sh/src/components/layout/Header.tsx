import { HeaderNavItem } from '../atoms/HeaderNavLink';
import React from 'react';
import Link from 'next/link';

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
