import Config from 'app/config';
import React from 'react';
import { Link } from '@remix-run/react';

const Footer: React.FC = () => {
    return (
        <footer className='bg-indigo-800 paper bg-blend-color-burn'>
            <div className='container text-white text-opacity-90'>
                <div className='flex flex-col sm:flex-row gap-4 justify-evenly py-12'>
                    <div className='w-full sm:w-auto flex flex-col gap-2'>
                        <a className="after:content-['_↗']" href={Config.githubUrl} target='_blank' rel="noreferrer">GitHub</a>
                        <a className="after:content-['_↗']" href={Config.bmcUrl} target='_blank' rel="noreferrer">Buy a Sushi</a>
                    </div>
                    <div className='display-none sm:flex' />
                    <div className='w-full sm:w-auto flex flex-col gap-2'>
                        <Link to={'/about'} prefetch='intent'>
                            About
                        </Link>
                        <Link to={'/about/acknowledgments'} prefetch='intent'>
                            Acknowledgments
                        </Link>
                        <Link to={'/about/privacy-policy'} prefetch='intent'>
                            Privacy Policy
                        </Link>
                        <Link to={'/about/terms'} prefetch='intent'>
                            Terms Of Use
                        </Link>
                    </div>
                </div>
                <hr className="bg-white opacity-10"/>
                <div className='text-center py-4 opacity-80 font-thin'>
                    &copy; RionLabs. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
