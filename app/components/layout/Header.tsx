import React from 'react';
import { Link } from '@remix-run/react';
import HeaderNav from '../molecules/HeaderNav';

const Header: React.FC = () => {
    return (
        <div className="static bg-indigo-800 paper bg-blend-color-burn curve">
            <div className="py-12 sm:pt-12 sm:pb-16 sm:container">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <Link to={'/'}>
                        <div onClickCapture={() => {
                            // FixMe: logEvent('navigation', { path: 'home' });
                        }}>
                            <h3 className="cursor-pointer font-black select-none text-white text-center">
                                kanji.sh
                            </h3>
                        </div>
                    </Link>
                    <span className="hidden sm:flex sm:flex-1" />
                    <div className="flex flex-row justify-center gap-8">
                        <HeaderNav to={'/read'} eventPath={'read'}>
                            read
                        </HeaderNav>
                        <HeaderNav to={'/write'} eventPath={'write'}>
                            write
                        </HeaderNav>
                        <HeaderNav to={'/about'} eventPath={'about'}>
                            about
                        </HeaderNav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
