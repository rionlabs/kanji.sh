import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Footer = () => {
    const t = useTranslations('footer');
    const config = useTranslations('config');
    return (
        <footer className="">
            <div className="container text-primary-content/95">
                <div className="flex flex-col sm:flex-row justify-evenly gap-4 px-8 py-12">
                    <nav className="w-full sm:w-auto flex flex-col gap-3">
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
                    <nav className="w-full sm:w-auto flex flex-col gap-3">
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
                <div className="text-center py-4 opacity-80 font-thin">{t('copyright')}</div>
            </div>
        </footer>
    );
};
