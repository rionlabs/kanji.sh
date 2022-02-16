import React from 'react';
import Link from 'next/link';
import { logEvent } from '../firebase';
import DonateButton from './atoms/DonateButton';
import HeaderNav from './molecules/HeaderNav';

const Header: React.FC = () => {
    return (
        <div className="clip-[polygon(0 0, 100% 0, 100% 75%, 0 100%)]">
            {/* AppBar */}
            <div className="static bg-transparent z-0">
                <div className="container">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row items-center pt-4 pb-8 ">
                        <div>
                            <Link href={'/'}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                                <a
                                    className="transform-none decoration-none m-1 p-1"
                                    onClick={() => logEvent('navigation', { path: 'home' })}>
                                    <h3 className="">kanji.sh</h3>
                                </a>
                            </Link>
                        </div>

                        <div>
                            <HeaderNav href={'/read'} eventPath={'read'}>
                                read
                            </HeaderNav>
                            <HeaderNav href={'/write'} eventPath={'write'}>
                                write
                            </HeaderNav>
                            <HeaderNav href={'/about'} eventPath={'about'}>
                                about
                            </HeaderNav>

                            <DonateButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
