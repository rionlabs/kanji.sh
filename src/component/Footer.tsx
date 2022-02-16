import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <div className="absolute r-0 t-0 l-0">
            {/* AppBar */}
            <div className="py-3 static bg-primary z-0">
                <div className="container items-center justify-center">
                    <div className="w-full md:w-1/2 text-center">
                        <div className="text-sm flex-grow self-center text-white flex-no-wrap">
                            Crafted by{' '}
                            <a
                                className="decoration-none text-white font-bold"
                                href="https://aruke.dev">
                                aruke
                            </a>{' '}
                            with lots of Sushi
                        </div>
                    </div>
                    <div className="display-none md:flex flex-1" />
                    <div className="w-full md:w-1/2 text-center">
                        <Link href={'/about/privacy-policy'}>
                            <div>Privacy Policy</div>
                        </Link>
                        <Link href={'/about/terms'}>
                            <div>Terms Of Use</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
