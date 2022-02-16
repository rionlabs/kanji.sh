import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';

export const PageLayout: React.FC = (props) => {
    const { children } = props;
    return (
        <div className="flex-grow min-h-full relative">
            <Header />
            <div className="pt-4 pb-18">
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default PageLayout;
