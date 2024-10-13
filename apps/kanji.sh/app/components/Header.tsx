import { useTranslation } from 'react-i18next';
import { Link, NavLink, NavLinkProps } from '@remix-run/react';
import clsx from 'clsx';

const HeaderNavItem = (props: NavLinkProps) => {
    const { children, ...otherProps } = props;
    return (
        <NavLink
            {...otherProps}
            data-content={children}
            className={({ isActive }) => clsx('header-nav', { 'font-semibold': isActive }, { 'font-normal': !isActive })}>
            {children}
        </NavLink>
    );
};

export const Header = () => {
    const { t } = useTranslation('header');
    return (
        <header className="curve text-primary-content">
            <div className="py-12 pt-8 sm:pt-12 sm:pb-16 container">
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4">
                    <Link to={'/'}>
                        <h3 className="cursor-pointer font-black select-none text-center">
                            kanji.sh
                        </h3>
                    </Link>
                    <span className="hidden sm:flex sm:flex-grow" />
                    <nav className="mx-auto grid grid-cols-3 items-center justify-items-center gap-8">
                        <HeaderNavItem to={'/read'}>{t('read')}</HeaderNavItem>
                        <HeaderNavItem to={'/write'}>{t('write')}</HeaderNavItem>
                        <HeaderNavItem to={'/about'}>{t('about')}</HeaderNavItem>
                    </nav>
                </div>
            </div>
        </header>
    );
};
