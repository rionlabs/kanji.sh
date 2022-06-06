import React from 'react';
import Header from './Header';
import Footer from './Footer';

export const PageLayout: React.FC = (props) => {
    const { children } = props;
    return (
        <div className="page-layout">
            <Header />
            <main className="py-12 sm:py-12 container">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
