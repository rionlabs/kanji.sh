import { useTranslations } from 'next-intl';
import { HeaderNavItem } from '../atoms/HeaderNavLink';
import React from 'react';
import Link from 'next/link';

export const Header = () => {
    const t = useTranslations('header');
    return (
        <header className="curve text-primary-content">
            <div className="py-12 pt-8 sm:pt-12 sm:pb-16 container">
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
                    <Link href={'/'}>
                        <h3 className="cursor-pointer font-black select-none text-center">
                            kanji.sh
                        </h3>
                    </Link>
                    <span className="hidden sm:flex sm:flex-grow" />
                    <nav className="mx-auto grid grid-cols-3 items-center justify-items-center gap-8">
                        <HeaderNavItem href={'/read'}>{t('read')}</HeaderNavItem>
                        <HeaderNavItem href={'/write'}>{t('write')}</HeaderNavItem>
                        <HeaderNavItem href={'/about'}>{t('about')}</HeaderNavItem>
                    </nav>
                </div>
            </div>
        </header>
    );
};
