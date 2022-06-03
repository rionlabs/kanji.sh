import React from 'react';
import Header from './Header';
import Footer from './Footer';

export const PageLayout: React.FC = (props) => {
    const { children } = props;
    return (
        <div className="flex-grow min-h-full relative">
            <Header />
            <div className="py-8 sm:py-12 container">
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default PageLayout;
