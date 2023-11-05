import { Config } from '../../config';
import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-indigo-800 paper bg-blend-color-burn">
            <div className="container text-white text-opacity-90">
                <div className="flex flex-col sm:flex-row gap-4 justify-evenly py-12">
                    <div className="w-full sm:w-auto flex flex-col gap-2">
                        <a
                            className="link link-hover after:content-['_↗']"
                            href={Config.githubUrl}
                            target="_blank"
                            rel="noreferrer">
                            GitHub
                        </a>
                        <a
                            className="link link-hover after:content-['_↗']"
                            href={Config.bmcUrl}
                            target="_blank"
                            rel="noreferrer">
                            Buy a Sushi
                        </a>
                    </div>
                    <div className="display-none sm:flex" />
                    <div className="w-full sm:w-auto flex flex-col gap-2">
                        <Link className="link link-hover" href={'/about'}>
                            About
                        </Link>
                        <Link className="link link-hover" href={'/about/acknowledgments'}>
                            Acknowledgments
                        </Link>
                        <Link className="link link-hover" href={'/about/privacy-policy'}>
                            Privacy Policy
                        </Link>
                        <Link className="link link-hover" href={'/about/terms'}>
                            Terms Of Use
                        </Link>
                    </div>
                </div>
                <hr className="bg-white opacity-10" />
                <div className="text-center py-4 opacity-80 font-thin">
                    &copy; RionLabs. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
