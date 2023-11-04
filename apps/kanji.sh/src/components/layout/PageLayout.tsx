import type { PropsWithChildren } from 'react';
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type PageLayoutProps = PropsWithChildren<{}>;

export const PageLayout = (props: PageLayoutProps) => {
    const { children } = props;
    return (
        <div className="page-layout">
            <Header />
            <main className="py-12 sm:py-12 container">{children}</main>
            <Footer />
        </div>
    );
};
