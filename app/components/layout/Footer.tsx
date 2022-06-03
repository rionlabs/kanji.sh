import React from 'react';
import { Link } from '@remix-run/react';

const Footer: React.FC = () => {
    return (
        <div>
            <div className="py-8 static bg-indigo-800 paper bg-blend-color-burn">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="w-full md:w-1/2 text-center">
                        <div className="text-sm flex-grow self-center text-white flex-no-wrap">
                            <a
                                className="decoration-none text-xl font-bold text-white  mix-blend-soft-light"
                                href="https://aruke.dev">
                                aruke
                            </a>{' '}
                        </div>
                    </div>
                    <div className="display-none md:flex flex-1" />
                    <div className="w-full md:w-1/2 text-center space-y-2">
                        <Link to={'/about/privacy-policy'} prefetch="intent">
                            <div className="mix-blend-color-burn">Privacy Policy</div>
                        </Link>
                        <Link to={'/about/terms'} prefetch="intent">
                            <div>Terms Of Use</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
