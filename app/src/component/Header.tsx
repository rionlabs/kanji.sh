import React from 'react';
import Link from 'next/link';
import { logEvent } from '../firebase';
import HeaderNav from './molecules/HeaderNav';

const Header: React.FC = () => {
    return (
        <div className="static bg-indigo-800 paper bg-blend-color-burn curve toolbar">
            <div className="py-12 sm:py-16 sm:container">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link href={'/'}>
                        <div onClickCapture={() => logEvent('navigation', { path: 'home' })}>
                            <h3 className="cursor-pointer font-black select-none text-white">
                                kanji.sh
                            </h3>
                        </div>
                    </Link>
                    <span className="hidden sm:flex sm:flex-1" />
                    <div className="space-x-8">
                        <HeaderNav href={'/read'} eventPath={'read'}>
                            read
                        </HeaderNav>
                        <HeaderNav href={'/write'} eventPath={'write'}>
                            write
                        </HeaderNav>
                        <HeaderNav href={'/about'} eventPath={'about'}>
                            about
                        </HeaderNav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
