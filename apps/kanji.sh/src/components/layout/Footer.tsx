import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Footer = () => {
    const t = useTranslations('footer');
    const config = useTranslations('config');
    return (
        <footer className="">
            <div className="text-primary-content/95 container">
                <div className="flex flex-col justify-evenly gap-4 px-8 py-12 sm:flex-row">
                    <nav className="flex w-full flex-col gap-3 sm:w-auto">
                        <a
                            className="link link-hover after:content-['_↗']"
                            href={config('githubUrl')}
                            target="_blank"
                            rel="noreferrer">
                            GitHub
                        </a>
                        <a
                            className="link link-hover after:content-['_↗']"
                            href={config('bmcUrl')}
                            target="_blank"
                            rel="noreferrer">
                            Buy a Sushi
                        </a>
                    </nav>
                    <div className="display-none sm:flex" />
                    <nav className="flex w-full flex-col gap-3 sm:w-auto">
                        <Link className="link link-hover" href={'/about'}>
                            {t('about')}
                        </Link>
                        <Link className="link link-hover" href={'/about/acknowledgments'}>
                            {t('acknowledgements')}
                        </Link>
                        <Link className="link link-hover" href={'/about/privacy-policy'}>
                            {t('privacy')}
                        </Link>
                        <Link className="link link-hover" href={'/about/terms'}>
                            {t('terms')}
                        </Link>
                    </nav>
                </div>
                <hr className="bg-primary-content opacity-10" />
                <div className="py-4 text-center font-thin opacity-80">{t('copyright')}</div>
            </div>
        </footer>
    );
};
